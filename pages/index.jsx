import React from "react"
import Link from 'next/link'
import Image from "next/image"
import Search from "@/components/search"
import PokemonList from "@/components/next"

export default function Home({ pokemonData }) {

  return (

    <><marquee style={{ background: '#f1f1f1', color: 'purple' }}> 📑 Listado de Pokémon &bull; 📟 PokeApi &bull; 🎮 Hazte con todos</marquee>

      <Search></Search>
      <br></br>
      <br></br>

      {pokemonData.map((pokemon) => {
        return (<>
          <Link href={{
            pathname: '/pokemon/[name]',
            query: { name: pokemon.name }
          }}>
            <div>
              <h2>{pokemon.name}</h2>
              {pokemon.types.map((poke, index) => <h4 key={index}>{poke.type.name}</h4>)
              }
              <Image src={pokemon.image} alt={pokemon.name} height="100" width={100} />
            </div>
          </Link>
        </>)
      })}<PokemonList></PokemonList>
    </>
  )
}

export async function getServerSideProps() {

  let arrayPokemon = []
  const getPokemon = (number) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
      .then(res => res.json())
      .then(data => data)
  }

  for (let i = 1; i <= 20; i++) {
    let data = await getPokemon(i)
    arrayPokemon.push(data)
  }

  let pokemonData = arrayPokemon.map(pokemon => {
    return ({
      name: pokemon.name,
      types: pokemon.types,
      image: pokemon.sprites.other.dream_world.front_default
    })
  })

  return {
    props: {
      pokemonData,
    }
  }
}
