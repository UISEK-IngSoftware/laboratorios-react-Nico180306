import { Alert, Grid, Typography } from '@mui/material'
import PokemonCard from '../components/PokemonCard'
import { useState, useEffect } from 'react'
import { fetchPokemons } from '../services/pokemonService'
import { Spinner } from '../components/Spinner';

export default function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchPokemons().then((data) => {
                setPokemons(data);
        }).catch((error) => {
                setErrorMsg('Error fetching pokemons');
                console.error('Error fetching pokemons:', error);
        }).finally(() => {
                setLoading(false);
        });
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (errorMsg) {
        return <Alert variant="h6" color="error">{errorMsg}</Alert>;
    }

    const handleDeletePokemon = (pokemonId) => {
        setPokemons((currentPokemons) =>
            currentPokemons.filter((pokemonItem) => pokemonItem.id !== pokemonId)
        );
    };

    return (
        <Grid container spacing={2}>
            {pokemons.map((pokemonItem) => (
                <Grid key={pokemonItem.id} size={{ xs: 12, sm: 6, md: 4}}>
                    <PokemonCard pokemon={pokemonItem} onDelete={handleDeletePokemon} />
                </Grid>
            ))}
        </Grid>
    )
}
