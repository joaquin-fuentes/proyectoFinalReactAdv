import axios from 'axios';
import { create } from 'zustand';

const useMateriasStore = create((set) => ({
  materias: [],
  materia: null,
  loading: false,
  error: null,

  getMaterias: async () => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get('');
      set({ materias: resp.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getMateriaById: async (id) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(`${id}`);
      set({ materia: resp.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createMateria: async (nuevaMateria) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.post('', nuevaMateria);
      set((state) => ({
        materias: [...state.materias, resp.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateMateria: async (id, materiaActualizada) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.put(`${id}`, materiaActualizada);
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

  deleteMateria: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${id}`);
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