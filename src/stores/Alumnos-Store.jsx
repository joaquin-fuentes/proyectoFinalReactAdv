import axios from 'axios';
import { create } from 'zustand';

const useAlumnoStore = create((set) => ({
  alumnos: [],
  alumno: null,
  loading: false,
  error: null,

  getAlumnos: async () => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get('');
      set({ alumnos: resp.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getAlumnoId: async (id) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(`${id}`);
      set({ alumno: resp.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createAlumno: async (nuevoAlumno) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.post('', nuevoAlumno);
      set((state) => ({
        alumnos: [...state.alumnos, resp.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateAlumno: async (id, alumnoActualizado) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.put(`${id}`, alumnoActualizado);
      set((state) => ({
        alumnos: state.alumnos.map((alumno) =>
          alumno.id === id ? resp.data : alumno
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deleteAlumno: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${id}`);
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