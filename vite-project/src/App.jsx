import './App.css'
import { useMovies } from './hooks/useMovies.js'
import { Movies } from './components/Movies.jsx'
import { useState, useEffect, useRef } from 'react' //cuando cambia su valor no renderiza, useState renderiza al cambiar su valor

function App() {
  const { movies } = useMovies()
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  const counter = useRef(0)
  counter.current++
  console.log(counter.current)

  const handleSubmit = (event) => {
    event.preventDefault()
    // const fields = Object.fromEntries(
    //   new window.FormData(event.target)
    // )

    //validaciones

    console.log({ query });
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    if (query === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (query.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (query.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [query])

  return (
    <div className="page">

      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={query} name="query" placeholder="Avengers, Star Wars, HP, " />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>

    </div >

  )
}

export default App
