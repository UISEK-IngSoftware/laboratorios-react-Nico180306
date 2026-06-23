import { BrowserRouter, Routes,Route} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import PokemonList from './components/PokemonList'
import { Container } from '@mui/material'
import PokemonForm from './components/PokemonForm'

function App() {
  
  return (
    <>
    <Header/>
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PokemonList/>}/>
          <Route path="/add" element={<PokemonForm/>}/>
        </Routes>
      </BrowserRouter>
    </Container>
    </>
  )
}

export default App
