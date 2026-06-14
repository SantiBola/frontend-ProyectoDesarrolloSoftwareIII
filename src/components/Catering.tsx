
export default function CateringPage() {
  
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/85049791", "_blank");
  };

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');`}
      </style>

      <div id="catering" className="w-full bg-[#FDF8F4] text-[#542d1b] font-['Manrope'] min-h-screen pt-4 pb-10 px-4 md:px-8">
        
     {/* ENCABEZADO PRINCIPAL CON FONDO OSCURO */}

  {/* El texto crema ahora sí resalta perfectamente */}
  <h1 className="text-[#c05428] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
    Catering services
  </h1>
  <p className="text-lg sm:text-xl text-[#c05428] font-bold tracking-wide">
    Una página especial para eventos y celebraciones
  </p>
  <p className="text-sm sm:text-base text-[#FDF8F4]/80 max-w-2xl mx-auto mt-4 font-normal leading-relaxed">
    Esta sección toma como base tu imagen de catering y la transforma en un bloque comercial para convencer a empresas, familias y organizadores de eventos.
  </p>


        {/* CONTENEDOR CENTRAL: FOTO + DETALLES COMERCIALES */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center bg-white p-6 sm:p-8 rounded-[2rem] border border-[#EAE4DF] shadow-md mb-12">
          
          {/* Espacio para la foto base */}
          <div className="w-full h-64 sm:h-80 md:h-[380px] bg-[#EAE4DF]/40 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center relative group border border-[#EAE4DF]">
            <img 
              src="/catering.jpg" 
              alt="Catering services Soda La Cabaña" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#542d1b]/5 flex items-center justify-center text-center p-4">
            </div>
          </div>

          {/* Bloques de Información Requeridos */}
          <div className="flex flex-col justify-center space-y-6 text-left">
            
            {/* Bloque 1: Servicio Completo */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold tracking-tight text-[#542d1b]">
                  Servicio completo
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#542d1b]/80 font-normal leading-relaxed pl-0">
                Comida, BBQ, mesas, sillas y menaje en una presentación más profesional.
              </p>
            </div>

            {/* Bloque 2: Eventos Personalizados */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold tracking-tight text-[#542d1b]">
                  Eventos personalizados
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#542d1b]/80 font-normal leading-relaxed pl-0">
                Espacio para detallar bodas, cumpleaños, reuniones empresariales y actividades privadas.
              </p>
            </div>

            {/* Bloque 3: Contacto Rápido y Acciones */}
            <div className="pt-4 border-t border-[#EAE4DF] space-y-4">
              
              {/* Botón de Acción Principal */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button 
                  onClick={handleWhatsAppClick}
                  className="w-full sm:w-auto px-6 py-3 bg-[#c05428] text-white font-bold rounded-full text-sm tracking-wide shadow-md hover:bg-[#a8441f] transition-all active:scale-95 text-center flex items-center justify-center gap-2"
                >
                  <span>Cotizar por WhatsApp</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}