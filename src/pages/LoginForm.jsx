import { Button, TextField, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./LoginForm.css";
import { login } from "../services/authService";

export default function LoginForm() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        login(username, password).then(() => {
            navigate("/");
        }).catch((error) => {
            console.error("Error al iniciar sesión:", error);
            setErrorMsg("Nombre de usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.");
        });
    };

    return (
        <Box component="form" className="login-form" onSubmit={handleLogin}>
            <Typography variant="h5" gutterBottom>
                Inicio de sesión
            </Typography>
            <TextField
                label="Usuario"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Contraseña"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit">
                Iniciar sesión
            </Button>
            
            {errorMsg && (
                <Alert severity="error">
                    {errorMsg}
                </Alert>
            )}
        </Box>
    );
}