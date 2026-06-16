import './App.css'
import Header from './components/Header'
import PokemonList from './components/PokemonList'
import { Container } from '@mui/material'

function App() {
  
  return (
    <>
    <Header/>
    <Container>
      <PokemonList/>
    </Container>
    </>
  )
}

export default App
