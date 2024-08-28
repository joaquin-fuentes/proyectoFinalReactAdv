import { create } from 'zustand';
import axios from 'axios';

const useStore = create((set) => ({
  usuarios: [],
  materias: [],
  asistencias: [],
  historialAsistencias: [],

  fetchUsuarios: async () => {
    const response = await axios.get('http://localhost:3000/usuarios');
    set({ usuarios: response.data });
  },

  fetchMaterias: async () => {
    const response = await axios.get('http://localhost:3000/materias');
    set({ materias: response.data });
  },

  fetchAsistencias: async () => {
    const response = await axios.get('http://localhost:3000/asistencias');
    set({ asistencias: response.data });
  },
   fetchHistorial: async () => {  // Nueva función para obtener el historial de asistencias
    const response = await axios.get('http://localhost:3000/asistencias');
    set({ historialAsistencias: response.data });
  },

  marcarAsistencia: (dia, materiaID, alumnosPresentes, docentesPresentes) => {
    const nuevaAsistencia = { dia, materiaID, alumnosPresentes, docentesPresentes };
    set((state) => ({
      asistencias: [...state.asistencias, nuevaAsistencia],
    }));
    axios.post('http://localhost:3000/asistencias', nuevaAsistencia);
  },
}));

export default useStore;