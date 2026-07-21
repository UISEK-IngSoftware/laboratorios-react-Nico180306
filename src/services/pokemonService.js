import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const fetchPokemons = async () => {
    try {
        const response = await apiClient.get('/pokemons/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener pokemons:', error);
        throw error;
    }
};

export const fetchPokemonById = async (id) => {
    try {
        const response = await apiClient.get(`/pokemons/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el pokemon:', error);
        throw error;
    }
};

export const addPokemon = async (pokemonData) => {
    let pictureBase64 = "";
    if (pokemonData.picture instanceof File) {
        pictureBase64 = await fileToBase64(pokemonData.picture);
    } else if (pokemonData.picture) {
        pictureBase64 = pokemonData.picture;
    }

    const payload = {
        ...pokemonData,
        picture: pictureBase64,
    };

    try {
        const response = await apiClient.post('/pokemons/', payload);
        return response.data;
    } catch (error) {
        console.error('Error adding pokemon:', error);
        throw error;
    }
};

export const updatePokemon = async (id, pokemonData) => {
    let pictureBase64 = "";
    if (pokemonData.picture instanceof File) {
        pictureBase64 = await fileToBase64(pokemonData.picture);
    } else if (pokemonData.picture) {
        pictureBase64 = pokemonData.picture;
    }

    const payload = {
        ...pokemonData,
        picture: pictureBase64,
    };

    try {
        const response = await apiClient.put(`/pokemons/${id}/`, payload);
        return response.data;
    } catch (error) {
        console.error('Error updating pokemon:', error);
        throw error;
    }
};

export const deletePokemon = async (id) => {
    try {
        const response = await apiClient.delete(`/pokemons/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error deleting pokemon:', error);
        throw error;
    }
};