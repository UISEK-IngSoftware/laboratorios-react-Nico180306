import { AppBar, Toolbar, Container } from "@mui/material";
import pokedexLogo from '../assets/pokedex_logo.svg'
import './Header.css'

export default function Header() {
    return (
        <Container>
            <div className="pokedex-navbar">
                <AppBar position="static">
                    <Toolbar>
                        <img src={pokedexLogo} alt="Pokédex Logo" style={{ height: 40, marginRight: 16 }} />
                    </Toolbar>
                </AppBar>
            </div>
        </Container>
    )
}