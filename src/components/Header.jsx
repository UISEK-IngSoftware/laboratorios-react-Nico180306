import { useState, useEffect } from "react";
import { AppBar, Toolbar, Container, Button } from "@mui/material";
import pokedexLogo from '../assets/pokedex_logo.svg'
import { useLocation } from "react-router-dom";
import { isLoggedIn, logout } from "../services/authService";
import './Header.css'

export default function Header() {

    const [loggedIn, setLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setLoggedIn(isLoggedIn());
    }, [location.pathname]);

    const handleLogout = async () => {
        await logout();
        window.location.href = "/"; 
    };

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
                        {loggedIn ? (
                            <>
                            <Button color="inherit" href="/add">Agregar Pokemon</Button>
                            <Button color="inherit" onClick={handleLogout}>
                                Cerrar Sesión
                            </Button>
                            </>
                        ) : (
                            <Button color="inherit" href="/login">Iniciar Sesión</Button>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        </Container>
    )
}