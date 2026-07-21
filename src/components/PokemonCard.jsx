import { Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { deletePokemon } from '../services/pokemonService'
import { isLoggedIn } from '../services/authService'

export default function PokemonCard({ pokemon, onDelete }) {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const mediaURL = import.meta.env.VITE_MEDIA_URL;
  const imageUrl = pokemon.picture ? `${mediaURL}/${pokemon.picture}` : '';

  const handleEdit = () => {
    navigate(`/edit/${pokemon.id}`, { state: { pokemon } });
  };

  const handleDelete = async () => {
    if (!window.confirm(`¿Eliminar a ${pokemon.name}?`)) {
      return;
    }

    try {
      await deletePokemon(pokemon.id);
      onDelete?.(pokemon.id);
    } catch (error) {
      console.error('Error eliminando pokemon:', error);
      alert('No se pudo eliminar el pokemon. Inténtelo de nuevo.');
    }
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height={300}
        image={imageUrl}
        alt={pokemon.name}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {pokemon.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Tipo: {pokemon.type}
        </Typography>

        {loggedIn && (
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Button size="small" variant="outlined" color="primary" onClick={handleEdit}>
              Editar
            </Button>
            <Button size="small" variant="outlined" color="error" onClick={handleDelete}>
              Eliminar
            </Button>
          </Stack>
        )}
      </CardContent>
    </Card>
  )
}
