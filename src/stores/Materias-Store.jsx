import axios from "axios";
import { create } from "zustand";

const URL_MATERIA = import.meta.env.VITE_API_MATERIA;

const useMateriasStore = create((set) => ({
  materias: [],
  loading: false,
  error: null,
  materia: {},
  materiasCurso: [],

  obtenerMaterias: async () => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(URL_MATERIA);
      set({ materias: resp.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  obtenerMateriaPorId: async (id) => {
    try {
      const resp = await axios.get(`${URL_MATERIA}/${id}`);
      return resp.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  obtenerMateriasPorIds: async (ids) => {
    try {
      const resp = await axios.get(URL_MATERIA);
      // Filtramos las materias que coincidan con los IDs proporcionados
      const materiasFiltradas = resp.data.filter((materia) =>
        ids.includes(materia.id)
      );
      // Guardamos las materias filtradas en el estado `materiasCurso`
      set({ materiasCurso: materiasFiltradas });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  crearMateria: async (nuevaMateria) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.post(URL_MATERIA, nuevaMateria);
      set((state) => ({
        materias: [...state.materias, resp.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  actualizarMateria: async (id, materiaActualizada) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.put(`${URL_MATERIA}/${id}`, materiaActualizada);
      set((state) => ({
        materias: state.materias.map((materia) =>
          materia.id === id ? resp.data : materia
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  borrarMateria: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${URL_MATERIA}/${id}`);
      set((state) => ({
        materias: state.materias.filter((materia) => materia.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useMateriasStore;
