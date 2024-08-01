import axios from 'axios';
import { create } from 'zustand';

const useDocenteStore = create((set) => ({
  docentes: [],
  docente: null,
  loading: false,
  error: null,

  getDocentes: async () => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get('');
      set({ docentes: resp.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getDocente: async (id) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(`${id}`);
      set({ docente: resp.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createDocente: async (newDocente) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.post('', newDocente);
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