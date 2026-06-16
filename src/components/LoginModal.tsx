import { useState } from 'react';

// ── Credenciales hardcodeadas ──────────────────────────────────────────────
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'cabana2025';
// ──────────────────────────────────────────────────────────────────────────

interface LoginModalProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function LoginModal({ onSuccess, onClose }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setError('');
      onSuccess();
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    // Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Tarjeta del modal */}
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

        {/* Ícono candado */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-[#c05428]/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={1.8} stroke="#c05428" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16.5 10.5V7a4.5 4.5 0 00-9 0v3.5M5.25 10.5h13.5A1.75 1.75 0 0120.5 12.25v7A1.75 1.75 0 0118.75 21H5.25A1.75 1.75 0 013.5 19.25v-7A1.75 1.75 0 015.25 10.5z" />
            </svg>
          </div>
        </div>

        <h2 className="text-center text-xl font-bold text-[#542d1b] mb-1">
          Acceso Edición
        </h2>
        <p className="text-center text-sm text-[#542d1b]/60 mb-6">
          Ingresa tus credenciales de administrador
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Usuario */}
          <div>
            <label className="block text-sm font-semibold text-[#542d1b] mb-1">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre de usuario"
              autoComplete="username"
              className="w-full rounded-lg border border-[#d8c9bd] px-3 py-2.5 text-[#542d1b] placeholder-[#542d1b]/40
                         focus:border-[#c05428] focus:outline-none focus:ring-2 focus:ring-[#c05428]/20 transition-all"
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-semibold text-[#542d1b] mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-lg border border-[#d8c9bd] px-3 py-2.5 pr-10 text-[#542d1b] placeholder-[#542d1b]/40
                           focus:border-[#c05428] focus:outline-none focus:ring-2 focus:ring-[#c05428]/20 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#542d1b]/40 hover:text-[#542d1b] transition-colors"
                aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPass ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-center">
              {error}
            </p>
          )}

          {/* Botón ingresar */}
          <button
            type="submit"
            className="w-full mt-1 px-6 py-3 bg-[#c05428] text-white font-bold rounded-full text-base
                       tracking-wide shadow-lg hover:bg-[#a8441f] hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}