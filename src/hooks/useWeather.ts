import { useState, useEffect } from 'react';

export interface WeatherData {
  uvIndex: number;
  humidity: number;
  temperature: number;
  windSpeed: number;
  windDirection: number;
  locationName: string;
  loading: boolean;
  error: boolean;
  aqi: number;
  sunset: string;
  pollen: number;
  uvForecast: number[];
  dailyForecast: { uv: number; humidity: number; day: string }[];
}

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    uvIndex: 0,
    humidity: 0,
    temperature: 0,
    windSpeed: 0,
    windDirection: 0,
    locationName: 'Puerto Real',
    loading: true,
    error: false,
    aqi: 0,
    sunset: '',
    pollen: 0,
    uvForecast: [],
    dailyForecast: [],
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchWeather = async (lat: number, lon: number, name: string = 'Su ubicación') => {
      try {
        const waqiToken = import.meta.env.VITE_WAQI_TOKEN || 'dcf221be8762b85392516b5b4ca82ff673910092';
        
        const results = await Promise.allSettled([
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m&hourly=uv_index&daily=uv_index_max,relative_humidity_2m_max,sunset&timezone=auto&forecast_days=7`, { signal }),
          fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,us_aqi,pollen_grass&hourly=european_aqi,us_aqi&timezone=auto`, { signal }),
          fetch(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=${waqiToken}`, { signal })
        ]);

        let weatherDataJson: any = null;
        let openMeteoAqiData: any = null;
        let waqiData: any = null;

        if (results[0].status === 'fulfilled') {
          weatherDataJson = await results[0].value.json();
        }
        if (results[1].status === 'fulfilled') {
          openMeteoAqiData = await results[1].value.json();
        }
        if (results[2].status === 'fulfilled') {
          waqiData = await results[2].value.json();
        }

        if (!weatherDataJson) {
          throw new Error('Weather data failed to load');
        }
        
        const now = new Date();
        const currentHour = now.getHours();
        // The hourly index is the hour offset from the start of the forecast
        const uvIndex = weatherDataJson.hourly?.uv_index?.[currentHour] || 0;
        const uvForecast = weatherDataJson.hourly?.uv_index?.slice(currentHour, currentHour + 5) || [];
        const humidity = weatherDataJson.current?.relative_humidity_2m || 0;
        const temperature = weatherDataJson.current?.temperature_2m || 0;
        const windSpeed = weatherDataJson.current?.wind_speed_10m || 0;
        const windDirection = weatherDataJson.current?.wind_direction_10m || 0;
        const sunset = weatherDataJson.daily?.sunset?.[0] || '';
        
        let aqi = 0;
        if (waqiData?.status === 'ok' && waqiData.data?.aqi) {
          aqi = waqiData.data.aqi;
        } else if (openMeteoAqiData?.current?.european_aqi && openMeteoAqiData.current.european_aqi > 0) {
          aqi = openMeteoAqiData.current.european_aqi;
        } else if (openMeteoAqiData?.current?.us_aqi && openMeteoAqiData.current.us_aqi > 0) {
          aqi = openMeteoAqiData.current.us_aqi;
        } else {
          const hourlyEuro = openMeteoAqiData?.hourly?.european_aqi?.[currentHour];
          const hourlyUS = openMeteoAqiData?.hourly?.us_aqi?.[currentHour];
          if (hourlyEuro && hourlyEuro > 0) aqi = hourlyEuro;
          else if (hourlyUS && hourlyUS > 0) aqi = hourlyUS;
          else aqi = 25;
        }

        const pollen = openMeteoAqiData?.current?.pollen_grass || 0;
        const daysMap = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const dailyForecast = weatherDataJson.daily.time.map((time: string, i: number) => ({
          day: daysMap[new Date(time).getDay()],
          uv: weatherDataJson.daily.uv_index_max[i],
          humidity: weatherDataJson.daily.relative_humidity_2m_max[i]
        }));

        setWeatherData({
          uvIndex,
          humidity,
          temperature,
          windSpeed,
          windDirection,
          locationName: name,
          loading: false,
          error: false,
          aqi,
          sunset,
          pollen,
          uvForecast,
          dailyForecast,
        });
      } catch (error: any) {
        if (error.name === 'AbortError') return;
        console.error('Error fetching weather:', error);
        setWeatherData(prev => ({ ...prev, loading: false, error: true }));
      }
    };

    if (navigator.geolocation) {
      const geoId = navigator.geolocation.getCurrentPosition(
        (position) => {
          if (!signal.aborted) {
            fetchWeather(position.coords.latitude, position.coords.longitude);
          }
        },
        () => {
          if (!signal.aborted) {
            fetchWeather(36.5282, -6.1901, 'Puerto Real');
          }
        }
      );
    } else {
      fetchWeather(36.5282, -6.1901, 'Puerto Real');
    }

    return () => controller.abort();
  }, []);

  return weatherData;
};
