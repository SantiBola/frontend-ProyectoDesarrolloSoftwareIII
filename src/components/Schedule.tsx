    import React from "react";

export default function BloqueHorario() {
  // Datos estructurados para mantener el componente limpio y escalable
  const scheduleData = [
    { label: "Lunes a Sábado", value: "10:00 am - 10:00 pm" },
    { label: "Sábado", value: "10:00 am - 10:00 pm" },
    { label: "Domingo", value: "8:00 am - 4:00 pm" },
    { label: "WhatsApp", value: "8504-9791 / 6388-2724", isLink: true },
    { label: "Ubicación", value: "San José, Costa Rica" },
  ];

  return (
    <div 
    id="horarios"
    className="w-full max-w-4xl mx-auto p-8 sm:p-12 bg-[#fdf8f4] text-[#542d1b] rounded-[2rem] border border-[#e9ded6] shadow-md">
      {/* Etiqueta superior estilo botón de la imagen */}
      <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold bg-[#c05428] text-white rounded-full">
        Horarios
      </span>

      {/* Lista de datos (Filas) */}
      <div className="divide-y divide-[#e9ded6]">
        {scheduleData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4.5 first:pt-0 last:pb-0 gap-1 sm:gap-4"
          >
            {/* Etiqueta de la fila (Marrón Oscuro) */}
            <span className="font-bold text-base sm:text-lg text-[#542d1b]">
              {item.label}
            </span>

            {/* Valor de la fila (Marrón Suave / Link interactivo) */}
            <span className="text-[#a68d80] text-base sm:text-lg font-normal tracking-wide">
              {item.isLink ? (
                <a
                  href={`https://wa.me/${item.value.split("/")[0].trim().replace("-", "")}`}
                  className="text-[#c05428] hover:underline font-medium transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                item.value
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}