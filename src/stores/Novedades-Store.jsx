import { create } from 'zustand';
import axios from 'axios';

const JSON_SERVER_URL = 'http://localhost:3000/novedades';

const useNovedadesStore = create((set, get) => ({
	novedades: [],
	novedad: null,
	loading: false,
	error: null,

	getNovedades: async () => {
		set({ loading: true });
		try {
			const response = await axios.get(JSON_SERVER_URL);
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
			const response = await axios.post(JSON_SERVER_URL, novedad);
			set((state) => ({
				novedades: [...state.novedades, response.data],
			}));
		} catch (error) {
			set({ error: error.message });
		}
	},

	updateNovedad: async (id, updatedNovedad) => {
		try {
			const response = await axios.put(`${JSON_SERVER_URL}/${id}`, updatedNovedad);
			set((state) => ({
				novedades: state.novedades.map((novedad) =>
					novedad.id === id ? response.data : novedad
				),
			}));
		} catch (error) {
			set({ error: error.message });
		}
	},

	deleteNovedad: async (id) => {
		try {
			await axios.delete(`${JSON_SERVER_URL}/${id}`);
			set((state) => ({
				novedades: state.novedades.filter((novedad) => novedad.id !== id),
			}));
		} catch (error) {
			set({ error: error.message });
		}
	},
}));

export default useNovedadesStore;