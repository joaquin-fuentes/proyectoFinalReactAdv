import { create } from 'zustand';
import axios from 'axios';

const URL_NOVEDADES = import.meta.env.VITE_API_NOVEDAD;

const useNovedadesStore = create((set, get) => ({
	novedades: [],
	novedad: null,
	loading: false,
	error: null,

	getNovedades: async () => {
		set({ loading: true });
		try {
			const response = await axios.get(URL_NOVEDADES);
			set({ novedades: response.data, loading: false });
		} catch (error) {
			set({ error: error.message, loading: false });
		}
	},

	getNovedadById: (id) => {
		const novedad = get().novedades.find((novedad) => novedad.id === id);
		set({ novedad });
	},

	addNovedad: async (novedad) => {
		try {
			const response = await axios.post(URL_NOVEDADES, novedad);
			set((state) => ({
				novedades: [...state.novedades, response.data],
			}));
			return true;
		} catch (error) {
			set({ error: error.message });
			return false;
		}
	},

	updateNovedad: async (id, updatedNovedad) => {
		try {
			const response = await axios.put(`${URL_NOVEDADES}/${id}`, updatedNovedad);
			set((state) => ({
				novedades: state.novedades.map((novedad) =>
					novedad.id === id ? response.data : novedad
				),
			}));
			return response.data;
		} catch (error) {
			set({ error: error.message });
			return null;
		}
	},

	deleteNovedad: async (id) => {
		try {
			await axios.delete(`${URL_NOVEDADES}/${id}`);
			set((state) => ({
				novedades: state.novedades.filter((novedad) => novedad.id !== id),
			}));
		} catch (error) {
			set({ error: error.message });
		}
	},
}));

export default useNovedadesStore;