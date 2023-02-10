import React, { Fragment, useState } from "react"
import Link from 'next/link'
import Image from "next/image";
import styles from "../../styles/Home.module.css"
import RandomMeal from "@/components/food";
import { Accordion, AccordionHeader, AccordionBody, Typography, } from "@material-tailwind/react";


export default function Pokemon({ data }) {

    const [open, setOpen] = useState(0);

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
        <div className="py-2">
            <marquee style={{ height: 30, fontSize: "20px", background: '#f1f1f1', color: 'purple' }}>&bull; 📑 Listado de Pokémon &bull; 📟 PokeApi &bull; 👁‍🗨{data.name} &bull;  </marquee>
            <br></br>
            <br></br>
            <div>
                <div className="button2">
                    <Link scroll={false} href={{
                        pathname: '/',
                        as: '/'
                    }}>
                        <svg width="60" height="60" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 2L2 12.5L16 23.5" stroke="purple" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Volver
                    </Link>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="detail flex flex-col items-center">
                        <br></br>
                        <Typography variant="h1" color="black" className="mb-2">
                            {data.name}
                        </Typography>
                        <Typography variant="small" color="black" className="mb-2">
                            #00{data.id}
                        </Typography>
                        <Typography color="blue" className="font-medium" variant="h4" textGradient>
                            <div className={styles.types}>
                                {data.types.map((poke, index) => <div key={index} className={styles.type2}>{poke.type.name}</div>)}
                            </div>
                        </Typography>
                        <Typography color="blue" variant="small" className="font-medium" >
                            {data.weight} Kg
                        </Typography>
                        
                        <Image src={data.sprites.other.dream_world.front_default} alt={data.name} height="200" width={400} />
                        <br></br>
                    </div>
                    <br></br>
                    <div className="detail flex flex-col items-center">
                        <br></br>
                        <Typography variant="h2" color="black" className="mb-2">
                            Estadísticas
                        </Typography>
                        <div className="flex flex-row items-center ">
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
                        <br></br>
                        <Typography variant="h3" color="black" className="mb-2">
                            Habilidades
                        </Typography>
                        <Typography color="blue" variant="h5" className="font-medium" textGradient>
                            {data.abilities.map((data, index) => (
                                <div key={index}>
                                    {data.ability.name}
                                </div>))}
                        </Typography>
                        <br></br>
                        <Fragment>
                            <Accordion open={open === 1} icon={<Icon id={1} open={open} />} >
                                <AccordionHeader className="flex justify-center" onClick={() => handleOpen(1)}>
                                    <Typography variant="h3" color="black" className="mb-2">
                                        Movimientos
                                    </Typography>
                                </AccordionHeader>
                                <AccordionBody>
                                    <Typography color="blue" variant="small" className="font-medium" >
                                        <div className="listado" >
                                            <ul>
                                                {data.moves.map((data, index) => (
                                                    <li key={index}>
                                                        {data.move.name}
                                                    </li>))}
                                            </ul>
                                        </div>
                                    </Typography>
                                </AccordionBody>
                            </Accordion>
                        </Fragment >

                    </div>
                </div>
                <br></br>

                <div className="detail flex flex-col items-center">
                    <div className="frase2 flex flex-col items-center">
                        <span>Nuestro plato para <b>{data.name}</b> es</span><RandomMeal />
                    </div>
                </div>
                <br></br>
            </div>
        </div>
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