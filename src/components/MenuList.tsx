import { useCallback, useEffect, useMemo, useState } from "react";
import type { Menu } from "../Models/Responses/Menu";
import { createMenu, deleteMenu, getMenus, updateMenu } from "../services/MenuService";
import { getReadableErrorMessage } from "../services/apiClient";
import { useToast } from "../shared/ToastProvider";

const fallbackMenus: Menu[] = [
  { idMenu: 1, name: "Casado con pollo en salsa", price: 3500 },
  { idMenu: 2, name: "Casado con bistec encebollado", price: 3900 },
  { idMenu: 3, name: "Gallo pinto completo", price: 2800 },
  { idMenu: 4, name: "Olla de carne", price: 4200 },
  { idMenu: 5, name: "Arroz con pollo", price: 3300 },
  { idMenu: 6, name: "Hamburguesa casera", price: 3200 },
];

const categories = ["Todos", "Desayunos", "Almuerzos", "Especiales"];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    maximumFractionDigits: 0,
  }).format(price);

const withTimeout = <T,>(promise: Promise<T>, timeoutMs = 30000): Promise<T> =>
  Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      window.setTimeout(() => reject(new Error("Tiempo de espera agotado")), timeoutMs);
    }),
  ]);

type MenuForm = {
  name: string;
  price: string;
};

const initialForm: MenuForm = {
  name: "",
  price: "",
};

export function MenuList() {
  const toast = useToast();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [status, setStatus] = useState<"loading" | "success" | "fallback">("loading");
  const [form, setForm] = useState<MenuForm>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [validationError, setValidationError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const loadMenus = useCallback(() => {
    setStatus("loading");

    withTimeout(getMenus())
      .then((data) => {
        setMenus(data.length ? data : fallbackMenus);
        setStatus(data.length ? "success" : "fallback");
      })
      .catch((error) => {
        console.warn("No se pudo cargar el menu desde el backend. Se muestra respaldo:", error);
        setMenus(fallbackMenus);
        setStatus("fallback");
      });
  }, []);

  useEffect(() => {
    loadMenus();
  }, [loadMenus]);

  const validateForm = () => {
    const price = Number(form.price);

    if (form.name.trim().length < 3) {
      return "El nombre del plato debe tener al menos 3 caracteres.";
    }

    if (!Number.isFinite(price) || price <= 0) {
      return "El precio debe ser un numero mayor a 0.";
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
      name: form.name.trim(),
      price: Number(form.price),
    };

    try {
      if (editingId) {
        await updateMenu(editingId, payload);
        toast.success("Plato actualizado correctamente.");
      } else {
        await createMenu(payload);
        toast.success("Plato creado correctamente.");
      }

      resetForm();
      loadMenus();
    } catch (error) {
      setValidationError(getReadableErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (menu: Menu) => {
    setEditingId(menu.idMenu);
    setForm({
      name: menu.name,
      price: String(menu.price),
    });
    setValidationError("");
  };

  const handleDelete = async (menu: Menu) => {
    if (!window.confirm(`Deseas eliminar el plato "${menu.name}"?`)) return;

    try {
      await deleteMenu(menu.idMenu);
      toast.success("Plato eliminado correctamente.");
      loadMenus();
    } catch (error) {
      setValidationError(getReadableErrorMessage(error));
    }
  };

  const visibleMenus = useMemo(() => {
    if (selectedCategory === "Todos") return menus;

    return menus.filter((menu) => {
      const name = menu.name.toLowerCase();
      if (selectedCategory === "Desayunos") return name.includes("pinto") || name.includes("desayuno");
      if (selectedCategory === "Almuerzos") return name.includes("casado") || name.includes("arroz");
      return name.includes("olla") || name.includes("hamburguesa") || name.includes("especial");
    });
  }, [menus, selectedCategory]);

  return (
    <div className="bg-[#fffaf4] text-[#3f2417] pt-24">
      <section className="px-6 py-14 md:py-20 bg-[#fdf6ee]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <p className="text-sm font-bold tracking-[0.24em] uppercase text-[#c05428] mb-4">
              Soda La Cabana
            </p>
            <h1
              className="text-4xl md:text-6xl font-bold leading-tight text-[#3f2417] mb-5"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Menu casero listo para escoger.
            </h1>
            <p className="text-[#6b4a37] text-lg leading-8 max-w-2xl">
              Consulta los platos disponibles, revisa precios y elige lo que se te
              antoja antes de reservar o escribirnos por WhatsApp.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden border border-[#e9ded6] shadow-lg bg-white">
            <img
              src="/catering.jpg"
              alt="Mesa servida con comida casera"
              className="w-full h-72 md:h-96 object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf4] px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#c05428]">
              CRUD de menu
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#542d1b]">
              Administrar platos
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 rounded-lg border border-[#e9ded6] bg-white p-5 shadow-sm md:grid-cols-[2fr_1fr_auto]">
            <div>
              <label htmlFor="menuName" className="text-sm font-bold">
                Nombre del plato
              </label>
              <input
                id="menuName"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className="mt-1 w-full rounded-md border border-[#d8c9bd] px-3 py-2 focus:border-[#c05428] focus:outline-none"
                maxLength={80}
                required
              />
            </div>

            <div>
              <label htmlFor="menuPrice" className="text-sm font-bold">
                Precio
              </label>
              <input
                id="menuPrice"
                type="number"
                min="1"
                step="1"
                value={form.price}
                onChange={(event) => setForm({ ...form, price: event.target.value })}
                className="mt-1 w-full rounded-md border border-[#d8c9bd] px-3 py-2 focus:border-[#c05428] focus:outline-none"
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
              <p className="rounded-md border border-[#e3b8ad] bg-[#fbeae6] px-4 py-2 text-sm text-[#7a2f1d] md:col-span-3">
                {validationError}
              </p>
            )}
          </form>
        </div>
      </section>

      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#542d1b]">
                Platos disponibles
              </h2>
              <p className="text-[#6b4a37] mt-2">
                {status === "loading"
                  ? "Cargando menu..."
                  : status === "fallback"
                    ? "Mostrando menu de referencia mientras el backend responde."
                    : "Datos cargados desde el backend."}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full border text-sm font-bold transition-colors ${
                    selectedCategory === category
                      ? "bg-[#c05428] border-[#c05428] text-white"
                      : "border-[#e9ded6] text-[#542d1b] hover:border-[#c05428]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {status === "loading" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-44 rounded-lg bg-[#f6eadf] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {visibleMenus.map((menu) => (
                <article
                  key={menu.idMenu}
                  className="rounded-lg border border-[#e9ded6] bg-[#fffaf4] p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-xl font-bold text-[#3f2417] leading-7">
                      {menu.name}
                    </h3>
                    <span className="shrink-0 rounded-full bg-[#f3d1bb] px-3 py-1 text-sm font-bold text-[#a8441f]">
                      {formatPrice(menu.price)}
                    </span>
                  </div>
                  <p className="text-[#6b4a37] leading-7">
                    Preparado al momento con sabor casero y porciones pensadas para
                    comer bien.
                  </p>
                  <div className="mt-5 flex gap-2">
                    <button
                      onClick={() => handleEdit(menu)}
                      className="rounded-md border border-[#d8c9bd] px-3 py-1 text-sm font-bold text-[#542d1b]"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(menu)}
                      className="rounded-md bg-[#7a2f1d] px-3 py-1 text-sm font-bold text-white"
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {status !== "loading" && visibleMenus.length === 0 && (
            <div className="rounded-lg border border-[#e9ded6] bg-[#fffaf4] p-8 text-center text-[#6b4a37]">
              No hay platos en esta categoria por ahora.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
