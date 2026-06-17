export default function BloqueHorario() {
  const scheduleData = [
    { label: "Lunes a Sábado", value: "10:00 am - 10:00 pm" },
    { label: "Sábado", value: "10:00 am - 10:00 pm" },
    { label: "Domingo", value: "8:00 am - 4:00 pm" },
    { label: "WhatsApp", value: "8504-9791 / 6388-2724", isLink: true },
    { label: "Ubicación", value: "San José, Costa Rica" },
  ];

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');`}
      </style>

      {}
      <div className="w-full bg-[#fdf6ee] py-12 md:py-22 px-4 font-['Manrope']">
        
        {}
        <div 
          id="horarios"
          className="w-full max-w-4xl mx-auto p-8 sm:p-12 bg-white text-[#542d1b] rounded-[2rem] border border-[#e9ded6] shadow-md"
        >
          {}
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold bg-[#c05428] text-white rounded-full">
            Horarios
          </span>

          {}
          <div className="divide-y divide-[#e9ded6]">
            {scheduleData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4.5 first:pt-0 last:pb-0 gap-1 sm:gap-4"
              >
                {}
                <span className="font-bold text-base sm:text-lg text-[#542d1b]">
                  {item.label}
                </span>

                {}
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

      </div>
    </>
  );
}