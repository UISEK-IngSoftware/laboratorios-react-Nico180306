import { Grid } from '@mui/material'
import PokemonCard from '../components/PokemonCard'
import { useState, useEffect } from 'react'
import { fetchPokemons } from '../services/pokemonService'

export default function PokemonList() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetchPokemons().then((data) => {
                setPokemons(data);
        }).catch((error) => {
                alert('Error obteniendo pokemons. Por favor, inténtelo de nuevo más tarde.');
                console.error('Error fetching pokemons:', error);
        });
    }, []);

    return (
        <Grid container spacing={2}>
            {pokemons.map(
                (pokemonItem) => (
                    <Grid key={pokemonItem.id} size={{ xs: 12, sm: 6, md: 4}}>
                        <PokemonCard pokemon={pokemonItem} />
                    </Grid>
                )
            )}
        </Grid>
    )
}
