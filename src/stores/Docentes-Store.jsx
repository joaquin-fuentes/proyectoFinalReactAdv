import axios from "axios";
import { create } from "zustand";
const URL_USUARIO = import.meta.env.VITE_API_USUARIO;

const useDocenteStore = create((set) => ({
  docentes: [],
  docente: {},
  loading: false,
  error: null,

  obtenerDocentes: async () => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(URL_USUARIO);
      // Verifica si la propiedad 'usuarios' existe y es un array
      if (Array.isArray(resp.data)) {
        const docentes = resp.data.filter((user) => user.rol === "Docente");
        set({ docentes, loading: false });
      } else {
        set({
          error:
            "La propiedad 'usuarios' no está definida en la respuesta de la API",
          loading: false,
        });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  obtenerDocente: async (id) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(`${URL_USUARIO}/${id}`);
      const usuario = resp.data;

      // Verifica si el usuario tiene el rol "Docente"
      if (usuario && usuario.rol === "Docente") {
        set({ docente: usuario, loading: false });
      } else {
        set({
          error: "El usuario no es un docente o no existe.",
          loading: false,
        });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createDocente: async (newDocente) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.post("", newDocente);
      set((state) => ({
        docentes: [...state.docentes, resp.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateDocente: async (id, updatedDocente) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.put(`${id}`, updatedDocente);
      set((state) => ({
        docentes: state.docentes.map((docente) =>
          docente.id === id ? resp.data : docente
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deleteDocente: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${id}`);
      set((state) => ({
        docentes: state.docentes.filter((docente) => docente.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useDocenteStore;
