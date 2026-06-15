import { useCallback, useEffect, useState } from "react";
import type { Area } from "../Models/Responses/Area";
import { createArea, deleteArea, getAreas, updateArea } from "../services/AreaService";
import { getReadableErrorMessage } from "../services/apiClient";
import { useToast } from "../shared/ToastProvider";

type AreaForm = {
  idRestaurant: string;
  areaDescription: string;
};

const initialForm: AreaForm = {
  idRestaurant: "",
  areaDescription: "",
};

export function AreaList() {
  const toast = useToast();
  const [areas, setAreas] = useState<Area[]>([]);
  const [form, setForm] = useState<AreaForm>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const loadAreas = useCallback(async () => {
    setIsLoading(true);

    try {
      setAreas(await getAreas());
    } catch (error) {
      console.error("Error al obtener areas:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAreas();
  }, [loadAreas]);

  const validateForm = () => {
    const idRestaurant = Number(form.idRestaurant);

    if (!Number.isInteger(idRestaurant) || idRestaurant <= 0) {
      return "El restaurante debe ser un numero mayor a 0.";
    }

    if (form.areaDescription.trim().length < 3) {
      return "La descripcion del area debe tener al menos 3 caracteres.";
    }

    return "";
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setValidationError("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const error = validateForm();
    if (error) {
      setValidationError(error);
      return;
    }

    setIsSaving(true);
    setValidationError("");

    const payload = {
      idRestaurant: Number(form.idRestaurant),
      areaDescription: form.areaDescription.trim(),
    };

    try {
      if (editingId) {
        await updateArea(editingId, payload);
        toast.success("Area actualizada correctamente.");
      } else {
        await createArea(payload);
        toast.success("Area creada correctamente.");
      }

      resetForm();
      await loadAreas();
    } catch (error) {
      setValidationError(getReadableErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (area: Area) => {
    setEditingId(area.idArea);
    setForm({
      idRestaurant: String(area.idRestaurant),
      areaDescription: area.areaDescription,
    });
    setValidationError("");
  };

  const handleDelete = async (area: Area) => {
    if (!window.confirm(`Deseas eliminar el area "${area.areaDescription}"?`)) return;

    try {
      await deleteArea(area.idArea);
      toast.success("Area eliminada correctamente.");
      await loadAreas();
    } catch (error) {
      setValidationError(getReadableErrorMessage(error));
    }
  };

  return (
    <section className="bg-[#fffaf4] px-6 py-28 text-[#3f2417]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#c05428]">
            CRUD de areas
          </p>
          <h1 className="mt-2 text-3xl font-bold">Administrar areas</h1>
        </div>

        <form onSubmit={handleSubmit} className="mb-8 grid gap-4 rounded-lg border border-[#e9ded6] bg-white p-5 shadow-sm md:grid-cols-[1fr_2fr_auto]">
          <div>
            <label htmlFor="idRestaurant" className="text-sm font-bold">
              Restaurante
            </label>
            <input
              id="idRestaurant"
              name="idRestaurant"
              type="number"
              min="1"
              value={form.idRestaurant}
              onChange={(event) => setForm({ ...form, idRestaurant: event.target.value })}
              className="mt-1 w-full rounded-md border border-[#d8c9bd] px-3 py-2 focus:border-[#c05428] focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="areaDescription" className="text-sm font-bold">
              Descripcion
            </label>
            <input
              id="areaDescription"
              name="areaDescription"
              value={form.areaDescription}
              onChange={(event) => setForm({ ...form, areaDescription: event.target.value })}
              className="mt-1 w-full rounded-md border border-[#d8c9bd] px-3 py-2 focus:border-[#c05428] focus:outline-none"
              maxLength={80}
              required
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-md bg-[#c05428] px-5 py-2 font-bold text-white transition hover:bg-[#a8441f] disabled:opacity-60"
            >
              {editingId ? "Actualizar" : "Crear"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-md border border-[#d8c9bd] px-5 py-2 font-bold text-[#542d1b]"
              >
                Cancelar
              </button>
            )}
          </div>

          {validationError && (
            <p className="md:col-span-3 rounded-md border border-[#e3b8ad] bg-[#fbeae6] px-4 py-2 text-sm text-[#7a2f1d]">
              {validationError}
            </p>
          )}
        </form>

        <div className="overflow-hidden rounded-lg border border-[#e9ded6] bg-white">
          <div className="grid grid-cols-[1fr_2fr_auto] gap-4 bg-[#fdf6ee] px-4 py-3 text-sm font-bold">
            <span>Restaurante</span>
            <span>Descripcion</span>
            <span>Acciones</span>
          </div>

          {isLoading ? (
            <p className="px-4 py-6 text-[#6b4a37]">Cargando areas...</p>
          ) : areas.length === 0 ? (
            <p className="px-4 py-6 text-[#6b4a37]">No hay areas registradas.</p>
          ) : (
            areas.map((area) => (
              <div key={area.idArea} className="grid grid-cols-[1fr_2fr_auto] items-center gap-4 border-t border-[#e9ded6] px-4 py-3">
                <span>{area.idRestaurant}</span>
                <span>{area.areaDescription}</span>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(area)} className="rounded-md border border-[#d8c9bd] px-3 py-1 text-sm font-bold">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(area)} className="rounded-md bg-[#7a2f1d] px-3 py-1 text-sm font-bold text-white">
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
