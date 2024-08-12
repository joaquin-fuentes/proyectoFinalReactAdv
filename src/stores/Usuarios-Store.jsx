import axios from "axios";
import { create } from "zustand";

const URL_USUARIO = import.meta.env.VITE_API_USUARIO;

const useUsuarios = create((set) => ({
  usuarios: [],
  usuario: null,
  loading: false,
  error: null,

  getUsuarios: async () => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(`${URL_USUARIO}`);
      console.log(resp.data);
      set({ usuarios: resp.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getUsuarioById: async (id) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(`${URL_USUARIO}/${id}`);
      set({ usuario: resp.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createUsuario: async (nuevoUsuario) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.post(`${URL_USUARIO}`, nuevoUsuario);
      set((state) => ({
        usuarios: [...state.usuarios, resp.data],
        loading: false,
      }));
      //devuelvo true o false para saber si el usuario se crea o no, creo que se lo puede hacer manejando el error directamente, A MODIFICAR
      return true;
    } catch (error) {
      set({ error: error.message, loading: false });
      return false;
    }
  },

  updateUsuario: async (id, usuarioActualizado) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.put(`${URL_USUARIO}/${id}`, usuarioActualizado);
      set((state) => ({
        usuarios: state.usuarios.map((usuario) =>
          usuario.id === id ? resp.data : usuario
        ),
        loading: false,
      }));
      //devuelvo true o false para saber si el usuario se edita o no, creo que se lo puede hacer manejando el error directamente, A MODIFICAR
      return true;
    } catch (error) {
      set({ error: error.message, loading: false });
      return false;
    }
  },

  deleteUsuario: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${URL_USUARIO}/${id}`);
      set((state) => ({
        usuarios: state.usuarios.filter((usuario) => usuario.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useUsuarios;
