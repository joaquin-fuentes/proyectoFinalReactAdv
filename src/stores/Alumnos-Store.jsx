import axios from "axios";
import { create } from "zustand";

const URL_USUARIO = import.meta.env.VITE_API_USUARIO;

const useAlumnoStore = create((set) => ({
  alumnos: [],
  alumno: null,
  loading: false,
  error: null,

  obtenerAlumnos: async () => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(URL_USUARIO);
      // Verifica si la propiedad 'usuarios' existe y es un array
      if (Array.isArray(resp.data)) {
        const alumnos = resp.data.filter(
          (user) => user.rol === "alumno"
        );
        set({ alumnos, loading: false });
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

  obtenerAlumnoPorId: async (id) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(`${URL_USUARIO}/${id}`);
      set({ alumno: resp.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  crearAlumno: async (nuevoAlumno) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.post(URL_USUARIO, nuevoAlumno);
      if (resp.data.rol === "alumno") {
        set((state) => ({
          alumnos: [...state.alumnos, resp.data],
          loading: false,
        }));
      } else {
        set({ loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  actualizarAlumno: async (id, alumnoActualizado) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.put(`${URL_USUARIO}/${id}`, alumnoActualizado);
      if (resp.data.rol === "alumno") {
        set((state) => ({
          alumnos: state.alumnos.map((alumno) =>
            alumno.id === id ? resp.data : alumno
          ),
          loading: false,
        }));
      } else {
        set({ loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  eliminarAlumno: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${URL_USUARIO}/${id}`);
      set((state) => ({
        alumnos: state.alumnos.filter((alumno) => alumno.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useAlumnoStore;
