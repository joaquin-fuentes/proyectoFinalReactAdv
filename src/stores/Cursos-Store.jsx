import axios from "axios";
import { create } from "zustand";

// Obtén la URL base para cursos del archivo de variables de entorno
const URL_CURSO = import.meta.env.VITE_API_CURSO;

const useCursosStore = create((set) => ({
  cursos: [],
  curso: null,
  loading: false,
  error: null,

  obtenerCursos: async () => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(URL_CURSO);
      set({ cursos: resp.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  obtenerCursoPorId: async (id) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(`${URL_CURSO}/${id}`);
      set({ curso: resp.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  crearCurso: async (nuevoCurso) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.post(URL_CURSO, nuevoCurso);
      set((state) => ({
        cursos: [...state.cursos, resp.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  actualizarCurso: async (id, cursoActualizado) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.put(`${URL_CURSO}/${id}`, cursoActualizado);
      set((state) => ({
        cursos: state.cursos.map((curso) =>
          curso.id === id ? resp.data : curso
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },


  borrarCurso: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${URL_CURSO}/${id}`);
      set((state) => ({
        cursos: state.cursos.filter((curso) => curso.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useCursosStore;