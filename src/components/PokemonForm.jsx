import { Box, Button, TextField, Typography, Alert, MenuItem, Snackbar } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { addPokemon, fetchPokemonById, updatePokemon } from '../services/pokemonService'
import './PokemonForm.css'

const emptyPokemonData = {
    name: "",
    type: "",
    weight: "",
    height: "",
    picture: null,
};

export default function PokemonForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [pokemonData, setPokemonData] = useState(emptyPokemonData);

    useEffect(() => {
        if (!isEditMode) {
            setPokemonData(emptyPokemonData);
            return;
        }

        const initialPokemon = location.state?.pokemon;
        if (initialPokemon) {
            setPokemonData({
                name: initialPokemon.name || "",
                type: initialPokemon.type || "",
                weight: initialPokemon.weight ?? "",
                height: initialPokemon.height ?? "",
                picture: initialPokemon.picture || null,
            });
            return;
        }

        fetchPokemonById(id).then((pokemon) => {
            setPokemonData({
                name: pokemon.name || "",
                type: pokemon.type || "",
                weight: pokemon.weight ?? "",
                height: pokemon.height ?? "",
                picture: pokemon.picture || null,
            });
        }).catch((error) => {
            console.error('Error cargando el pokemon:', error);
            setErrorMsg('No se pudo cargar la información del pokemon.');
        });
    }, [id, isEditMode, location.state]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'picture') {
            setPokemonData((currentData) => ({ ...currentData, picture: files[0] ?? null }));
        } else {
            setPokemonData((currentData) => ({ ...currentData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            if (isEditMode) {
                await updatePokemon(id, pokemonData);
                alert('Pokemon actualizado exitosamente');
            } else {
                await addPokemon(pokemonData);
                alert('Pokemon agregado exitosamente');
            }
            navigate("/");
        } catch (error) {
            console.error('Error al guardar el pokemon:', error);
            setErrorMsg(
                isEditMode
                    ? 'Error al actualizar el pokemon. Por favor, inténtelo de nuevo más tarde.'
                    : 'Error al agregar el pokemon. Por favor, inténtelo de nuevo más tarde.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>
                {isEditMode ? 'Editar Pokemon' : 'Formulario de Pokemon'}
            </Typography>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Nombre"
                    variant="outlined"
                    name="name"
                    value={pokemonData.name}
                    onChange={handleChange}
                />
                <TextField
                    select
                    label="Tipo"
                    variant="outlined"
                    name="type"
                    value={pokemonData.type}
                    onChange={handleChange}
                >
                    <MenuItem value="A">Agua</MenuItem>
                    <MenuItem value="F">Fuego</MenuItem>
                    <MenuItem value="T">Tierra</MenuItem>
                    <MenuItem value="P">Planta</MenuItem>
                    <MenuItem value="E">Eléctrico</MenuItem>
                    <MenuItem value="L">Lucha</MenuItem>
                </TextField>

                <TextField
                    label="Peso"
                    variant="outlined"
                    type="number"
                    name="weight"
                    value={pokemonData.weight}
                    onChange={handleChange}
                />
                <TextField
                    label="Altura"
                    variant="outlined"
                    type="number"
                    name="height"
                    value={pokemonData.height}
                    onChange={handleChange}
                />
                <input type="file" name="picture" accept="image/*" onChange={handleChange} />

                {errorMsg && (
                    <Alert severity="error">
                        {errorMsg}
                    </Alert>
                )}
                <Button variant="contained" color="primary" type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Guardar')}
                </Button>
            </Box>
        </>
    );
}