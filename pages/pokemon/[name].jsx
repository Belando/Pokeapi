import React from "react"
import Link from 'next/link'
import Image from "next/image";
import RandomMeal from "@/components/food";
import { Card, CardHeader, CardBody, CardFooter, Typography, } from "@material-tailwind/react";


export default function Pokemon({ data }) {

    return (
        <><marquee style={{ background: '#f1f1f1', color: 'purple' }}>&bull; 📑 Listado de Pokémon &bull; 📟 PokeApi &bull; 👁‍🗨{data.name} &bull;  </marquee>
            <div>
                <div>
                    <Link scroll={false} href={{
                        pathname: '/',
                        as: '/'
                    }}>
                        <svg width="18" height="25" viewBox="0 0 18 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 2L2 12.5L16 23.5" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                    <Card className="max-h-fit">
                        <CardHeader floated={false} className="h-100">
                            <Typography variant="h4" color="blue-gray" className="mb-2">
                                {data.name}
                            </Typography>
                            <Typography color="blue" className="font-medium" textGradient>
                                {data.types.map((poke, index) => <h4 key={index}>{poke.type.name}</h4>)
                                }
                            </Typography>
                            <Image src={data.sprites.other.dream_world.front_default} alt={data.name} height="400" width={200} />
                            <Typography variant="h4" color="blue-gray" className="mb-2">
                                <h4>Estadísticas</h4>
                                {data.stats.map((data, index) => (
                                    <div key={index}>
                                        <h3>{data.stat.name}</h3>
                                        <p>{data.base_stat}</p>
                                    </div>))}
                            </Typography>
                            <Typography color="blue" className="font-medium" textGradient>
                                <h4>Habilidades</h4>
                                {data.abilities.map((data, index) => (
                                    <div key={index}>
                                        <p>{data.ability.name}</p>
                                    </div>
                                ))}
                            </Typography>
                        </CardHeader>
                        <CardBody className="text-center">
                            <Typography color="blue" className="font-medium" textGradient>
                                <h4>Movimientos</h4>
                                {data.moves.map((data, index) => (
                                    <li key={index}>
                                        {data.move.name}
                                    </li>
                                ))}
                            </Typography>
                        </CardBody>
                        <CardFooter>
                            Nuestra recomendación para {data.name} es <RandomMeal />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(params) {
    const { name } = params.query;

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json()

    return {
        props: {
            data,
        }
    }
}