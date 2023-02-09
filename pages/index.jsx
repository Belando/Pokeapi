import React from "react"
import Link from 'next/link'
import Image from "next/image"
import Search from "@/components/search"
import PokemonList from "@/components/next"
import { ThemeProvider } from "@material-tailwind/react";
import { Fragment, useState } from "react";
import { Accordion, AccordionHeader, AccordionBody, } from "@material-tailwind/react";
import { Card, CardHeader, CardBody, Typography, } from "@material-tailwind/react";


export default function Home({ pokemonData }) {

  const pokeTheme = {
    component: {
      defaultProps: {},
      valid: {},
      styles: {},
    }
  }

  const [open, setOpen] = useState(1);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };


  return (
    <ThemeProvider value={pokeTheme} bg= "#c7d2fe">
      <div className="flex flex-col items-center justify-center min-h-screen py-2 #c7d2fe">
        <marquee style={{ background: '#f1f1f1', color: 'purple' }}> 📑 Listado de Pokémon &bull; 📟 PokeApi &bull; 🎮 Hazte con todos</marquee>

        <Search></Search>
        <br></br>
        <br></br>

        <Fragment>
          <Accordion open={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)}>
              Listado de Pokemon
            </AccordionHeader>
            <AccordionBody>
            
              {pokemonData.map((pokemon) => {
                return (<><div class= "flex flex-row"><div class="basis 1/4">
                  <Link href={{
                    pathname: '/pokemon/[name]',
                    query: { name: pokemon.name }
                  }}>
                    <Card className="w-40">
                      <CardHeader floated={false} className="h-50">
                        <Image src={pokemon.image} alt={pokemon.name} height="100" width={100} />
                      </CardHeader>
                      <CardBody className="text-center">
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                          {pokemon.name}
                        </Typography>
                        <Typography color="blue" className="font-medium" textGradient>
                          {pokemon.types.map((poke, index) => <h4 key={index}>{poke.type.name}</h4>)
                          }
                        </Typography>
                      </CardBody>
                    </Card>  
                  </Link>
                  </div></div>
                </>)
              })}
            </AccordionBody>
          </Accordion>
        </Fragment>
        <br></br>
        <br></br>
        <PokemonList></PokemonList>
      </div>
    </ThemeProvider>

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
