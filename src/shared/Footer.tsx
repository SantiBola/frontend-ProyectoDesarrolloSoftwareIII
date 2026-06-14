export default function Footer() {
  const direccion = "Soda La Cabaña, Costa Rica";
  const mapsUrl = `https://maps.app.goo.gl/GoZmnkGj2rCgpSKg9`;

  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-6 flex flex-col gap-10 text-center md:text-left md:grid md:grid-cols-3 md:gap-10">

        {/* Soda */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex flex-col items-center gap-3 mb-3 md:flex-row md:items-center md:gap-3">
            <img
              src="/logo.png"
              alt="Logo de Soda La Cabaña"
              width={62}
              height={62}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              className="rounded-full object-cover shrink-0"
            />
            <div className="flex flex-col items-center md:items-start">
              <strong className="text-white text-lg font-semibold">Soda La Cabaña</strong>
              <span className="text-sm text-stone-400">Comida casera con sazón de siempre</span>
            </div>
          </div>

          <p className="text-sm text-stone-400 leading-relaxed max-w-xs md:max-w-none">
            Más de un 20 años de sirviendo desayunos, casados y café del
            bueno, en el corazón de la 32. Aquí siempre hay una mesa para vos.
          </p>
        </div>

        {/* Links de navegación */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-white font-semibold mb-3">Secciones</h3>
          <div className="flex flex-col items-center gap-2 text-sm md:items-start">
            <a href="#home" className="text-stone-400 hover:text-amber-400 transition-colors">Home</a>
            <a href="#menu" className="text-stone-400 hover:text-amber-400 transition-colors">Menú</a>
            <a href="#catering" className="text-stone-400 hover:text-amber-400 transition-colors">Catering services</a>
            <a href="#reservaciones" className="text-stone-400 hover:text-amber-400 transition-colors">Reservaciones</a>
          </div>
        </div>

        {/* Contacto y horario */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-white font-semibold mb-3">Visítanos</h3>
          <div className="flex flex-col items-center gap-2 text-sm md:items-start text-stone-400">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              {direccion}
            </a>
            <span>Lunes a sábado: 10:00 a.m. – 10:00 p.m.</span>
            <span>Domingo: 11:00 a.m. – 5:00 p.m.</span>
            <a href="tel:+50624446748" className="hover:text-amber-400 transition-colors">
              +506 2444-6748
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-stone-800 mx-6 pt-3 pb-3 text-center">
        <small className="text-xs text-stone-500">
          © {new Date().getFullYear()} Soda La Cabaña
        </small>
      </div>
    </footer>
  );
}