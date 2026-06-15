import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type ToastType = "success" | "error" | "info";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextValue = {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const toastStyles: Record<ToastType, string> = {
  success: "border-[#cfe3bd] bg-[#f3f7ee] text-[#2f4f20]",
  error: "border-[#e3b8ad] bg-[#fbeae6] text-[#7a2f1d]",
  info: "border-[#cfd8e3] bg-[#edf4fb] text-[#23415d]",
};

const toastLabels: Record<ToastType, string> = {
  success: "Exito",
  error: "Error",
  info: "Aviso",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now() + Math.random();
    setToasts((currentToasts) => [...currentToasts, { id, message, type }]);

    window.setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
    }, 4500);
  }, []);

  const value = useMemo(
    () => ({
      success: (message: string) => showToast(message, "success"),
      error: (message: string) => showToast(message, "error"),
      info: (message: string) => showToast(message, "info"),
    }),
    [showToast]
  );

  useEffect(() => {
    const handleGlobalToast = (event: Event) => {
      const customEvent = event as CustomEvent<{ message: string; type?: ToastType }>;
      showToast(customEvent.detail.message, customEvent.detail.type || "info");
    };

    window.addEventListener("app-toast", handleGlobalToast);

    return () => {
      window.removeEventListener("app-toast", handleGlobalToast);
    };
  }, [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="fixed right-4 top-24 z-[80] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={`rounded-lg border px-4 py-3 shadow-lg ${toastStyles[toast.type]}`}
          >
            <p className="text-sm font-bold">{toastLabels[toast.type]}</p>
            <p className="mt-1 text-sm leading-5">{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast debe usarse dentro de ToastProvider");
  }

  return context;
}
