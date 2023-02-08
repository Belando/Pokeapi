import React from "react"
import Link from 'next/link'


export default function Home({ pokemonData }) {

  console.log("pokemonData", pokemonData)
  return (

    <><marquee style={{ background: '#f1f1f1', color: 'purple' }}> 📑 Listado de Pokémon &bull; 📟 PokeApi &bull; 🎮 Hazte con todos</marquee><ul>
      {pokemonData.map((pokemon) => {
        return (
          <li>
            <Link href={{
              pathname: '/pokemon/[name]',
              query: { name: pokemon.name }
            }}>
              <div>
                <div>
                  <h3>{pokemon.name}</h3>
                  <div>
                    {pokemon.types.map((poke) => {
                      return (
                        <p>{poke.type.name}</p>
                      )
                    })}
                  </div>
                </div>
                <img src={pokemon.image} alt={pokemon.name} height="100" width={100}></img>
              </div>
            </Link>
          </li>
        )
      })}
    </ul></>
  )
}

export async function getServerSideProps() {

  const getPokemon = (number) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
      .then(res => res.json())
      .then(data => data)
  }

  let arrayPokemon = []

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
      pokemonData
    }
  }
}
