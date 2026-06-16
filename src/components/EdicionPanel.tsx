import { useNavigate } from 'react-router-dom';

interface EdicionPanelProps {
  onClose: () => void;
}

export default function EdicionPanel({ onClose }: EdicionPanelProps) {
  const navigate = useNavigate();

  const handleNavigate = (route: string) => {
    onClose();
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm mx-4 bg-[#FDF8F4] rounded-2xl shadow-2xl border border-[#EAE4DF] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 text-[#542d1b]/50 hover:text-[#542d1b] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Ícono */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-[#c05428]/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={1.8} stroke="#c05428" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5M3.75 12h16.5M3.75 18h16.5" />
            </svg>
          </div>
        </div>

        <h2 className="text-center text-xl font-bold text-[#542d1b] mb-1">
          Panel de Edición
        </h2>
        <p className="text-center text-sm text-[#542d1b]/60 mb-6">
          Selecciona qué deseas administrar
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleNavigate('/Area')}
            className="w-full flex items-center gap-3 px-5 py-4 bg-white border border-[#d8c9bd] rounded-xl
                       hover:border-[#c05428] hover:bg-[#c05428]/5 transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#c05428]/10 flex items-center justify-center group-hover:bg-[#c05428]/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={2} stroke="#c05428" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-[#542d1b] font-bold text-base">Áreas</p>
              <p className="text-[#542d1b]/60 text-xs">Gestionar áreas del restaurante</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={2} stroke="#c05428" className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <button
            onClick={() => handleNavigate('/Customer')}
            className="w-full flex items-center gap-3 px-5 py-4 bg-white border border-[#d8c9bd] rounded-xl
                       hover:border-[#c05428] hover:bg-[#c05428]/5 transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#c05428]/10 flex items-center justify-center group-hover:bg-[#c05428]/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={2} stroke="#c05428" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-[#542d1b] font-bold text-base">Clientes</p>
              <p className="text-[#542d1b]/60 text-xs">Gestionar lista de clientes</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={2} stroke="#c05428" className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Cerrar sesión */}
        <button
          onClick={onClose}
          className="w-full mt-4 text-sm text-[#542d1b]/50 hover:text-[#542d1b] transition-colors text-center"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}