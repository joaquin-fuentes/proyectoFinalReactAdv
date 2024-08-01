import axios from 'axios';
import { create } from 'zustand';

const useUsuarios = create((set) => ({
  usuarios: [],
  usuario: null,
  loading: false,
  error: null,

  getUsuarios: async () => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(``);
      console.log(resp.data);
      set({ usuarios: resp.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getUsuarioById: async (id) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(`${id}`);
      set({ usuario: resp.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createUsuario: async (nuevoUsuario) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.post("", nuevoUsuario);
      set((state) => ({
        usuarios: [...state.usuarios, resp.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateUsuario: async (id, usuarioActualizado) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.put(`${id}`, usuarioActualizado);
      set((state) => ({
        usuarios: state.usuarios.map((usuario) =>
          usuario.id === id ? resp.data : usuario
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deleteUsuario: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${id}`);
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