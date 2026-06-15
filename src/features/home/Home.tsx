import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CateringPage from "../../components/Catering";
import { Reservation } from "../../components/Reservation";
import Schedule from "../../components/Schedule";

const featuredDishes = [
  {
    name: "Casado tradicional",
    description: "Arroz, frijoles, ensalada fresca, platano maduro y proteina del dia.",
    price: "desde ₡3.500",
  },
  {
    name: "Desayuno cabana",
    description: "Gallo pinto, huevos, natilla, queso y tortilla caliente.",
    price: "desde ₡3.800",
  },
  {
    name: "Olla de carne",
    description: "Caldo casero con verduras, carne suave y arroz blanco.",
    price: "desde ₡4.200",
  },
];

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    const target = state?.scrollTo || location.hash;

    if (!target) return;

    window.setTimeout(() => {
      const element = document.querySelector(target);
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, [location]);

  return (
    <div id="home" className="bg-[#fffaf4] text-[#3f2417]">
      <section className="relative overflow-hidden pt-24 md:pt-28">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(63,36,23,0.72),rgba(63,36,23,0.34)),url('/catering.jpg')] bg-cover bg-center" />
        <div className="relative max-w-6xl mx-auto min-h-[640px] px-6 py-16 md:py-24 flex items-center">
          <div className="max-w-2xl text-white">
            <p className="text-sm font-bold tracking-[0.24em] uppercase text-[#ffd9bf] mb-5">
              ¡Bienvenido a Soda La Cabana!
            </p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Comida casera para comer bien, celebrar y volver.
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-8 max-w-xl mb-8">
              Platos tradicionales, servicio de catering y reservaciones para disfrutar
              una mesa con sabor de casa.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/Menu"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#c05428] text-white font-bold shadow-lg hover:bg-[#a8441f] transition-colors"
              >
                Ver menu
              </Link>
              <a
                href="#reservaciones"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-[#542d1b] font-bold shadow-lg hover:bg-[#f8eee6] transition-colors"
              >
                Reservar mesa
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="px-6 py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-sm font-bold tracking-[0.24em] uppercase text-[#c05428] mb-3">
                Favoritos de la casa
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#3f2417]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Menu para antojos de todos los dias
              </h2>
            </div>
            <Link
              to="/Menu"
              className="inline-flex w-fit items-center justify-center px-6 py-3 rounded-full border border-[#c05428] text-[#c05428] font-bold hover:bg-[#c05428] hover:text-white transition-colors"
            >
              Abrir menu completo
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredDishes.map((dish) => (
              <article
                key={dish.name}
                className="rounded-lg border border-[#e9ded6] bg-[#fffaf4] p-6 shadow-sm"
              >
                <div className="mb-5 h-36 rounded-md bg-[#f1dfcf] flex items-center justify-center text-[#c05428] font-bold">
                  Plato destacado
                </div>
                <h3 className="text-xl font-bold text-[#542d1b] mb-2">{dish.name}</h3>
                <p className="text-[#6b4a37] leading-7 mb-5">{dish.description}</p>
                <p className="font-bold text-[#c05428]">{dish.price}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Schedule />
      <Reservation />
      <CateringPage />
    </div>
  );
}