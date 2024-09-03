import axios from "axios";
import { create } from "zustand";

const URL_USUARIO = import.meta.env.VITE_API_USUARIO;

const useAuth = create((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (data) => {
    set({ loading: true, error: null });
    try {
      const { email, password } = data;
      const resp = await axios.get(`${URL_USUARIO}`, {
        params: {
          email,
          password,
        },
      });

      if (resp.data.length === 0) {
        throw new Error("Credenciales incorrectas");
      }

      const user = resp.data[0];
      set({
        user,
        loading: false,
      });
      sessionStorage.setItem("usuario", JSON.stringify(user));
      return user;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  logout: () => {
    set({ user: null });
    sessionStorage.removeItem("usuario");
  },

  checkAuth: () => {
    const user = JSON.parse(sessionStorage.getItem("usuario"));
    set({ user });
    return user;
  }
}));

export default useAuth;
