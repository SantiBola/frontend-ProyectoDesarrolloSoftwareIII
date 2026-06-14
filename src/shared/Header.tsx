    import React from "react";

    export default function Header() {
    const menuItems = [
        { label: "Home", href: "/" },
        { label: "Ideas", href: "#" },
        { label: "Menú", href: "#" },
        { label: "Catering", href: "#" },
        //{ label: 'Reservaciones', href: '#' },
        { label: "Horarios", href: "#horarios" },
    ];

    return (
        <header className="fixed top-0 left-0 z-50 w-full bg-[#FDF8F4] border-b border-[#EAE4DF] px-4 py-3 flex items-center justify-between shadow-md">
        {/* Zona del Logo y Nombre */}
        <div className="flex items-center gap-2">
            {/* Contenedor del Logo con esquinas redondeadas idéntico a la imagen */}
            <div className="w-12 h-10 bg-white rounded-2xl flex items-center justify-center overflow-hidden p-1 shadow-inner">
            <img
                src="/logoheader.jpg"
                alt="Logo"
                className="w-full h-full object-contain"
            />
            </div>

            {/* Títulos */}
            <div className="flex flex-col items-start text-left">
            <h3 className="text-[#542d1b] text-lg font-bold tracking-wide leading-tight">
                Soda La Cabaña
            </h3>
            <p className="text-[#542d1b] text-sm font-normal">
                Comida casera, catering y reservas
            </p>
            </div>
        </div>

        {/* Menú de Navegación Central */}
        <nav className="hidden md:flex items-center gap-7">
            {menuItems.map((item, index) => (
            <a
                key={index}
                href={item.href}
                className="text-[#542d1b]/80 hover:text-[#542d1b] text-base font-semibold tracking-wide transition-colors duration-200"
            >
                {item.label}
            </a>
            ))}
        </nav>

        {/* Botones de Acción Derechos (Modo Claro/Oscuro y Reservas) */}
        <div className="flex items-center gap-6">
            {/* Botón de Modo Sol (Esquema circular sutil) */}
            <button
            aria-label="Toggle theme"
            className="w-7 h-7 rounded-full border border-[#e9ded6]/20 flex items-center justify-center text-[#e9ded6]/80 hover:text-[#e9ded6] hover:border-[#FDF8F4]/40 transition-all"
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

            {}
            <a
            href="#reservaciones"
            className="px-6 py-2.5 bg-[#c05428] text-white font-bold rounded-full text-base tracking-wide shadow-lg hover:bg-[#a8441f] transition-colors duration-200"
            >
            Reservas
            </a>
        </div>
        </header>
    );
    }
