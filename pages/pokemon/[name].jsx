import React from "react"
import Link from 'next/link'
import Image from "next/image";
import RandomMeal from "@/components/food";
import { Card, CardHeader, CardBody, Typography, } from "@material-tailwind/react";


export default function Pokemon({ data }) {

    return (
        <><marquee style={{ background: '#f1f1f1', color: 'purple' }}>&bull; 📑 Listado de Pokémon &bull; 📟 PokeApi &bull; 👁‍🗨{data.name} &bull;  </marquee>
        <br></br>
        <br></br>
            <div>
                <Link scroll={false} href={{
                    pathname: '/',
                    as: '/'
                }}>
                    <svg width="18" height="25" viewBox="0 0 18 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 2L2 12.5L16 23.5" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
                <div className="flex flex-row justify-center">
                    <div className="detail flex justify-around">
                            <Typography variant="h2" color="black" className="mb-2">
                                {data.name}
                            </Typography>
                            <Typography variant="p" color="black" className="mb-2">
                                #00{data.id}
                            </Typography>
                            <Typography color="blue" className="font-medium" variant="h4" textGradient>
                                {data.types.map((poke, index) => <h4 key={index}>{poke.type.name}</h4>)}
                            </Typography>


                            <Image src={data.sprites.other.dream_world.front_default} alt={data.name} height="400" width={400} />
                    </div>
                    <div className="detail justify-around">

                            <Typography variant="h2" color="blue-gray" className="mb-2">
                                Estadísticas
                            </Typography>
                            <div className="flex flex-row justify-center ">
                                <Typography color="blue" variant="h5" className="font-medium" textGradient>
                                    {data.stats.map((data, index) => (
                                        <div key={index}>
                                            <h3>{data.stat.name}</h3>
                                        </div>))}
                                </Typography>
                                <Typography color="purple" variant="h5" className="font-medium" textGradient>
                                    {data.stats.map((data, index) => (
                                        <div key={index}>
                                            <p>{data.base_stat}</p>
                                        </div>))}
                                </Typography>
                            </div>
                            <Typography color="blue" className="font-medium" textGradient>
                                <h4>Habilidades</h4>
                                {data.abilities.map((data, index) => (
                                    <div key={index}>
                                        {data.ability.name}
                                    </div>))}
                            </Typography>
                            <Typography color="blue" className="font-medium" textGradient>
                                <h4>Altura</h4>
                                {data.height}
                            </Typography>
                            <Typography color="blue" className="font-medium" textGradient>
                                <h4>Peso</h4>
                                {data.weight}
                            </Typography>
                    </div>
                </div>
                <br></br>

                <div className="text-center ">
                    Nuestra recomendación para <b>{data.name}</b> es <RandomMeal />
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