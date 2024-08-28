import { create } from 'zustand';
import axios from 'axios';

const URL_ASISTENCIA = import.meta.env.VITE_API_ASISTENCIA;
const URL_USUARIO = import.meta.env.VITE_API_USUARIO;
const URL_MATERIA = import.meta.env.VITE_API_MATERIA;


const useStore = create((set) => ({
  usuarios: [],
  materias: [],
  asistencias: [],
  historialAsistencias: [],

  fetchUsuarios: async () => {
    const response = await axios.get(`${URL_USUARIO}`);
    set({ usuarios: response.data });
  },

  fetchMaterias: async () => {
    const response = await axios.get(`${URL_MATERIA}`);
    set({ materias: response.data });
  },

  fetchAsistencias: async () => {
    const response = await axios.get(`${URL_ASISTENCIA}`);
    set({ asistencias: response.data });
  },
   fetchHistorial: async () => {  // Nueva función para obtener el historial de asistencias
    const response = await axios.get(`${URL_ASISTENCIA}`);
    set({ historialAsistencias: response.data });
  },

  marcarAsistencia: (dia, materiaID, alumnosPresentes, docentesPresentes) => {
    const nuevaAsistencia = { dia, materiaID, alumnosPresentes, docentesPresentes };
    set((state) => ({
      asistencias: [...state.asistencias, nuevaAsistencia],
    }));
    axios.post(`${URL_ASISTENCIA}`, nuevaAsistencia);
  },
}));

export default useStore;