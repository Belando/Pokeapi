import React from "react"
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Search from "@/components/search"
import { Fragment, useState } from "react";
import { Accordion, AccordionHeader, AccordionBody, Typography } from "@material-tailwind/react";
import PokemonList from "@/components/next";

export default function Home({ pokemonData }) {

  const [open, setOpen] = useState(1);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${id === open ? "rotate-180" : ""
          } h-10 w-10 transition-transform`}
        fill="none"
        viewBox="0 -4 24 24"
        stroke="purple"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <marquee style={{ height: 30, fontSize: "20px", background: '#f1f1f1', color: 'purple' }}> 📑 Listado de Pokémon &bull; 📟 PokeApi &bull; 🎮 Hazte con todos</marquee>

      <br></br>
      <br></br>
      <Search></Search>
      <br></br>

      <Fragment>
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />} >
          <AccordionHeader className="flex justify-center" onClick={() => handleOpen(1)}>
            <Typography variant="h2" color="white" className="mb-2">
              Listado de Pokemon
            </Typography>
          </AccordionHeader>
          <AccordionBody>
            <div className="listado">
              <ul>
                {pokemonData.map((pokemon) => (
                  <li key={pokemon.id}>
                    <Link href={{
                      pathname: '/pokemon/[name]',
                      query: { name: pokemon.name }
                    }}>
                      <div className={`${styles.card} ${pokemon.types[0].type.name}`}>
                        <div className={styles.nameTypes}>
                          <h3 exit={{ opacity: 0 }}>{pokemon.name}</h3>
                          <div className={styles.types}>
                            {pokemon.types.map((poke, index) => {
                              return (<div key={index} className={styles.type}>{poke.type.name}</div>)
                            })
                            }
                          </div>
                        </div>
                        <img src={pokemon.image} alt={pokemon.name} width={100} height={60} className={styles.image} />
                      </div>
                    </Link>
                  </li>)
                )}

              </ul>
            </div>
          </AccordionBody>
        </Accordion>
      </Fragment >
      <br></br>
      <br></br>
      <PokemonList></PokemonList>
    </div >
  )
}

export async function getServerSideProps() {
  let arrayPokemon = []
  const getPokemon = (number) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
      .then(res => res.json())
      .then(data => data)
  }

  for (let i = 1; i <= 30; i++) {
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
