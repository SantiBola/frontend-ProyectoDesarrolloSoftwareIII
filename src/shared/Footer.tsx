export default function Footer() {
  const direccion = "Soda La Cabaña, Costa Rica";
  const mapsUrl = `https://maps.app.goo.gl/GoZmnkGj2rCgpSKg9`;
  const instagramUrl = "https://www.instagram.com/insta de la soda/";
  const whatsappUrl = "https://wa.me/50688888888";
  const facebookUrl = "https://www.facebook.com/face de la soda";

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

          <p className="text-sm text-stone-400 leading-relaxed max-w-xs md:max-w-none mb-4">
            Más de un 20 años de sirviendo desayunos, casados y café del
            bueno, en el corazón de la 32. Aquí siempre hay una mesa para vos.
          </p>

          {/* Social Media */}
          <div className="flex items-center gap-4">
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Soda La Cabaña"
              className="text-stone-400 hover:text-amber-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Soda La Cabaña"
              className="text-stone-400 hover:text-amber-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M12 2c-2.717 0-3.056.012-4.123.06-1.064.049-1.791.218-2.428.465a4.902 4.902 0 0 0-1.772 1.153A4.902 4.902 0 0 0 2.525 5.45c-.247.637-.416 1.364-.465 2.428C2.012 8.944 2 9.283 2 12s.012 3.056.06 4.122c.049 1.064.218 1.791.465 2.428a4.902 4.902 0 0 0 1.153 1.772 4.902 4.902 0 0 0 1.772 1.153c.637.247 1.364.416 2.428.465C8.944 21.988 9.283 22 12 22s3.056-.012 4.122-.06c1.064-.049 1.791-.218 2.428-.465a4.902 4.902 0 0 0 1.772-1.153 4.902 4.902 0 0 0 1.153-1.772c.247-.637.416-1.364.465-2.428.048-1.066.06-1.405.06-4.122s-.012-3.056-.06-4.122c-.049-1.064-.218-1.791-.465-2.428a4.902 4.902 0 0 0-1.153-1.772A4.902 4.902 0 0 0 18.55 2.525c-.637-.247-1.364-.416-2.428-.465C15.056 2.012 14.717 2 12 2zm0 1.802c2.67 0 2.987.01 4.04.058.976.045 1.505.207 1.858.344.467.182.8.399 1.15.748.35.35.566.683.748 1.15.137.353.3.882.344 1.857.048 1.054.058 1.37.058 4.041s-.01 2.987-.058 4.04c-.045.976-.207 1.505-.344 1.858a3.1 3.1 0 0 1-.748 1.15c-.35.35-.683.566-1.15.748-.353.137-.882.3-1.857.344-1.054.048-1.37.058-4.041.058s-2.987-.01-4.04-.058c-.976-.045-1.505-.207-1.858-.344a3.1 3.1 0 0 1-1.15-.748 3.1 3.1 0 0 1-.748-1.15c-.137-.353-.3-.882-.344-1.857-.048-1.054-.058-1.37-.058-4.041s.01-2.987.058-4.04c.045-.976.207-1.505.344-1.858.182-.467.399-.8.748-1.15.35-.35.683-.566 1.15-.748.353-.137.882-.3 1.857-.344 1.054-.048 1.37-.058 4.041-.058z" />
                <path d="M12 6.865a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27zm0 8.468a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666z" />
                <circle cx="17.338" cy="6.662" r="1.2" />
              </svg>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Soda La Cabaña"
              className="text-stone-400 hover:text-amber-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M12.04 2c-5.523 0-10 4.477-10 10 0 1.768.46 3.43 1.26 4.873L2 22l5.262-1.282A9.953 9.953 0 0 0 12.04 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.182a8.157 8.157 0 0 1-4.16-1.143l-.298-.177-3.123.76.76-3.04-.194-.31a8.146 8.146 0 0 1-1.258-4.39c0-4.518 3.682-8.182 8.273-8.182 4.59 0 8.273 3.664 8.273 8.182 0 4.518-3.683 8.3-8.273 8.3zm4.534-6.166c-.247-.124-1.46-.72-1.685-.802-.226-.082-.39-.124-.555.124-.165.247-.638.802-.78.967-.144.165-.288.186-.534.062-.247-.124-1.04-.383-1.982-1.224-.733-.654-1.227-1.461-1.371-1.708-.144-.247-.015-.38.13-.504.123-.103.288-.288.43-.432.144-.144.192-.247.288-.412.096-.165.048-.309-.024-.433-.072-.124-.638-1.537-.874-2.105-.232-.55-.468-.476-.638-.484-.165-.008-.354-.01-.543-.01-.19 0-.494.072-.756.36-.262.288-.998.976-.998 2.382 0 1.406 1.022 2.764 1.166 2.957.144.193 1.96 2.99 4.747 4.072 2.787 1.083 2.787.722 3.288.677.5-.046 1.46-.598 1.665-1.176.205-.578.205-1.073.144-1.176-.06-.103-.226-.165-.474-.288z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Links navigation*/}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-white font-semibold mb-3">Secciones</h3>
          <div className="flex flex-col items-center gap-2 text-sm md:items-start">
            <a href="#home" className="text-stone-400 hover:text-amber-400 transition-colors">Home</a>
            <a href="#menu" className="text-stone-400 hover:text-amber-400 transition-colors">Menú</a>
            <a href="#catering" className="text-stone-400 hover:text-amber-400 transition-colors">Catering services</a>
            <a href="#reservaciones" className="text-stone-400 hover:text-amber-400 transition-colors">Reservaciones</a>
          </div>
        </div>

        {/* Contact and Schedule */}
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
          © {new Date().getFullYear()} Soda La Cabaña. Todos los derechos reservados.
        </small>
      </div>
    </footer>
  );
}