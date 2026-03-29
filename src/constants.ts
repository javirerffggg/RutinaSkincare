export type DayOfWeek = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';

export interface Step {
  id: string;
  stepNumber: number;
  title: string;
  product: string;
  notes?: string;
  icon?: string;
  category: 'Limpieza' | 'Ojos' | 'Hidratación' | 'Protección' | 'Sérum' | 'Crema';
}

export interface DailyRoutine {
  morning: Step[];
  night: Step[];
}

export interface WeeklyRoutine {
  [key: string]: DailyRoutine;
}

export const WEEKLY_ROUTINE: WeeklyRoutine = {
  'Lunes': {
    morning: [
      { id: 'm1', stepNumber: 1, category: 'Limpieza', title: 'Limpieza', product: 'Agua fresca o CeraVe Hydrating', notes: 'Solo para quitar el sudor de la noche.' },
      { id: 'm2', stepNumber: 2, category: 'Ojos', title: 'Ojos', product: 'L\'Oréal Roll-on', notes: 'Truco: Guárdalo en la nevera para deshinchar.' },
      { id: 'm3', stepNumber: 3, category: 'Hidratación', title: 'Hidratación', product: 'Invierno: Crema Akytania / Verano: Gel L\'Oréal o NADA' },
      { id: 'm4', stepNumber: 4, category: 'Protección', title: 'Protección', product: 'Garnier Super UV Fluido SPF 50', notes: 'Obligatorio siempre. Agita el bote antes de usar.' },
    ],
    night: [
      { id: 'n1', stepNumber: 1, category: 'Limpieza', title: 'Limpiador', product: 'Solimo Carbón' },
      { id: 'n2', stepNumber: 2, category: 'Sérum', title: 'Sérum Cara', product: 'Niacinamida T.O.', notes: '3 gotas para toda la cara.' },
      { id: 'n3', stepNumber: 3, category: 'Ojos', title: 'Contorno Ojos', product: 'Beauty of Joseon' },
      { id: 'n4', stepNumber: 4, category: 'Crema', title: 'Crema Final', product: 'Akytania o Cien Q10' },
    ]
  },
  'Martes': {
    morning: [
      { id: 'm1', stepNumber: 1, category: 'Limpieza', title: 'Limpieza', product: 'Agua fresca o CeraVe Hydrating' },
      { id: 'm2', stepNumber: 2, category: 'Ojos', title: 'Ojos', product: 'L\'Oréal Roll-on' },
      { id: 'm3', stepNumber: 3, category: 'Hidratación', title: 'Hidratación', product: 'Invierno: Crema Akytania / Verano: Gel L\'Oréal o NADA' },
      { id: 'm4', stepNumber: 4, category: 'Protección', title: 'Protección', product: 'Garnier Super UV Fluido SPF 50' },
    ],
    night: [
      { id: 'n1', stepNumber: 1, category: 'Limpieza', title: 'Limpiador', product: 'Solimo Carbón' },
      { id: 'n2', stepNumber: 2, category: 'Sérum', title: 'Sérum Cara', product: 'Niacinamida T.O.' },
      { id: 'n3', stepNumber: 3, category: 'Ojos', title: 'Contorno Ojos', product: 'Beauty of Joseon' },
      { id: 'n4', stepNumber: 4, category: 'Crema', title: 'Crema Final', product: 'Akytania o Cien Q10' },
    ]
  },
  'Miércoles': {
    morning: [
      { id: 'm1', stepNumber: 1, category: 'Limpieza', title: 'Limpieza', product: 'Agua fresca o CeraVe Hydrating' },
      { id: 'm2', stepNumber: 2, category: 'Ojos', title: 'Ojos', product: 'L\'Oréal Roll-on' },
      { id: 'm3', stepNumber: 3, category: 'Hidratación', title: 'Hidratación', product: 'Invierno: Crema Akytania / Verano: Gel L\'Oréal o NADA' },
      { id: 'm4', stepNumber: 4, category: 'Protección', title: 'Protección', product: 'Garnier Super UV Fluido SPF 50' },
    ],
    night: [
      { id: 'n1', stepNumber: 1, category: 'Limpieza', title: 'Limpiador', product: 'CeraVe (Suave)' },
      { id: 'n2', stepNumber: 2, category: 'Sérum', title: 'Sérum Cara', product: 'NADA', notes: 'Noche de Olay (AHA)' },
      { id: 'n3', stepNumber: 3, category: 'Ojos', title: 'Contorno Ojos', product: 'Beauty of Joseon' },
      { id: 'n4', stepNumber: 4, category: 'Crema', title: 'Crema Final', product: 'Olay Vit C + AHA', notes: 'Tratamiento completo. No usar Niacinamida.' },
    ]
  },
  'Jueves': {
    morning: [
      { id: 'm1', stepNumber: 1, category: 'Limpieza', title: 'Limpieza', product: 'Agua fresca o CeraVe Hydrating' },
      { id: 'm2', stepNumber: 2, category: 'Ojos', title: 'Ojos', product: 'L\'Oréal Roll-on' },
      { id: 'm3', stepNumber: 3, category: 'Hidratación', title: 'Hidratación', product: 'Invierno: Crema Akytania / Verano: Gel L\'Oréal o NADA' },
      { id: 'm4', stepNumber: 4, category: 'Protección', title: 'Protección', product: 'Garnier Super UV Fluido SPF 50' },
    ],
    night: [
      { id: 'n1', stepNumber: 1, category: 'Limpieza', title: 'Limpiador', product: 'Solimo Carbón' },
      { id: 'n2', stepNumber: 2, category: 'Sérum', title: 'Sérum Cara', product: 'Niacinamida T.O.' },
      { id: 'n3', stepNumber: 3, category: 'Ojos', title: 'Contorno Ojos', product: 'Beauty of Joseon' },
      { id: 'n4', stepNumber: 4, category: 'Crema', title: 'Crema Final', product: 'Akytania o Cien Q10' },
    ]
  },
  'Viernes': {
    morning: [
      { id: 'm1', stepNumber: 1, category: 'Limpieza', title: 'Limpieza', product: 'Agua fresca o CeraVe Hydrating' },
      { id: 'm2', stepNumber: 2, category: 'Ojos', title: 'Ojos', product: 'L\'Oréal Roll-on' },
      { id: 'm3', stepNumber: 3, category: 'Hidratación', title: 'Hidratación', product: 'Invierno: Crema Akytania / Verano: Gel L\'Oréal o NADA' },
      { id: 'm4', stepNumber: 4, category: 'Protección', title: 'Protección', product: 'Garnier Super UV Fluido SPF 50' },
    ],
    night: [
      { id: 'n1', stepNumber: 1, category: 'Limpieza', title: 'Limpiador', product: 'Solimo Carbón' },
      { id: 'n2', stepNumber: 2, category: 'Sérum', title: 'Sérum Cara', product: 'Niacinamida T.O.' },
      { id: 'n3', stepNumber: 3, category: 'Ojos', title: 'Contorno Ojos', product: 'Beauty of Joseon' },
      { id: 'n4', stepNumber: 4, category: 'Crema', title: 'Crema Final', product: 'Akytania o Cien Q10' },
    ]
  },
  'Sábado': {
    morning: [
      { id: 'm1', stepNumber: 1, category: 'Limpieza', title: 'Limpieza', product: 'Agua fresca o CeraVe Hydrating' },
      { id: 'm2', stepNumber: 2, category: 'Ojos', title: 'Ojos', product: 'L\'Oréal Roll-on' },
      { id: 'm3', stepNumber: 3, category: 'Hidratación', title: 'Hidratación', product: 'Invierno: Crema Akytania / Verano: Gel L\'Oréal o NADA' },
      { id: 'm4', stepNumber: 4, category: 'Protección', title: 'Protección', product: 'Garnier Super UV Fluido SPF 50' },
    ],
    night: [
      { id: 'n1', stepNumber: 1, category: 'Limpieza', title: 'Limpiador', product: 'CeraVe (Suave)' },
      { id: 'n2', stepNumber: 2, category: 'Sérum', title: 'Sérum Cara', product: 'NADA', notes: 'Noche de Olay (AHA)' },
      { id: 'n3', stepNumber: 3, category: 'Ojos', title: 'Contorno Ojos', product: 'Beauty of Joseon' },
      { id: 'n4', stepNumber: 4, category: 'Crema', title: 'Crema Final', product: 'Olay Vit C + AHA' },
    ]
  },
  'Domingo': {
    morning: [
      { id: 'm1', stepNumber: 1, category: 'Limpieza', title: 'Limpieza', product: 'Agua fresca o CeraVe Hydrating' },
      { id: 'm2', stepNumber: 2, category: 'Ojos', title: 'Ojos', product: 'L\'Oréal Roll-on' },
      { id: 'm3', stepNumber: 3, category: 'Hidratación', title: 'Hidratación', product: 'Invierno: Crema Akytania / Verano: Gel L\'Oréal o NADA' },
      { id: 'm4', stepNumber: 4, category: 'Protección', title: 'Protección', product: 'Garnier Super UV Fluido SPF 50' },
    ],
    night: [
      { id: 'n1', stepNumber: 1, category: 'Limpieza', title: 'Limpiador', product: 'Solimo Carbón' },
      { id: 'n2', stepNumber: 2, category: 'Sérum', title: 'Sérum Cara', product: 'Niacinamida T.O.' },
      { id: 'n3', stepNumber: 3, category: 'Ojos', title: 'Contorno Ojos', product: 'Beauty of Joseon' },
      { id: 'n4', stepNumber: 4, category: 'Crema', title: 'Crema Final', product: 'Akytania o Cien Q10' },
    ]
  }
};

export const GOLDEN_REMINDERS = [
  "Regla de la Olay (Miércoles y Sábados): Esas noches NUNCA uses la Niacinamida de The Ordinary. La crema Olay ya es el tratamiento completo.",
  "El margen de seguridad: Cuando te pongas la crema Olay, no la acerques demasiado a los ojos (donde ya has puesto el de Beauty of Joseon). Deja un dedo de distancia.",
  "Cantidad de Niacinamida: Con 3 gotas para toda la cara es suficiente. Si usas más, te saldrán 'pelotillas' blancas al poner la crema después.",
  "Cuello y Orejas: ¡No los olvides! Especialmente con el protector solar por la mañana.",
  "Orden del Contorno BoJ: Siempre ponlo antes de tu crema de noche (Cien, Akytania u Olay)."
];
