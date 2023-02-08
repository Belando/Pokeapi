import React from "react"
import Link from 'next/link'

export default function Pokemon({ data }) {
    console.log("data", data.stats)

    return (

        <><marquee style={{ background: '#f1f1f1', color: 'purple' }}>&bull; 📑 Listado de Pokémon &bull; 📟 PokeApi &bull; 👁‍🗨{data.name} &bull;  </marquee>
        <div>
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

                </div>
                <div>
                    <h1>{data.name}</h1>
                    <span>#00{data.id}</span>
                </div>
                <div>
                    {data.types.map((data, index) => (
                        <div key={index}>
                            <h4>{data.type.name}</h4>
                        </div>
                    ))}
                </div>
                <div>
                    <img src={data.sprites.other.dream_world.front_default}
                        alt={data.name}
                        width="200"
                        height="200" />
                </div>
                <div>
                <h4>Estadísticas</h4>
                    {data.stats.map((data, index) => (
                        <div key={index}>
                            <h3>{data.stat.name}</h3>
                            <p>{data.base_stat}</p>
                        </div>
                    ))}
                </div>
                <div>
                <h4>Habilidades</h4>
                    {data.abilities.map((data, index) => (
                        <div key={index}>
                            <p>{data.ability.name}</p>
                        </div>
                    ))}
                </div>
                <div>
                <h4>Movimientos</h4>
                    {data.moves.map((data, index) => (
                        <li key={index}>
                            {data.move.name}
                        </li>
                    ))}
                </div>
            </div>
            <div>
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
            data
        }
    }
}
