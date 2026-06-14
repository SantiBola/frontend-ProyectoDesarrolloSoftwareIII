import { useState } from "react";

const API_URL = "https://backend-proyectodesarrollosoftwareiii.onrender.com/Reservation";

export function Reservation() {
  const [form, setForm] = useState({
    idClient: "",
    idTable: "",
    dateReservation: "",
    timeReservation: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if ((name === "idClient" || name === "idTable") && value !== "") {
      const num = Number(value);
      if (num <= 0) return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idClient: Number(form.idClient),
          idTable: Number(form.idTable),
          dateReservation: form.dateReservation,
          timeReservation: form.timeReservation ? `${form.timeReservation}:00` : "",
        }),
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);

      setStatus("success");
      setForm({ idClient: "", idTable: "", dateReservation: "", timeReservation: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  return (
    <section
      id="reservaciones"
      className="relative py-14 px-6 bg-[#fdf6ee] overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #4a2b1b 0px, #4a2b1b 1px, transparent 1px, transparent 14px)",
        }}
      />

      <div className="relative max-w-xl mx-auto">
        <div className="text-center mb-8">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#c55a28] mb-3">
            Soda La Cabaña · Formulario de reserva
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#3f2417] mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Apartá tu mesa
          </h2>
          <p className="text-[#6b4a37] mx-auto text-center">
            Llená los datos y la cocina queda lista para recibirte a la hora que elijas.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_18px_40px_rgba(102,52,23,0.12)] border border-[#47281622] overflow-hidden">
          <div className="flex justify-center gap-2 pt-4 pb-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#fdf6ee] ring-1 ring-[#47281622]"
              />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="px-6 md:px-8 pb-8 pt-2">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#f3d1bb] text-[#c55a28] font-bold text-xs">
                  1
                </span>
                <h3 className="font-semibold text-[#3f2417] text-sm uppercase tracking-wide">
                  Tus datos
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="idClient" className="text-xs font-semibold text-[#6b4a37] uppercase tracking-wide">
                    N.º de cliente
                  </label>
                  <input
                    id="idClient"
                    name="idClient"
                    type="number"
                    min="1"
                    required
                    value={form.idClient}
                    onChange={handleChange}
                    placeholder="Ej: 1"
                    className="border-b-2 border-[#47281633] bg-transparent px-1 py-2.5 text-[#3f2417] placeholder:text-[#98746080] focus:outline-none focus:border-[#c55a28] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="idTable" className="text-xs font-semibold text-[#6b4a37] uppercase tracking-wide">
                    Mesa preferida
                  </label>
                  <input
                    id="idTable"
                    name="idTable"
                    type="number"
                    min="1"
                    required
                    value={form.idTable}
                    onChange={handleChange}
                    placeholder="Ej: 3"
                    className="border-b-2 border-[#47281633] bg-transparent px-1 py-2.5 text-[#3f2417] placeholder:text-[#98746080] focus:outline-none focus:border-[#c55a28] transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="border-t-2 border-dashed border-[#47281622] my-6" />

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#f3d1bb] text-[#c55a28] font-bold text-xs">
                  2
                </span>
                <h3 className="font-semibold text-[#3f2417] text-sm uppercase tracking-wide">
                  Fecha y hora
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="dateReservation" className="text-xs font-semibold text-[#6b4a37] uppercase tracking-wide">
                    Día
                  </label>
                  <input
                    id="dateReservation"
                    name="dateReservation"
                    type="date"
                    min={today}
                    required
                    value={form.dateReservation}
                    onChange={handleChange}
                    className="border-b-2 border-[#47281633] bg-transparent px-1 py-2.5 text-[#3f2417] focus:outline-none focus:border-[#c55a28] transition-colors [&::-webkit-datetime-edit]:text-[#98746080] [&:valid::-webkit-datetime-edit]:text-[#3f2417]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="timeReservation" className="text-xs font-semibold text-[#6b4a37] uppercase tracking-wide">
                    Hora
                  </label>
                  <input
                    id="timeReservation"
                    name="timeReservation"
                    type="time"
                    required
                    value={form.timeReservation}
                    onChange={handleChange}
                    className="border-b-2 border-[#47281633] bg-transparent px-1 py-2.5 text-[#3f2417] focus:outline-none focus:border-[#c55a28] transition-colors [&::-webkit-datetime-edit]:text-[#98746080] [&:valid::-webkit-datetime-edit]:text-[#3f2417]"
                  />
                </div>
              </div>
            </div>

            <div className="border-t-2 border-dashed border-[#47281622] my-6" />

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#f3d1bb] text-[#c55a28] font-bold text-xs">
                  3
                </span>
                <h3 className="font-semibold text-[#3f2417] text-sm uppercase tracking-wide">
                  Confirmar
                </h3>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full md:w-auto px-10 py-3.5 rounded-full bg-[#c55a28] text-white font-bold tracking-wide hover:bg-[#ad491b] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_8px_24px_rgba(197,90,40,0.35)]"
              >
                {status === "loading" ? "Reservando..." : "Confirmar reserva"}
              </button>

              {status === "success" && (
                <div className="mt-5 flex items-start gap-3 bg-[#f3f7ee] border border-[#cfe3bd] rounded-xl px-5 py-4">
                  <div>
                    <p className="font-bold text-[#3f2417]">¡Reserva confirmada!</p>
                    <p className="text-sm text-[#6b4a37] mt-0.5">
                      Te esperamos. Si necesitás cambiar algo, escribinos por
                      WhatsApp con tu número de cliente y mesa.
                    </p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mt-5 flex items-start gap-3 bg-[#fbeae6] border border-[#e3b8ad] rounded-xl px-5 py-4">
                  <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-[#c55a28] text-white font-bold text-base">
                    !
                  </div>
                  <div>
                    <p className="font-bold text-[#3f2417]">No pudimos guardar tu reserva</p>
                    <p className="text-sm text-[#6b4a37] mt-0.5">
                      Revisa los datos y intenta de nuevo. ({errorMsg})
                    </p>
                  </div>
                </div>
              )}
            </div>
          </form>

          <div className="flex justify-center gap-2 pb-4 pt-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#fdf6ee] ring-1 ring-[#47281622]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}