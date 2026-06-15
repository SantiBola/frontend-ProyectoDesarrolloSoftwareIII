import { useCallback, useEffect, useState } from "react";
import type { Customer } from "../Models/Responses/Customer";
import { createCustomer, deleteCustomer, getCustomers, updateCustomer } from "../services/CustomerService";
import { getReadableErrorMessage } from "../services/apiClient";
import { useToast } from "../shared/ToastProvider";

type CustomerForm = {
  clientName: string;
  idCountry: string;
  idState: string;
  idCity: string;
  clientNumber: string;
  birthdate: string;
  addressDescription: string;
  clientEmail: string;
};

const initialForm: CustomerForm = {
  clientName: "",
  idCountry: "",
  idState: "",
  idCity: "",
  clientNumber: "",
  birthdate: "",
  addressDescription: "",
  clientEmail: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CustomerList() {
  const toast = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState<CustomerForm>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const loadCustomers = useCallback(async () => {
    setIsLoading(true);

    try {
      setCustomers(await getCustomers());
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const validateForm = () => {
    const idState = Number(form.idState);
    const idCity = Number(form.idCity);
    const clientNumber = Number(form.clientNumber);

    if (form.clientName.trim().length < 3) {
      return "El nombre debe tener al menos 3 caracteres.";
    }

    if (!emailPattern.test(form.clientEmail.trim())) {
      return "Ingresa un correo electronico valido.";
    }

    if (!/^\d{8,15}$/.test(form.clientNumber.trim())) {
      return "El telefono debe tener entre 8 y 15 digitos.";
    }

    if (!form.idCountry.trim()) {
      return "El pais es obligatorio.";
    }

    if (!Number.isInteger(idState) || idState <= 0) {
      return "El estado/provincia debe ser un numero mayor a 0.";
    }

    if (!Number.isInteger(idCity) || idCity <= 0) {
      return "La ciudad debe ser un numero mayor a 0.";
    }

    if (!form.birthdate) {
      return "La fecha de nacimiento es obligatoria.";
    }

    if (new Date(form.birthdate) > new Date()) {
      return "La fecha de nacimiento no puede ser futura.";
    }

    if (form.addressDescription.trim().length < 5) {
      return "La direccion debe tener al menos 5 caracteres.";
    }

    if (!Number.isFinite(clientNumber)) {
      return "El telefono debe ser numerico.";
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
      clientName: form.clientName.trim(),
      idCountry: form.idCountry.trim().toUpperCase(),
      idState: Number(form.idState),
      idCity: Number(form.idCity),
      clientNumber: Number(form.clientNumber),
      birthdate: form.birthdate,
      addressDescription: form.addressDescription.trim(),
      clientEmail: form.clientEmail.trim(),
    };

    try {
      if (editingId) {
        await updateCustomer(editingId, payload);
        toast.success("Cliente actualizado correctamente.");
      } else {
        await createCustomer(payload);
        toast.success("Cliente creado correctamente.");
      }

      resetForm();
      await loadCustomers();
    } catch (error) {
      setValidationError(getReadableErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditingId(customer.idClient);
    setForm({
      clientName: customer.clientName,
      idCountry: customer.idCountry,
      idState: String(customer.idState),
      idCity: String(customer.idCity),
      clientNumber: String(customer.clientNumber),
      birthdate: customer.birthdate?.slice(0, 10) || "",
      addressDescription: customer.addressDescription,
      clientEmail: customer.clientEmail,
    });
    setValidationError("");
  };

  const handleDelete = async (customer: Customer) => {
    if (!window.confirm(`Deseas eliminar el cliente "${customer.clientName}"?`)) return;

    try {
      await deleteCustomer(customer.idClient);
      toast.success("Cliente eliminado correctamente.");
      await loadCustomers();
    } catch (error) {
      setValidationError(getReadableErrorMessage(error));
    }
  };

  return (
    <section className="bg-[#fffaf4] px-6 py-28 text-[#3f2417]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#c05428]">
            CRUD de clientes
          </p>
          <h1 className="mt-2 text-3xl font-bold">Administrar clientes</h1>
        </div>

        <form onSubmit={handleSubmit} className="mb-8 grid gap-4 rounded-lg border border-[#e9ded6] bg-white p-5 shadow-sm md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="clientName" className="text-sm font-bold">Nombre</label>
            <input id="clientName" value={form.clientName} onChange={(event) => setForm({ ...form, clientName: event.target.value })} className="mt-1 w-full rounded-md border border-[#d8c9bd] px-3 py-2 focus:border-[#c05428] focus:outline-none" required />
          </div>

          <div>
            <label htmlFor="clientEmail" className="text-sm font-bold">Correo</label>
            <input id="clientEmail" type="email" value={form.clientEmail} onChange={(event) => setForm({ ...form, clientEmail: event.target.value })} className="mt-1 w-full rounded-md border border-[#d8c9bd] px-3 py-2 focus:border-[#c05428] focus:outline-none" required />
          </div>

          <div>
            <label htmlFor="clientNumber" className="text-sm font-bold">Telefono</label>
            <input id="clientNumber" inputMode="numeric" value={form.clientNumber} onChange={(event) => setForm({ ...form, clientNumber: event.target.value.replace(/\D/g, "") })} className="mt-1 w-full rounded-md border border-[#d8c9bd] px-3 py-2 focus:border-[#c05428] focus:outline-none" required />
          </div>

          <div>
            <label htmlFor="birthdate" className="text-sm font-bold">Nacimiento</label>
            <input id="birthdate" type="date" value={form.birthdate} onChange={(event) => setForm({ ...form, birthdate: event.target.value })} className="mt-1 w-full rounded-md border border-[#d8c9bd] px-3 py-2 focus:border-[#c05428] focus:outline-none" required />
          </div>

          <div>
            <label htmlFor="idCountry" className="text-sm font-bold">Pais</label>
            <input id="idCountry" value={form.idCountry} onChange={(event) => setForm({ ...form, idCountry: event.target.value })} placeholder="CR" className="mt-1 w-full rounded-md border border-[#d8c9bd] px-3 py-2 focus:border-[#c05428] focus:outline-none" maxLength={3} required />
          </div>

          <div>
            <label htmlFor="idState" className="text-sm font-bold">Estado</label>
            <input id="idState" type="number" min="1" value={form.idState} onChange={(event) => setForm({ ...form, idState: event.target.value })} className="mt-1 w-full rounded-md border border-[#d8c9bd] px-3 py-2 focus:border-[#c05428] focus:outline-none" required />
          </div>

          <div>
            <label htmlFor="idCity" className="text-sm font-bold">Ciudad</label>
            <input id="idCity" type="number" min="1" value={form.idCity} onChange={(event) => setForm({ ...form, idCity: event.target.value })} className="mt-1 w-full rounded-md border border-[#d8c9bd] px-3 py-2 focus:border-[#c05428] focus:outline-none" required />
          </div>

          <div>
            <label htmlFor="addressDescription" className="text-sm font-bold">Direccion</label>
            <input id="addressDescription" value={form.addressDescription} onChange={(event) => setForm({ ...form, addressDescription: event.target.value })} className="mt-1 w-full rounded-md border border-[#d8c9bd] px-3 py-2 focus:border-[#c05428] focus:outline-none" required />
          </div>

          <div className="flex items-end gap-2 lg:col-span-4">
            <button type="submit" disabled={isSaving} className="rounded-md bg-[#c05428] px-5 py-2 font-bold text-white transition hover:bg-[#a8441f] disabled:opacity-60">
              {editingId ? "Actualizar cliente" : "Crear cliente"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="rounded-md border border-[#d8c9bd] px-5 py-2 font-bold text-[#542d1b]">
                Cancelar
              </button>
            )}
          </div>

          {validationError && (
            <p className="rounded-md border border-[#e3b8ad] bg-[#fbeae6] px-4 py-2 text-sm text-[#7a2f1d] md:col-span-2 lg:col-span-4">
              {validationError}
            </p>
          )}
        </form>

        <div className="overflow-x-auto rounded-lg border border-[#e9ded6] bg-white">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-[#fdf6ee] text-sm">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Correo</th>
                <th className="px-4 py-3">Telefono</th>
                <th className="px-4 py-3">Pais</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Ciudad</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td className="px-4 py-6 text-[#6b4a37]" colSpan={7}>Cargando clientes...</td></tr>
              ) : customers.length === 0 ? (
                <tr><td className="px-4 py-6 text-[#6b4a37]" colSpan={7}>No hay clientes registrados.</td></tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.idClient} className="border-t border-[#e9ded6]">
                    <td className="px-4 py-3">{customer.clientName}</td>
                    <td className="px-4 py-3">{customer.clientEmail}</td>
                    <td className="px-4 py-3">{customer.clientNumber}</td>
                    <td className="px-4 py-3">{customer.idCountry}</td>
                    <td className="px-4 py-3">{customer.idState}</td>
                    <td className="px-4 py-3">{customer.idCity}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(customer)} className="rounded-md border border-[#d8c9bd] px-3 py-1 text-sm font-bold">Editar</button>
                        <button onClick={() => handleDelete(customer)} className="rounded-md bg-[#7a2f1d] px-3 py-1 text-sm font-bold text-white">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
