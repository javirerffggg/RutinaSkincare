export type DayOfWeek = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';

export interface Step {
  id: string;
  stepNumber: number;
  title: string;
  product: string;
  notes?: string;
  icon?: string;
  category: 'Limpieza' | 'Ojos' | 'Hidratación' | 'Protección' | 'Sérum' | 'Crema' | 'Cabello';
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
      { id: 'm-hair', stepNumber: 2, category: 'Cabello', title: 'Tratamiento', product: 'Minoxidil Normopil 5%', notes: 'Aplicar en entradas y masajear bien.' },
      { id: 'm2', stepNumber: 3, category: 'Ojos', title: 'Ojos', product: 'L\'Oréal Roll-on', notes: 'Truco: Guárdalo en la nevera para deshinchar.' },
      { id: 'm3', stepNumber: 4, category: 'Hidratación', title: 'Hidratación', product: 'Invierno: Crema Akytania / Verano: Gel L\'Oréal o NADA' },
      { id: 'm4', stepNumber: 5, category: 'Protección', title: 'Protección', product: 'Garnier Super UV Fluido SPF 50', notes: 'Obligatorio siempre. Agita el bote antes de usar.' },
    ],
    night: [
      { id: 'n1', stepNumber: 1, category: 'Limpieza', title: 'Limpiador', product: 'Solimo Carbón' },
      { id: 'n-hair', stepNumber: 2, category: 'Cabello', title: 'Tratamiento', product: 'Minoxidil Normopil 5%', notes: 'Aplicación nocturna (30 min antes de dormir).' },
      { id: 'n2', stepNumber: 3, category: 'Sérum', title: 'Sérum Cara', product: 'Niacinamida T.O.', notes: '3 gotas para toda la cara.' },
      { id: 'n3', stepNumber: 4, category: 'Ojos', title: 'Contorno Ojos', product: 'Beauty of Joseon' },
      { id: 'n4', stepNumber: 5, category: 'Crema', title: 'Crema Final', product: 'Akytania o Cien Q10' },
    ]
  },
  'Martes': {
    morning: [
      { id: 'm1', stepNumber: 1, category: 'Limpieza', title: 'Limpieza', product: 'Agua fresca o CeraVe Hydrating' },
      { id: 'm-hair', stepNumber: 2, category: 'Cabello', title: 'Tratamiento', product: 'Minoxidil Normopil 5%' },
      { id: 'm2', stepNumber: 3, category: 'Ojos', title: 'Ojos', product: 'L\'Oréal Roll-on' },
      { id: 'm3', stepNumber: 4, category: 'Hidratación', title: 'Hidratación', product: 'Invierno: Crema Akytania / Verano: Gel L\'Oréal o NADA' },
      { id: 'm4', stepNumber: 5, category: 'Protección', title: 'Protección', product: 'Garnier Super UV Fluido SPF 50' },
    ],
    night: [
      { id: 'n1', stepNumber: 1, category: 'Limpieza', title: 'Limpiador', product: 'Solimo Carbón' },
      { id: 'n-hair', stepNumber: 2, category: 'Cabello', title: 'Tratamiento', product: 'Minoxidil Normopil 5%' },
      { id: 'n2', stepNumber: 3, category: 'Sérum', title: 'Sérum Cara', product: 'Niacinamida T.O.' },
      { id: 'n3', stepNumber: 4, category: 'Ojos', title: 'Contorno Ojos', product: 'Beauty of Joseon' },
      { id: 'n4', stepNumber: 5, category: 'Crema', title: 'Crema Final', product: 'Akytania o Cien Q10' },
    ]
  },
  'Miércoles': {
    morning: [
      { id: 'm1', stepNumber: 1, category: 'Limpieza', title: 'Limpieza', product: 'Agua fresca o CeraVe Hydrating' },
      { id: 'm-hair', stepNumber: 2, category: 'Cabello', title: 'Tratamiento', product: 'Minoxidil Normopil 5%' },
      { id: 'm2', stepNumber: 3, category: 'Ojos', title: 'Ojos', product: 'L\'Oréal Roll-on' },
      { id: 'm3', stepNumber: 4, category: 'Hidratación', title: 'Hidratación', product: 'Invierno: Crema Akytania / Verano: Gel L\'Oréal o NADA' },
      { id: 'm4', stepNumber: 5, category: 'Protección', title: 'Protección', product: 'Garnier Super UV Fluido SPF 50' },
    ],
    night: [
      { id: 'n1', stepNumber: 1, category: 'Limpieza', title: 'Limpiador', product: 'CeraVe (Suave)' },
      { id: 'n-hair', stepNumber: 2, category: 'Cabello', title: 'Tratamiento', product: 'Minoxidil Normopil 5%' },
      { id: 'n2', stepNumber: 3, category: 'Sérum', title: 'Sérum Cara', product: 'NADA', notes: 'Noche de Olay (AHA)' },
      { id: 'n3', stepNumber: 4, category: 'Ojos', title: 'Contorno Ojos', product: 'Beauty of Joseon' },
      { id: 'n4', stepNumber: 5, category: 'Crema', title: 'Crema Final', product: 'Olay Vit C + AHA', notes: 'Tratamiento completo. No usar Niacinamida.' },
    ]
  },
  'Jueves': {
    morning: [
      { id: 'm1', stepNumber: 1, category: 'Limpieza', title: 'Limpieza', product: 'Agua fresca o CeraVe Hydrating' },
      { id: 'm-hair', stepNumber: 2, category: 'Cabello', title: 'Tratamiento', product: 'Minoxidil Normopil 5%' },
      { id: 'm2', stepNumber: 3, category: 'Ojos', title: 'Ojos', product: 'L\'Oréal Roll-on' },
      { id: 'm3', stepNumber: 4, category: 'Hidratación', title: 'Hidratación', product: 'Invierno: Crema Akytania / Verano: Gel L\'Oréal o NADA' },
      { id: 'm4', stepNumber: 5, category: 'Protección', title: 'Protección', product: 'Garnier Super UV Fluido SPF 50' },
    ],
    night: [
      { id: 'n1', stepNumber: 1, category: 'Limpieza', title: 'Limpiador', product: 'Solimo Carbón' },
      { id: 'n-hair', stepNumber: 2, category: 'Cabello', title: 'Tratamiento', product: 'Minoxidil Normopil 5%' },
      { id: 'n2', stepNumber: 3, category: 'Sérum', title: 'Sérum Cara', product: 'Niacinamida T.O.' },
      { id: 'n3', stepNumber: 4, category: 'Ojos', title: 'Contorno Ojos', product: 'Beauty of Joseon' },
      { id: 'n4', stepNumber: 5, category: 'Crema', title: 'Crema Final', product: 'Akytania o Cien Q10' },
    ]
  },
  'Viernes': {
    morning: [
      { id: 'm1', stepNumber: 1, category: 'Limpieza', title: 'Limpieza', product: 'Agua fresca o CeraVe Hydrating' },
      { id: 'm-hair', stepNumber: 2, category: 'Cabello', title: 'Tratamiento', product: 'Minoxidil Normopil 5%' },
      { id: 'm2', stepNumber: 3, category: 'Ojos', title: 'Ojos', product: 'L\'Oréal Roll-on' },
      { id: 'm3', stepNumber: 4, category: 'Hidratación', title: 'Hidratación', product: 'Invierno: Crema Akytania / Verano: Gel L\'Oréal o NADA' },
      { id: 'm4', stepNumber: 5, category: 'Protección', title: 'Protección', product: 'Garnier Super UV Fluido SPF 50' },
    ],
    night: [
      { id: 'n1', stepNumber: 1, category: 'Limpieza', title: 'Limpiador', product: 'Solimo Carbón' },
      { id: 'n-hair', stepNumber: 2, category: 'Cabello', title: 'Tratamiento', product: 'Minoxidil Normopil 5%' },
      { id: 'n2', stepNumber: 3, category: 'Sérum', title: 'Sérum Cara', product: 'Niacinamida T.O.' },
      { id: 'n3', stepNumber: 4, category: 'Ojos', title: 'Contorno Ojos', product: 'Beauty of Joseon' },
      { id: 'n4', stepNumber: 5, category: 'Crema', title: 'Crema Final', product: 'Akytania o Cien Q10' },
    ]
  },
  'Sábado': {
    morning: [
      { id: 'm1', stepNumber: 1, category: 'Limpieza', title: 'Limpieza', product: 'Agua fresca o CeraVe Hydrating' },
      { id: 'm-hair', stepNumber: 2, category: 'Cabello', title: 'Tratamiento', product: 'Minoxidil Normopil 5%' },
      { id: 'm2', stepNumber: 3, category: 'Ojos', title: 'Ojos', product: 'L\'Oréal Roll-on' },
      { id: 'm3', stepNumber: 4, category: 'Hidratación', title: 'Hidratación', product: 'Invierno: Crema Akytania / Verano: Gel L\'Oréal o NADA' },
      { id: 'm4', stepNumber: 5, category: 'Protección', title: 'Protección', product: 'Garnier Super UV Fluido SPF 50' },
    ],
    night: [
      { id: 'n1', stepNumber: 1, category: 'Limpieza', title: 'Limpiador', product: 'CeraVe (Suave)' },
      { id: 'n-hair', stepNumber: 2, category: 'Cabello', title: 'Tratamiento', product: 'Minoxidil Normopil 5%' },
      { id: 'n2', stepNumber: 3, category: 'Sérum', title: 'Sérum Cara', product: 'NADA', notes: 'Noche de Olay (AHA)' },
      { id: 'n3', stepNumber: 4, category: 'Ojos', title: 'Contorno Ojos', product: 'Beauty of Joseon' },
      { id: 'n4', stepNumber: 5, category: 'Crema', title: 'Crema Final', product: 'Olay Vit C + AHA' },
    ]
  },
  'Domingo': {
    morning: [
      { id: 'm1', stepNumber: 1, category: 'Limpieza', title: 'Limpieza', product: 'Agua fresca o CeraVe Hydrating' },
      { id: 'm-hair', stepNumber: 2, category: 'Cabello', title: 'Tratamiento', product: 'Minoxidil Normopil 5%' },
      { id: 'm2', stepNumber: 3, category: 'Ojos', title: 'Ojos', product: 'L\'Oréal Roll-on' },
      { id: 'm3', stepNumber: 4, category: 'Hidratación', title: 'Hidratación', product: 'Invierno: Crema Akytania / Verano: Gel L\'Oréal o NADA' },
      { id: 'm4', stepNumber: 5, category: 'Protección', title: 'Protección', product: 'Garnier Super UV Fluido SPF 50' },
    ],
    night: [
      { id: 'n1', stepNumber: 1, category: 'Limpieza', title: 'Limpiador', product: 'Solimo Carbón' },
      { id: 'n-hair', stepNumber: 2, category: 'Cabello', title: 'Tratamiento', product: 'Minoxidil Normopil 5%' },
      { id: 'n2', stepNumber: 3, category: 'Sérum', title: 'Sérum Cara', product: 'Niacinamida T.O.' },
      { id: 'n3', stepNumber: 4, category: 'Ojos', title: 'Contorno Ojos', product: 'Beauty of Joseon' },
      { id: 'n4', stepNumber: 5, category: 'Crema', title: 'Crema Final', product: 'Akytania o Cien Q10' },
    ]
  }
};

export interface GoldenTip {
  id: string;
  text: string;
}

export const GOLDEN_REMINDERS: GoldenTip[] = [
  // --- REGLAS CRÍTICAS (PRODUCTOS ESPECÍFICOS) ---
  { id: 'tip-1', text: "Regla de la Olay (Miércoles y Sábados): Esas noches NUNCA uses la Niacinamida de The Ordinary. La crema Olay ya es el tratamiento completo." },
  { id: 'tip-2', text: "El margen de seguridad: Cuando te pongas la crema Olay, no la acerques demasiado a los ojos (donde ya has puesto el de Beauty of Joseon). Deja un dedo de distancia." },
  { id: 'tip-3', text: "Cantidad de Niacinamida: Con 3 gotas para toda la cara es suficiente. Si usas más, te saldrán 'pelotillas' blancas al poner la crema después." },
  { id: 'tip-4', text: "Orden del Contorno BoJ: Siempre ponlo antes de tu crema de noche (Cien, Akytania u Olay) para que los activos no se diluyan." },
  { id: 'tip-5', text: "Agita el Garnier: El fluido Super UV SPF 50 es bifásico. Agítalo con energía antes de cada aplicación para asegurar la protección." },
  { id: 'tip-6', text: "El Roll-on de L'Oréal: Truco de experto: guárdalo siempre en la nevera. El frío potencia el efecto drenante sobre las bolsas matutinas." },
  { id: 'tip-7', text: "Doble Limpieza Nocturna: El Solimo Carbón es potente. Si has usado mucho protector, limpia primero con agua micelar y luego con el jabón." },
  { id: 'tip-8', text: "Akytania en Invierno: Cuando el frío apriete, calienta la crema entre tus manos antes de presionarla suavemente sobre el rostro." },

  // --- MINOXIDIL Y CUIDADO CAPILAR ---
  { id: 'tip-hair-1', text: "Prevención de Hipertricosis: Ten mucho cuidado al aplicar el Minoxidil en las entradas. Si el producto gotea por tu frente, límpialo inmediatamente para evitar la aparición de vello no deseado en zonas faciales." },
  { id: 'tip-hair-2', text: "Control de Transferencia Nocturna: Aplica el Minoxidil al menos 30 minutos antes de irte a dormir. Esto asegura que el producto se absorba y no se transfiera de la almohada a tu cara mientras duermes." },
  { id: 'tip-hair-3', text: "Higiene de Manos: Lávate las manos a conciencia con jabón después de masajear el Minoxidil. Es vital no llevar restos del fármaco a los ojos o labios cuando apliques tus cremas faciales después." },

  // --- SOL Y LUZ DEL ATLÁNTICO ---
  { id: 'tip-9', text: "Protección en la Sombra: La arena de la Caleta refleja hasta el 15% de la radiación UV. Protégete aunque estés bajo la sombrilla." },
  { id: 'tip-10', text: "El Reflejo del Agua: Si estás cerca del mar, la radiación se multiplica. Reaplica el SPF 50 cada 2 horas sin falta." },
  { id: 'tip-11', text: "Nubes Engañosas: En días de bruma atlántica, los rayos UV atraviesan las nubes. El protector solar no es negociable." },
  { id: 'tip-12', text: "El Cuello también envejece: Extiende siempre el protector solar hacia el cuello y el escote; son las zonas que más delatan la edad." },
  { id: 'tip-13', text: "Orejas Olvidadas: Las orejas reciben luz solar directa todo el día. No olvides pasar el sobrante del protector por ellas." },
  { id: 'tip-14', text: "Luz Azul y Pantallas: Si trabajas frente al ordenador, el protector Garnier también te protege de la luz azul que mancha la piel." },
  { id: 'tip-15', text: "La Regla de los Dos Dedos: Para cubrir cara y cuello, necesitas una línea de protector solar que cubra tus dedos índice y corazón." },
  { id: 'tip-16', text: "Conducir y el Sol: El cristal del coche no bloquea los rayos UVA. Tu brazo izquierdo y tu cara te agradecerán el protector en los trayectos." },
  { id: 'tip-17', text: "Sol de tarde: La luz de la 'Golden Hour' es preciosa para fotos, pero sigue teniendo carga UV. No bajes la guardia." },

  // --- VIENTO Y CLIMA (LEVANTE/PONIENTE) ---
  { id: 'tip-18', text: "Alerta de Levante: El viento de levante deshidrata la piel en minutos. Esos días, dobla la cantidad de hidratación por la noche." },
  { id: 'tip-19', text: "Efecto Poniente: La humedad del poniente es buena, pero puede hacer que sientas la piel pesada. Usa texturas gel esos días." },
  { id: 'tip-20', text: "Salitre en el Aire: Si has paseado por la orilla, limpia tu piel al llegar a casa. El salitre puede irritar y resecar en exceso." },
  { id: 'tip-21', text: "Bruma Hidratante: En días de levante fuerte, una bruma de agua termal durante el día evitará que la piel se cuartee." },
  { id: 'tip-22', text: "Labios al Viento: El viento de Cádiz castiga mucho los labios. Usa un bálsamo protector antes de salir de casa." },
  { id: 'tip-23', text: "Pelo y Cara: El viento lanza tu pelo contra la cara. Asegúrate de que tus productos capilares no sean demasiado grasos para evitar granitos." },
  { id: 'tip-24', text: "Protección Física: En días de viento extremo, unas gafas de sol grandes también protegen la delicada piel del contorno de ojos." },

  // --- RITUALES DE LIMPIEZA ---
  { id: 'tip-25', text: "Temperatura del Agua: Lava siempre tu cara con agua tibia. El agua muy caliente rompe los capilares y la muy fría no limpia bien el sebo." },
  { id: 'tip-26', text: "Toallas Exclusivas: Ten una toalla pequeña solo para tu cara y cámbiala cada 2-3 días para evitar bacterias." },
  { id: 'tip-27', text: "Secado por Presión: Nunca frotes la cara con la toalla. Seca con toques suaves para evitar la flacidez prematura." },
  { id: 'tip-28', text: "Manos Limpias: Parece obvio, pero lava tus manos con jabón siempre antes de empezar tu ritual de skincare." },
  { id: 'tip-29', text: "Limpieza Matutina: Por la mañana basta con quitar el sudor y el exceso de productos de la noche. No hace falta una limpieza agresiva." },
  { id: 'tip-30', text: "El Carbón de Solimo: Es ideal para limpiar poros profundamente, pero si sientes la piel tirante, alterna con el CeraVe Hydrating." },
  { id: 'tip-31', text: "Línea del Pelo: Al limpiar, asegúrate de llegar bien al nacimiento del pelo para evitar que se acumule producto y aparezcan granitos." },

  // --- HIDRATACIÓN Y ACTIVOS ---
  { id: 'tip-32', text: "Piel Húmeda: Aplica tus sérums (especialmente si tienen ácido hialurónico) con la piel ligeramente húmeda para 'atrapar' el agua." },
  { id: 'tip-33', text: "Espera 60 segundos: Deja que la Niacinamida se absorba totalmente antes de aplicar la crema hidratante." },
  { id: 'tip-34', text: "Menos es Más: La piel solo puede absorber una cantidad limitada de producto. No por poner más cantidad funcionará mejor." },
  { id: 'tip-35', text: "Masaje Ascendente: Aplica siempre tus cremas con movimientos hacia arriba y hacia afuera para luchar contra la gravedad." },
  { id: 'tip-36', text: "Cuidado con el Contorno: La piel del ojo es la más fina del cuerpo. Aplica el BoJ solo con el dedo anular, que es el que menos fuerza tiene." },
  { id: 'tip-37', text: "Puntos de Presión: Al aplicar el contorno, realiza ligeras presiones en el hueso orbital para estimular la circulación." },
  { id: 'tip-38', text: "Evita el Párpado Móvil: No apliques cremas pesadas directamente en el párpado móvil para evitar irritación en los ojos." },

  // --- HÁBITOS DE VIDA (SKINCARE HOLÍSTICO) ---
  { id: 'tip-39', text: "Sueño Reparador: La piel se regenera entre las 11 PM y las 4 AM. Intenta estar dormido en esa ventana de tiempo." },
  { id: 'tip-40', text: "La Funda de la Almohada: Si puedes, usa fundas de seda o satén. Evitan las arrugas de sueño y que la piel pierda hidratación." },
  { id: 'tip-41', text: "Cambio de Sábanas: Cambia la funda de tu almohada al menos una vez por semana para evitar la acumulación de aceites y bacterias." },
  { id: 'tip-42', text: "Hidratación Interna: Ninguna crema sustituye al agua que bebes. 2 litros al día son el mejor sérum del mundo." },
  { id: 'tip-43', text: "Alimentación y Piel: Los frutos rojos y el pescado azul (tan rico en Cádiz) aportan antioxidantes clave para tu luminosidad." },
  { id: 'tip-44', text: "No te toques la cara: Tus manos tocan monedas, móviles y pomos de puertas. Mantenerlas lejos de tu rostro es el mejor consejo anti-acné." },
  { id: 'tip-45', text: "Limpia tu móvil: La pantalla del teléfono acumula bacterias que luego pegas a tu mejilla. Límpiala con alcohol a diario." },
  { id: 'tip-46', text: "Gafas de Sol: Usarlas evita que frunzas el ceño constantemente, previniendo las arrugas de expresión entre las cejas." },

  // --- CONSEJOS SEGÚN LA EDAD Y TIPO DE PIEL ---
  { id: 'tip-47', text: "Prevención es Clave: Es mucho más fácil prevenir una arruga con protector solar que quitarla con cremas después." },
  { id: 'tip-48', text: "Luminosidad vs Brillo: El objetivo es una piel jugosa ('glow'), no una piel grasa. Controla la zona T si es necesario." },
  { id: 'tip-49', text: "Piel Sensible: Si un producto te pica o te pone la cara roja, para inmediatamente. No todas las pieles aguantan todo." },
  { id: 'tip-50', text: "Escucha a tu piel: Hay días que tu piel pedirá más crema y otros que preferirá estar ligera. Ajusta tu rutina a ella." },

  // --- TRUCOS DE \"EXPERTO\" ---
  { id: 'tip-51', text: "El Truco de la Cuchara: Si te levantas con los ojos muy hinchados, aplica el Roll-on de L'Oréal y luego presiona suavemente con una cuchara fría." },
  { id: 'tip-52', text: "Puntos de Luz: Un poco de contorno de ojos en el arco de la ceja da un aspecto de mirada descansada instantáneo." },
  { id: 'tip-53', text: "Mezclas Prohibidas: Nunca mezcles el protector solar con tu base de maquillaje o crema; rompes la capa protectora." },
  { id: 'tip-54', text: "Orden de Capas: La regla de oro es: de lo más ligero (agua/sérum) a lo más pesado (crema/aceite/protector)." },
  { id: 'tip-55', text: "Paciencia: Los resultados de un cambio en la rutina tardan al menos 28 días en verse (lo que tarda la piel en renovarse)." },
  { id: 'tip-56', text: "Noche de Spa: Una vez a la semana, tómate tu tiempo. Masajea tu cara durante 5 minutos para liberar tensión muscular." },

  // --- ESPECÍFICOS PARA CÁDIZ ---
  { id: 'tip-57', text: "Atardeceres en la Playa: Después de un día de playa, una mascarilla hidratante fría es el mejor regalo para tu piel." },
  { id: 'tip-58', text: "Luz de Cádiz: Esta luz es intensa y única. Disfrútala, pero que tu piel esté siempre blindada con SPF." },
  { id: 'tip-59', text: "La Sal de la Bahía: El salitre es un exfoliante natural, pero puede ser agresivo. Lávalo siempre antes de dormir." },
  { id: 'tip-60', text: "Cero Alcohol: Evita tónicos con mucho alcohol, especialmente en verano, ya que sensibilizan la piel al sol." },

  // --- CONTINUACIÓN HASTA 150 ---
  { id: 'tip-61', text: "Dormir de Espaldas: Evita las arrugas de presión en la cara durmiendo boca arriba si te es posible." },
  { id: 'tip-62', text: "La Regla del Minuto: Masajea tu limpiador durante un minuto completo para que los ingredientes realmente actúen." },
  { id: 'tip-63', text: "Exfoliación con Sentido: La noche de Olay es tu exfoliación. No uses exfoliantes físicos (scrubs) otros días." },
  { id: 'tip-64', text: "Micro-relieve: Si notas la piel rugosa, el AHA de la noche de Olay ayudará a alisar la textura progresivamente." },
  { id: 'tip-65', text: "Labios Agrietados: Un poco de tu crema Akytania en los labios antes de dormir hace milagros si están muy secos." },
  { id: 'tip-66', text: "Luz de la Mañana: El protector solar se aplica 15-20 minutos antes de salir de casa para que cree la película protectora." },
  { id: 'tip-67', text: "Cuidado con el Pelo: El champú que cae por tu cara al ducharte puede irritar. Lávate la cara siempre DESPUÉS del pelo." },
  { id: 'tip-68', text: "Maquillaje sobre SPF: Espera 5 minutos después de ponerte el protector Garnier antes de aplicar cualquier maquillaje." },
  { id: 'tip-69', text: "Piel de Porcelana: La constancia es el ingrediente más caro y efectivo de cualquier rutina." },
  { id: 'tip-70', text: "Estrés y Piel: El cortisol inflama la piel. Tu ritual de noche es también un momento para respirar y bajar el estrés." },
  { id: 'tip-71', text: "Ejercicio y Skincare: Limpia tu cara siempre después de sudar en el gimnasio para evitar poros obstruidos." },
  { id: 'tip-72', text: "Pestañas y BoJ: Al aplicar el contorno de Beauty of Joseon, evita que toque las pestañas para no irritar el ojo." },
  { id: 'tip-73', text: "Dedo Anular: Es el dedo con menos fuerza; úsalo siempre para cualquier producto que apliques cerca del ojo." },
  { id: 'tip-74', text: "Cuidado con la Vitamina C: Si decides añadirla en el futuro, recuerda que no se lleva bien con ácidos fuertes como el AHA." },
  { id: 'tip-75', text: "Textura Gel: En verano, guarda tu hidratante tipo gel en la nevera para un efecto reafirmante por frío." },
  { id: 'tip-76', text: "Agua Micelar: Si la usas, recuerda que siempre es mejor aclararla con agua después para no dejar tensioactivos en la piel." },
  { id: 'tip-77', text: "No Revientes Granitos: Solo conseguirás una cicatriz que tardará meses en irse. Usa un parche o déjalo secar." },
  { id: 'tip-78', text: "Piel Mate vs Piel Jugosa: No temas al brillo natural; una piel sana refleja la luz, no es opaca." },
  { id: 'tip-79', text: "Protección en los Párpados: El protector Garnier es suave, pero ten cuidado de que no entre en los ojos al sudar." },
  { id: 'tip-80', text: "Cuello Posterior: Al ponerte el protector solar, no olvides la nuca si llevas el pelo recogido." },
  { id: 'tip-81', text: "Masaje en la Mandíbula: Al aplicar la crema de noche, masajea la zona de la mandíbula para relajar la tensión del día." },
  { id: 'tip-82', text: "Zonas Secas: Si tienes zonas muy secas, aplica una segunda capa de crema Akytania solo ahí." },
  { id: 'tip-83', text: "Ducha Fría: Terminar la ducha con agua fría en la cara ayuda a cerrar poros y activar la circulación." },
  { id: 'tip-84', text: "Luz Ultravioleta: Recuerda que los rayos UVA (envejecimiento) están presentes todo el año, incluso en invierno." },
  { id: 'tip-85', text: "Piel y Vitamina D: 10 minutos de sol en los brazos es suficiente. No sacrifiques la piel de tu cara por la Vitamina D." },
  { id: 'tip-86', text: "Evita Fumar: El tabaco reduce el flujo sanguíneo a la piel, robándole el brillo que buscamos en Cádiz." },
  { id: 'tip-87', text: "Alcohol y Deshidratación: Si sales de copas, bebe el doble de agua. Tu piel no se levantará apagada al día siguiente." },
  { id: 'tip-88', text: "Cuidado con el Sudor: El sudor tiene sales que pueden irritar la piel si se secan sobre ella. Aclara con agua fresca." },
  { id: 'tip-89', text: "Zona de las Sienes: Es donde primero aparecen las manchas solares. Asegúrate de cubrir bien esa zona con SPF." },
  { id: 'tip-90', text: "Drenaje Linfático: Realiza movimientos suaves desde el centro de la cara hacia las orejas para ayudar a drenar líquidos." },
  { id: 'tip-91', text: "El AHA es potente: Si la noche de Olay sientes mucho hormigueo, la próxima vez aplica una capa fina de hidratante debajo." },
  { id: 'tip-92', text: "Higiene de Brochas: Si usas maquillaje, lava tus brochas una vez por semana. Acumulan bacterias que dañan tu piel." },
  { id: 'tip-93', text: "Piel Grasienta vs Hidratada: Una piel grasa puede estar deshidratada. No saltes la crema aunque tengas brillos." },
  { id: 'tip-94', text: "Luz de la Oficina: Las luces fluorescentes también emiten pequeñas cantidades de radiación. SPF siempre." },
  { id: 'tip-95', text: "El Poder de la Niacinamida: Ayuda a regular la grasa y calma las rojeces. Sé constante para ver sus efectos." },
  { id: 'tip-96', text: "Cuidado con el Retinol: Si alguna vez lo incorporas, recuerda que Cádiz y el sol exigen una precaución extrema." },
  { id: 'tip-97', text: "Piel en el Avión: El aire de los aviones es sequísimo. Si viajas, aplica una capa extra de hidratación antes de subir." },
  { id: 'tip-98', text: "Gesticulación: Reír causa arrugas, pero son las mejores. No dejes de hacerlo, deja que el skincare cuide las líneas." },
  { id: 'tip-99', text: "Limpiador de Carbón: No lo dejes puesto como una mascarilla; aplícalo, masajea y aclara pronto." },
  { id: 'tip-100', text: "Ritual Matutino: Aprovecha esos 5 minutos para conectar contigo mismo y empezar el día con calma." },
  { id: 'tip-101', text: "Contorno de Ojos BoJ: Contiene retinal en baja dosis, lo que lo hace el mejor aliado antiedad para tu mirada." },
  { id: 'tip-102', text: "Capa de Protección: El protector solar es siempre el ÚLTIMO paso de tu rutina de día." },
  { id: 'tip-103', text: "Capa de Tratamiento: Los ácidos (como el AHA de Olay) son siempre el paso de tratamiento nocturno." },
  { id: 'tip-104', text: "Piel de Seda: La suavidad que sientes tras la noche de Olay es el resultado de eliminar células muertas." },
  { id: 'tip-105', text: "No Mezcles Marcas a lo loco: Tu rutina actual está equilibrada. Si añades algo nuevo, hazlo de uno en uno." },
  { id: 'tip-106', text: "Piel y Azúcar: El exceso de azúcar causa glicación, lo que destruye el colágeno. Moderación." },
  { id: 'tip-107', text: "Dormir Suficiente: 7-8 horas son esenciales para que los procesos de reparación celular se completen." },
  { id: 'tip-108', text: "Área de la Nariz: Suele ser donde más puntos negros hay. Masajea el Solimo Carbón con énfasis en las aletas de la nariz." },
  { id: 'tip-109', text: "Protección en Invierno: En Puerto Real el sol sigue brillando en enero. El SPF es para los 365 días." },
  { id: 'tip-110', text: "Mantenimiento: Revisa las fechas de caducidad de tus productos. Un protector solar abierto hace más de un año pierde eficacia." },
  { id: 'tip-111', text: "Sensación Táctil: Aprende a reconocer cuándo tu piel está 'saciada' de producto y cuándo necesita un refuerzo." },
  { id: 'tip-112', text: "Piel y Menstruación: Tu piel cambiará según tu ciclo. Sé más suave con ella durante esos días si está sensible." },
  { id: 'tip-113', text: "Doble Limpieza: Si usas protector solar resistente al agua, la doble limpieza no es una opción, es una necesidad." },
  { id: 'tip-114', text: "Piel y Deporte: Nunca te ejercites con maquillaje puesto; la mezcla de sudor y base obstruye los poros." },
  { id: 'tip-115', text: "Limpieza de Gafas: Limpia las almohadillas de tus gafas; ahí se acumula grasa que puede causar granitos en la nariz." },
  { id: 'tip-116', text: "Contorno de Labios: Lo que sobra del contorno de ojos BoJ, aplícalo en el 'código de barras' de los labios." },
  { id: 'tip-117', text: "Piel Saludable: El objetivo no es la perfección, sino una piel que se sienta cómoda y esté sana." },
  { id: 'tip-118', text: "AHA y Sol: El AHA hace tu piel más sensible al sol al día siguiente. No olvides el Garnier SPF 50 el jueves y domingo." },
  { id: 'tip-119', text: "Piel y Almohada: Si duermes de lado, intenta que tu cara no esté totalmente aplastada contra la almohada." },
  { id: 'tip-120', text: "El Espejo de Aumento: ¡Tíralo! Nadie te ve tan de cerca. Solo sirve para que te obsesiones con poros normales." },
  { id: 'tip-121', text: "Reflejo de la Luz: Una piel bien hidratada refleja la luz de Cádiz de forma espectacular. La hidratación es la clave." },
  { id: 'tip-122', text: "Sérum de Niacinamida: Si notas que te salen granitos al empezar, puede ser 'purga'. Dale 2 semanas de margen." },
  { id: 'tip-123', text: "Piel Radiante: La belleza de tu piel empieza en tu mente. Trátate con cariño mientras aplicas tus productos." },
  { id: 'tip-124', text: "Luz de Luna: Tu piel descansa contigo. El ritual de noche es el cierre perfecto para un día en la Bahía." },
  { id: 'tip-125', text: "Protector Garnier: Es tan ligero que no tienes excusa para no usarlo. Es tu mejor seguro de vida cutáneo." },
  { id: 'tip-126', text: "Akytania: Una marca que entiende la luz. Disfruta de su textura y de cómo calma tu piel tras el día." },
  { id: 'tip-127', text: "Orden de Olay: Limpieza -> Contorno Ojos -> Crema Olay. Sin pasos intermedios que interfieran." },
  { id: 'tip-128', text: "Orden de Noche Normal: Limpieza -> Sérum -> Contorno Ojos -> Crema Final." },
  { id: 'tip-129', text: "Orden de Mañana: Limpieza -> Contorno Ojos -> Hidratante -> PROTECTOR SOLAR." },
  { id: 'tip-130', text: "Final del Ritual: Sonríe al espejo. Tu piel está lista, tú estás listo. Disfruta de la Luz de Cádiz." }
];

