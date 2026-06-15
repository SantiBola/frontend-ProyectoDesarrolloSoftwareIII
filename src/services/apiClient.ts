export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const statusMessages: Record<number, string> = {
  400: "La solicitud tiene datos invalidos.",
  401: "No tienes autorizacion para realizar esta accion.",
  403: "No tienes permisos para realizar esta accion.",
  404: "No se encontro el recurso solicitado.",
  409: "La solicitud genera un conflicto con datos existentes.",
  500: "El servidor tuvo un problema. Intenta de nuevo mas tarde.",
};

async function getErrorMessage(response: Response, fallbackMessage: string) {
  try {
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      const body = await response.json();
      return body.message || body.error || body.title || statusMessages[response.status] || fallbackMessage;
    }

    const text = await response.text();
    return text || statusMessages[response.status] || fallbackMessage;
  } catch {
    return statusMessages[response.status] || fallbackMessage;
  }
}

export async function handleJsonResponse<T>(
  response: Response,
  fallbackMessage = "No se pudo completar la solicitud."
): Promise<T> {
  if (!response.ok) {
    const message = await getErrorMessage(response, fallbackMessage);
    window.dispatchEvent(
      new CustomEvent("app-toast", {
        detail: { message, type: "error" },
      })
    );
    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export function getReadableErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ocurrio un error inesperado.";
}
