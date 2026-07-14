import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import LoginForm from './pages/LoginForm'
import PokemonList from './pages/PokemonList'
import { Container } from '@mui/material'
import PokemonForm from './components/PokemonForm'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/add" element={<PokemonForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  )
}

export default App
