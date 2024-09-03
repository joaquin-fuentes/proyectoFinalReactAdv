import { create } from 'zustand';
import axios from 'axios';

const URL_ASISTENCIA = import.meta.env.VITE_API_ASISTENCIA;
const URL_USUARIO = import.meta.env.VITE_API_USUARIO;
const URL_MATERIA = import.meta.env.VITE_API_MATERIA;

const URL_CURSO = import.meta.env.VITE_API_CURSO;


const useStore = create((set) => ({
  usuarios: [],
  materias: [],
  asistencias: [],
  historialAsistencias: [],

  fetchUsuarios: async () => {
    const response = await axios.get(URL_USUARIO);
    set({ usuarios: response.data });
  },

  fetchMaterias: async () => {
    const response = await axios.get(URL_MATERIA);
    set({ materias: response.data });
  },

  fetchAsistencias: async () => {
    const response = await axios.get(URL_ASISTENCIA);
    set({ asistencias: response.data });
  },
  fetchHistorial: async () => {
    const response = await axios.get(URL_ASISTENCIA);

    set({ historialAsistencias: response.data });
  },
  fetchCursos: async () => {
    const response = await axios.get(URL_CURSO);
    set({ cursos: response.data });
  },

  marcarAsistencia: async (dia, materiaID, alumnosPresentes, docentesPresentes) => {
    const nuevaAsistencia = {
      dia,
      materiaID: String(materiaID),
      alumnosPresentes,
      docentesPresentes
    };
    set((state) => ({
      asistencias: [...state.asistencias, nuevaAsistencia],
    }));
    axios.post(URL_ASISTENCIA, nuevaAsistencia);
    await set((state) => state.fetchAsistencias())
    await set((state) => state.fetchHistorial())

  },
}));

export default useStore;