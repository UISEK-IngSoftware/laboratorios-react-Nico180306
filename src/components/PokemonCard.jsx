import { Card, CardContent, CardMedia, Typography } from '@mui/material'

export default function PokemonCard({ pokemon }) {
  const mediaURL = import.meta.env.VITE_MEDIA_URL;
  pokemon.image = `${mediaURL}/${pokemon.picture}`;
  
  return (
    <Card>
        <CardMedia
            component="img"
            height={300}
            image={pokemon.image}
            alt={pokemon.name}
        />
        <CardContent>
            <Typography variant="h5" component="div">
                {pokemon.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Tipo: {pokemon.type}
          </Typography>
        </CardContent>
    </Card>
  )
}
