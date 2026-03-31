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
  // --- REGLAS CRÍTICAS (PRODUCTOS ESPECÍFICOS) ---
  "Regla de la Olay (Miércoles y Sábados): Esas noches NUNCA uses la Niacinamida de The Ordinary. La crema Olay ya es el tratamiento completo.",
  "El margen de seguridad: Cuando te pongas la crema Olay, no la acerques demasiado a los ojos (donde ya has puesto el de Beauty of Joseon). Deja un dedo de distancia.",
  "Cantidad de Niacinamida: Con 3 gotas para toda la cara es suficiente. Si usas más, te saldrán 'pelotillas' blancas al poner la crema después.",
  "Orden del Contorno BoJ: Siempre ponlo antes de tu crema de noche (Cien, Akytania u Olay) para que los activos no se diluyan.",
  "Agita el Garnier: El fluido Super UV SPF 50 es bifásico. Agítalo con energía antes de cada aplicación para asegurar la protección.",
  "El Roll-on de L'Oréal: Truco de experto: guárdalo siempre en la nevera. El frío potencia el efecto drenante sobre las bolsas matutinas.",
  "Doble Limpieza Nocturna: El Solimo Carbón es potente. Si has usado mucho protector, limpia primero con agua micelar y luego con el jabón.",
  "Akytania en Invierno: Cuando el frío apriete, calienta la crema entre tus manos antes de presionarla suavemente sobre el rostro.",

  // --- SOL Y LUZ DEL ATLÁÁNTICO ---
  "Protección en la Sombra: La arena de la Caleta refleja hasta el 15% de la radiación UV. Protégete aunque estés bajo la sombrilla.",
  "El Reflejo del Agua: Si estás cerca del mar, la radiación se multiplica. Reaplica el SPF 50 cada 2 horas sin falta.",
  "Nubes Engañosas: En días de bruma atlántica, los rayos UV atraviesan las nubes. El protector solar no es negociable.",
  "El Cuello también envejece: Extiende siempre el protector solar hacia el cuello y el escote; son las zonas que más delatan la edad.",
  "Orejas Olvidadas: Las orejas reciben luz solar directa todo el día. No olvides pasar el sobrante del protector por ellas.",
  "Luz Azul y Pantallas: Si trabajas frente al ordenador, el protector Garnier también te protege de la luz azul que mancha la piel.",
  "La Regla de los Dos Dedos: Para cubrir cara y cuello, necesitas una línea de protector solar que cubra tus dedos índice y corazón.",
  "Conducir y el Sol: El cristal del coche no bloquea los rayos UVA. Tu brazo izquierdo y tu cara te agradecerán el protector en los trayectos.",
  "Sol de tarde: La luz de la 'Golden Hour' es preciosa para fotos, pero sigue teniendo carga UV. No bajes la guardia.",

  // --- VIENTO Y CLIMA (LEVANTE/PONIENTE) ---
  "Alerta de Levante: El viento de levante deshidrata la piel en minutos. Esos días, dobla la cantidad de hidratación por la noche.",
  "Efecto Poniente: La humedad del poniente es buena, pero puede hacer que sientas la piel pesada. Usa texturas gel esos días.",
  "Salitre en el Aire: Si has paseado por la orilla, limpia tu piel al llegar a casa. El salitre puede irritar y resecar en exceso.",
  "Bruma Hidratante: En días de levante fuerte, una bruma de agua termal durante el día evitará que la piel se cuartee.",
  "Labios al Viento: El viento de Cádiz castiga mucho los labios. Usa un bálsamo protector antes de salir de casa.",
  "Pelo y Cara: El viento lanza tu pelo contra la cara. Asegúrate de que tus productos capilares no sean demasiado grasos para evitar granitos.",
  "Protección Física: En días de viento extremo, unas gafas de sol grandes también protegen la delicada piel del contorno de ojos.",

  // --- RITUALES DE LIMPIEZA ---
  "Temperatura del Agua: Lava siempre tu cara con agua tibia. El agua muy caliente rompe los capilares y la muy fría no limpia bien el sebo.",
  "Toallas Exclusivas: Ten una toalla pequeña solo para tu cara y cámbiala cada 2-3 días para evitar bacterias.",
  "Secado por Presión: Nunca frotes la cara con la toalla. Seca con toques suaves para evitar la flacidez prematura.",
  "Manos Limpias: Parece obvio, pero lava tus manos con jabón siempre antes de empezar tu ritual de skincare.",
  "Limpieza Matutina: Por la mañana basta con quitar el sudor y el exceso de productos de la noche. No hace falta una limpieza agresiva.",
  "El Carbón de Solimo: Es ideal para limpiar poros profundamente, pero si sientes la piel tirante, alterna con el CeraVe Hydrating.",
  "Línea del Pelo: Al limpiar, asegúrate de llegar bien al nacimiento del pelo para evitar que se acumule producto y aparezcan granitos.",

  // --- HIDRATACIÓN Y ACTIVOS ---
  "Piel Húmeda: Aplica tus sérums (especialmente si tienen ácido hialurónico) con la piel ligeramente húmeda para 'atrapar' el agua.",
  "Espera 60 segundos: Deja que la Niacinamida se absorba totalmente antes de aplicar la crema hidratante.",
  "Menos es Más: La piel solo puede absorber una cantidad limitada de producto. No por poner más cantidad funcionará mejor.",
  "Masaje Ascendente: Aplica siempre tus cremas con movimientos hacia arriba y hacia afuera para luchar contra la gravedad.",
  "Cuidado con el Contorno: La piel del ojo es la más fina del cuerpo. Aplica el BoJ solo con el dedo anular, que es el que menos fuerza tiene.",
  "Puntos de Presión: Al aplicar el contorno, realiza ligeras presiones en el hueso orbital para estimular la circulación.",
  "Evita el Párpado Móvil: No apliques cremas pesadas directamente en el párpado móvil para evitar irritación en los ojos.",

  // --- HÁBITOS DE VIDA (SKINCARE HOLÍSTICO) ---
  "Sueño Reparador: La piel se regenera entre las 11 PM y las 4 AM. Intenta estar dormido en esa ventana de tiempo.",
  "La Funda de la Almohada: Si puedes, usa fundas de seda o satén. Evitan las arrugas de sueño y que la piel pierda hidratación.",
  "Cambio de Sábanas: Cambia la funda de tu almohada al menos una vez por semana para evitar la acumulación de aceites y bacterias.",
  "Hidratación Interna: Ninguna crema sustituye al agua que bebes. 2 litros al día son el mejor sérum del mundo.",
  "Alimentación y Piel: Los frutos rojos y el pescado azul (tan rico en Cádiz) aportan antioxidantes clave para tu luminosidad.",
  "No te toques la cara: Tus manos tocan monedas, móviles y pomos de puertas. Mantenerlas lejos de tu rostro es el mejor consejo anti-acné.",
  "Limpia tu móvil: La pantalla del teléfono acumula bacterias que luego pegas a tu mejilla. Límpiala con alcohol a diario.",
  "Gafas de Sol: Usarlas evita que frunzas el ceño constantemente, previniendo las arrugas de expresión entre las cejas.",

  // --- CONSEJOS SEGÚN LA EDAD Y TIPO DE PIEZA ---
  "Prevención es Clave: Es mucho más fácil prevenir una arruga con protector solar que quitarla con cremas después.",
  "Luminosidad vs Brillo: El objetivo es una piel jugosa ('glow'), no una piel grasa. Controla la zona T si es necesario.",
  "Piel Sensible: Si un producto te pica o te pone la cara roja, para inmediatamente. No todas las pieles aguantan todo.",
  "Escucha a tu piel: Hay días que tu piel pedirá más crema y otros que preferirá estar ligera. Ajusta tu rutina a ella.",

  // --- TRUCOS DE \"EXPERTO\" ---
  "El Truco de la Cuchara: Si te levantas con los ojos muy hinchados, aplica el Roll-on de L'Oréal y luego presiona suavemente con una cuchara fría.",
  "Puntos de Luz: Un poco de contorno de ojos en el arco de la ceja da un aspecto de mirada descansada instantáneo.",
  "Mezclas Prohibidas: Nunca mezcles el protector solar con tu base de maquillaje o crema; rompes la capa protectora.",
  "Orden de Capas: La regla de oro es: de lo más ligero (agua/sérum) a lo más pesado (crema/aceite/protector).",
  "Paciencia: Los resultados de un cambio en la rutina tardan al menos 28 días en verse (lo que tarda la piel en renovarse).",
  "Noche de Spa: Una vez a la semana, tómate tu tiempo. Masajea tu cara durante 5 minutos para liberar tensión muscular.",

  // --- ESPECÍFICOS PARA CÁDIZ ---
  "Atardeceres en la Playa: Después de un día de playa, una mascarilla hidratante fría es el mejor regalo para tu piel.",
  "Luz de Cádiz: Esta luz es intensa y única. Disfrútala, pero que tu piel esté siempre blindada con SPF.",
  "La Sal de la Bahía: El salitre es un exfoliante natural, pero puede ser agresivo. Lávalo siempre antes de dormir.",
  "Cero Alcohol: Evita tónicos con mucho alcohol, especialmente en verano, ya que sensibilizan la piel al sol.",

  // --- CONTINUACIÓN HASTA 150 ---
  "Dormir de Espaldas: Evita las arrugas de presión en la cara durmiendo boca arriba si te es posible.",
  "La Regla del Minuto: Masajea tu limpiador durante un minuto completo para que los ingredientes realmente actúen.",
  "Exfoliación con Sentido: La noche de Olay es tu exfoliación. No uses exfoliantes físicos (scrubs) otros días.",
  "Micro-relieve: Si notas la piel rugosa, el AHA de la noche de Olay ayudará a alisar la textura progresivamente.",
  "Labios Agrietados: Un poco de tu crema Akytania en los labios antes de dormir hace milagros si están muy secos.",
  "Luz de la Mañana: El protector solar se aplica 15-20 minutos antes de salir de casa para que cree la película protectora.",
  "Cuidado con el Pelo: El champú que cae por tu cara al ducharte puede irritar. Lávate la cara siempre DESPUÉS del pelo.",
  "Maquillaje sobre SPF: Espera 5 minutos después de ponerte el protector Garnier antes de aplicar cualquier maquillaje.",
  "Piel de Porcelana: La constancia es el ingrediente más caro y efectivo de cualquier rutina.",
  "Estrés y Piel: El cortisol inflama la piel. Tu ritual de noche es también un momento para respirar y bajar el estrés.",
  "Ejercicio y Skincare: Limpia tu cara siempre después de sudar en el gimnasio para evitar poros obstruidos.",
  "Pestañas y BoJ: Al aplicar el contorno de Beauty of Joseon, evita que toque las pestañas para no irritar el ojo.",
  "Dedo Anular: Es el dedo con menos fuerza; úsalo siempre para cualquier producto que apliques cerca del ojo.",
  "Cuidado con la Vitamina C: Si decides añadirla en el futuro, recuerda que no se lleva bien con ácidos fuertes como el AHA.",
  "Textura Gel: En verano, guarda tu hidratante tipo gel en la nevera para un efecto reafirmante por frío.",
  "Agua Micelar: Si la usas, recuerda que siempre es mejor aclararla con agua después para no dejar tensioactivos en la piel.",
  "No Revientes Granitos: Solo conseguirás una cicatriz que tardará meses en irse. Usa un parche o déjalo secar.",
  "Piel Mate vs Piel Jugosa: No temas al brillo natural; una piel sana refleja la luz, no es opaca.",
  "Protección en los Párpados: El protector Garnier es suave, pero ten cuidado de que no entre en los ojos al sudar.",
  "Cuello Posterior: Al ponerte el protector solar, no olvides la nuca si llevas el pelo recogido.",
  "Masaje en la Mandíbula: Al aplicar la crema de noche, masajea la zona de la mandíbula para relajar la tensión del día.",
  "Zonas Secas: Si tienes zonas muy secas, aplica una segunda capa de crema Akytania solo ahí.",
  "Ducha Fría: Terminar la ducha con agua fría en la cara ayuda a cerrar poros y activar la circulación.",
  "Luz Ultravioleta: Recuerda que los rayos UVA (envejecimiento) están presentes todo el año, incluso en invierno.",
  "Piel y Vitamina D: 10 minutos de sol en los brazos es suficiente. No sacrifiques la piel de tu cara por la Vitamina D.",
  "Evita Fumar: El tabaco reduce el flujo sanguíneo a la piel, robándole el brillo que buscamos en Cádiz.",
  "Alcohol y Deshidratación: Si sales de copas, bebe el doble de agua. Tu piel no se levantará apagada al día siguiente.",
  "Cuidado con el Sudor: El sudor tiene sales que pueden irritar la piel si se secan sobre ella. Aclara con agua fresca.",
  "Zona de las Sienes: Es donde primero aparecen las manchas solares. Asegúrate de cubrir bien esa zona con SPF.",
  "Drenaje Linfático: Realiza movimientos suaves desde el centro de la cara hacia las orejas para ayudar a drenar líquidos.",
  "El AHA es potente: Si la noche de Olay sientes mucho hormigueo, la próxima vez aplica una capa fina de hidratante debajo.",
  "Higiene de Brochas: Si usas maquillaje, lava tus brochas una vez por semana. Acumulan bacterias que dañan tu piel.",
  "Piel Grasienta vs Hidratada: Una piel grasa puede estar deshidratada. No saltes la crema aunque tengas brillos.",
  "Luz de la Oficina: Las luces fluorescentes también emiten pequeñas cantidades de radiación. SPF siempre.",
  "El Poder de la Niacinamida: Ayuda a regular la grasa y calma las rojeces. Sé constante para ver sus efectos.",
  "Cuidado con el Retinol: Si alguna vez lo incorporas, recuerda que Cádiz y el sol exigen una precaución extrema.",
  "Piel en el Avión: El aire de los aviones es sequísimo. Si viajas, aplica una capa extra de hidratación antes de subir.",
  "Gesticulación: Reír causa arrugas, pero son las mejores. No dejes de hacerlo, deja que el skincare cuide las líneas.",
  "Limpiador de Carbón: No lo dejes puesto como una mascarilla; aplícalo, masajea y aclara pronto.",
  "Ritual Matutino: Aprovecha esos 5 minutos para conectar contigo mismo y empezar el día con calma.",
  "Contorno de Ojos BoJ: Contiene retinal en baja dosis, lo que lo hace el mejor aliado antiedad para tu mirada.",
  "Capa de Protección: El protector solar es siempre el ÚLTIMO paso de tu rutina de día.",
  "Capa de Tratamiento: Los ácidos (como el AHA de Olay) son siempre el paso de tratamiento nocturno.",
  "Piel de Seda: La suavidad que sientes tras la noche de Olay es el resultado de eliminar células muertas.",
  "No Mezcles Marcas a lo loco: Tu rutina actual está equilibrada. Si añades algo nuevo, hazlo de uno en uno.",
  "Piel y Azúcar: El exceso de azúcar causa glicación, lo que destruye el colágeno. Moderación.",
  "Dormir Suficiente: 7-8 horas son esenciales para que los procesos de reparación celular se completen.",
  "Área de la Nariz: Suele ser donde más puntos negros hay. Masajea el Solimo Carbón con énfasis en las aletas de la nariz.",
  "Protección en Invierno: En Puerto Real el sol sigue brillando en enero. El SPF es para los 365 días.",
  "Mantenimiento: Revisa las fechas de caducidad de tus productos. Un protector solar abierto hace más de un año pierde eficacia.",
  "Sensación Táctil: Aprende a reconocer cuándo tu piel está 'saciada' de producto y cuándo necesita un refuerzo.",
  "Piel y Menstruación: Tu piel cambiará según tu ciclo. Sé más suave con ella durante esos días si está sensible.",
  "Doble Limpieza: Si usas protector solar resistente al agua, la doble limpieza no es una opción, es una necesidad.",
  "Piel y Deporte: Nunca te ejercites con maquillaje puesto; la mezcla de sudor y base obstruye los poros.",
  "Limpieza de Gafas: Limpia las almohadillas de tus gafas; ahí se acumula grasa que puede causar granitos en la nariz.",
  "Contorno de Labios: Lo que sobra del contorno de ojos BoJ, aplícalo en el 'código de barras' de los labios.",
  "Piel Saludable: El objetivo no es la perfección, sino una piel que se sienta cómoda y esté sana.",
  "AHA y Sol: El AHA hace tu piel más sensible al sol al día siguiente. No olvides el Garnier SPF 50 el jueves y domingo.",
  "Piel y Almohada: Si duermes de lado, intenta que tu cara no esté totalmente aplastada contra la almohada.",
  "El Espejo de Aumento: ¡Tíralo! Nadie te ve tan de cerca. Solo sirve para que te obsesiones con poros normales.",
  "Reflejo de la Luz: Una piel bien hidratada refleja la luz de Cádiz de forma espectacular. La hidratación es la clave.",
  "Sérum de Niacinamida: Si notas que te salen granitos al empezar, puede ser 'purga'. Dale 2 semanas de margen.",
  "Piel Radiante: La belleza de tu piel empieza en tu mente. Trátate con cariño mientras aplicas tus productos.",
  "Luz de Luna: Tu piel descansa contigo. El ritual de noche es el cierre perfecto para un día en la Bahía.",
  "Protector Garnier: Es tan ligero que no tienes excusa para no usarlo. Es tu mejor seguro de vida cutáneo.",
  "Akytania: Una marca que entiende la luz. Disfruta de su textura y de cómo calma tu piel tras el día.",
  "Orden de Olay: Limpieza -> Contorno Ojos -> Crema Olay. Sin pasos intermedios que interfieran.",
  "Orden de Noche Normal: Limpieza -> Sérum -> Contorno Ojos -> Crema Final.",
  "Orden de Mañana: Limpieza -> Contorno Ojos -> Hidratante -> PROTECTOR SOLAR.",
  "Final del Ritual: Sonríe al espejo. Tu piel está lista, tú estás listo. Disfruta de la Luz de Cádiz."
];
