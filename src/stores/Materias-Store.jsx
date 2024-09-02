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
      if (error.response && error.response.status === 404) {
        console.error(`Materia con ID ${id} no encontrada`);
        return null; // Retorna null si la materia no existe
      } else {
        throw new Error(error.message);
      }
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
  verificarMateriaExistente: async (nombre, anio, division, turno) => {
    try {
      const resp = await axios.get(URL_MATERIA);
      const coincideTurno = turno
        ? materia.turno.toLowerCase() === turno.toLowerCase()
        : true; // Si turno no está definido, siempre devuelve true
      const materiaExistente = resp.data.find(
        (materia) =>
          materia.nombre.toLowerCase() === nombre.toLowerCase() &&
          materia.anio === anio &&
          materia.division === division &&
          coincideTurno
      );
      return !!materiaExistente; // Retorna true si existe, false si no
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

  editarNotasMateria: async (materiaId, alumnoId, nuevasNotas) => {
    set({ loading: true, error: null });
    try {
      const materiaResp = await axios.get(`${URL_MATERIA}/${materiaId}`);
      const materia = materiaResp.data;

      const notasActualizadas = materia.notas.map((nota) =>
        nota.alumnoId === alumnoId ? { ...nota, ...nuevasNotas } : nota
      );

      const resp = await axios.patch(`${URL_MATERIA}/${materiaId}`, {
        notas: notasActualizadas,
      });

      set((state) => ({
        materias: state.materias.map((materia) =>
          materia.id === materiaId
            ? { ...materia, notas: resp.data.notas }
            : materia
        ),
        loading: false,
      }));

      return resp.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error(error);
      return null;
    }
  },
}));

export default useMateriasStore;
