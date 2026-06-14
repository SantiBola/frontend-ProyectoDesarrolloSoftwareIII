'use client';

import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "Menú", href: "#menu" },
    { label: "Catering", href: "#catering" },
    { label: "Horarios", href: "#horarios" },
  ];

  // Función para scroll suave
  const handleSmoothScroll = (href: string) => {
    setIsMobileMenuOpen(false); // Cerrar menú al seleccionar
    
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Función para el logo (ir al inicio)
  const handleLogoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-[#FDF8F4] border-b border-[#EAE4DF] shadow-md">
      <div className="px-4 md:px-6 py-3 flex items-center justify-between">
        
        {/* ZONA DEL LOGO Y NOMBRE */}
        <div 
          onClick={handleLogoClick}
          className="flex items-center gap-2 md:gap-3 cursor-pointer group"
        >
          {/* Logo */}
          <div className="w-11 h-9 md:w-12 md:h-10 bg-white rounded-2xl flex items-center justify-center overflow-hidden p-1 shadow-inner group-hover:shadow-md transition-shadow">
            <img
              src="/logoheader.jpg"
              alt="Logo Soda La Cabaña"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Títulos */}
          <div className="flex flex-col items-start text-left">
            <h3 className="text-[#542d1b] text-base md:text-lg font-bold tracking-wide leading-tight">
              Soda La Cabaña
            </h3>
            <p className="text-[#542d1b] text-xs md:text-sm font-normal hidden sm:block">
              Comida casera, catering y reservas
            </p>
          </div>
        </div>

        {/* NAVEGACIÓN DESKTOP */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleSmoothScroll(item.href)}
              className="text-[#542d1b]/80 hover:text-[#542d1b] text-base font-semibold tracking-wide transition-colors duration-200 relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c05428] group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </nav>

        {/* ZONA DE BOTONES DERECHOS */}
        <div className="flex items-center gap-3 md:gap-6">
          
          {/* Botón de Tema (Modo Sol) */}
          <button
            aria-label="Toggle theme"
            className="w-7 h-7 rounded-full border border-[#e9ded6]/30 flex items-center justify-center text-[#542d1b]/60 hover:text-[#542d1b] hover:border-[#542d1b]/30 hover:bg-[#FDF8F4]/50 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m0 13.5V21M4.22 4.22l1.58 1.58m12.42 12.42l1.58 1.58M3 12h2.25m13.5 0H21M5.8 18.2l1.58-1.58m12.42-12.42l1.58-1.58M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"
              />
            </svg>
          </button>

          {/* Botón Reservas - Desktop */}
          <button
            onClick={() => handleSmoothScroll("#reservaciones")}
            className="hidden md:block px-6 py-2.5 bg-[#c05428] text-white font-bold rounded-full text-base tracking-wide shadow-lg hover:bg-[#a8441f] hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Reservas
          </button>

          {/* MENÚ HAMBURGUESA - MOBILE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden w-10 h-10 rounded-full border border-[#e9ded6]/30 flex items-center justify-center text-[#542d1b] hover:bg-[#FDF8F4]/50 hover:border-[#542d1b]/30 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isMobileMenuOpen ? (
                // Ícono X
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Ícono hamburguesa
                <>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#EAE4DF] bg-[#FDF8F4] animate-in slide-in-from-top-2 duration-300">
          <nav className="flex flex-col py-4 px-4 space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleSmoothScroll(item.href)}
                className="text-left px-4 py-3 text-[#542d1b] font-semibold text-base hover:bg-[#FDF8F4]/80 hover:text-[#c05428] rounded-lg transition-colors duration-200 border-l-4 border-transparent hover:border-[#c05428]"
              >
                {item.label}
              </button>
            ))}

            {/* Botón Reservas en Menú Mobile */}
            <button
              onClick={() => handleSmoothScroll("#reservaciones")}
              className="mx-4 mt-4 px-6 py-3 bg-[#c05428] text-white font-bold rounded-full text-base tracking-wide shadow-lg hover:bg-[#a8441f] hover:shadow-xl transition-all duration-200 w-[calc(100%-2rem)] text-center"
            >
              Reservas
            </button>
          </nav>
        </div>
      )}

      {/* OVERLAY PARA CERRAR MENÚ AL CLICKEAR AFUERA (OPCIONAL) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}
