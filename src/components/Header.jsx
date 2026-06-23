import { AppBar, Toolbar, Container, Button } from "@mui/material";
import pokedexLogo from '../assets/pokedex_logo.svg'
import './Header.css'

export default function Header() {
    return (
        <Container>
            <div className="pokedex-navbar">
                <AppBar position="static">
                    <Toolbar>
                        <div className="image-container">
                            <img src={pokedexLogo} alt="Pokédex Logo" style={{ height: 40, marginRight: 16 }} />
                        </div>
                    </Toolbar>
                    <Toolbar>
                        <Button color="inherit" href="/">Inicio</Button>
                        <Button color="inherit" href="/add">Agregar Pokemon</Button>
                    </Toolbar>
                </AppBar>
            </div>
        </Container>
    )
}