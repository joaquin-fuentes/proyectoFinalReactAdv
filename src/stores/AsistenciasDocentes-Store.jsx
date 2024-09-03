import { create } from "zustand";
import axios from "axios";

const URL_ASISTENCIAS = import.meta.env.VITE_API_ASISTENCIA;

const useAsistenciasStore = create((set, get) => ({
  asistencias: [],
  asistencia: null,
  loading: false,
  error: null,

  getAsistencias: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(URL_ASISTENCIAS);
      set({ asistencias: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getAsistenciaById: (id) => {
    const asistencia = get().asistencias.find(
      (asistencia) => asistencia.id === id
    );
    set({ asistencia });
  },

  addAsistencia: async (asistencia) => {
    try {
      const response = await axios.post(URL_ASISTENCIAS, asistencia);
      set((state) => ({
        asistencias: [...state.asistencias, response.data],
      }));
      return true;
    } catch (error) {
      set({ error: error.message });
      return false;
    }
  },

  updateAsistencia: async (id, updatedAsistencia) => {
    try {
      const response = await axios.put(
        `${URL_ASISTENCIAS}/${id}`,
        updatedAsistencia
      );
      set((state) => ({
        asistencias: state.asistencias.map((asistencia) =>
          asistencia.id === id ? response.data : asistencia
        ),
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message });
      return null;
    }
  },

  deleteAsistencia: async (id) => {
    try {
      await axios.delete(`${URL_ASISTENCIAS}/${id}`);
      set((state) => ({
        asistencias: state.asistencias.filter(
          (asistencia) => asistencia.id !== id
        ),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  createOrUpdateAsistencia: async (fecha, presentes, ausentes) => {
    try {
      const existingAsistencia = get().asistencias.find(
        (asistencia) => asistencia.fecha === fecha
      );

      if (existingAsistencia) {
        const updatedAsistencia = {
          ...existingAsistencia,
          docentesPresentes: presentes,
          docentesAusentes: ausentes,
        };
        return await get().updateAsistencia(existingAsistencia.id, updatedAsistencia);
      } else {
        const newAsistencia = {
          fecha: fecha,
          docentesPresentes: presentes,
          docentesAusentes: ausentes,
        };
        return await get().addAsistencia(newAsistencia);
      }
    } catch (error) {
      set({ error: error.message });
      return null;
    }
  },
}));

export default useAsistenciasStore;
