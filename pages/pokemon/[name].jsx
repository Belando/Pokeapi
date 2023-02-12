import React, { Fragment, useState } from "react"
import Link from 'next/link'
import Image from "next/image";
import styles from "../../styles/Home.module.css"
import RandomMeal from "@/components/food";
import { Accordion, AccordionHeader, AccordionBody, Typography, Button, } from "@material-tailwind/react";


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
            <div className="flex justify-center space-x-1">
                <Button className="flex" type="submit" color="purple">
                    <Link scroll={false} style={{ height: "20px", width: "70px", borderRadius: "5px", marginLeft: "auto", marginRight: "auto" }} href={`/pokemon/${data.id - 1}`}>
                        Anterior
                    </Link>
                </Button>
                <Button className="flex" type="submit" color="purple"><Link scroll={false} style={{ height: "20px", width: "100px", borderRadius: "5px", marginLeft: "auto", marginRight: "auto" }} href={{
                    pathname: '/',
                    as: '/'
                }}>Volver</Link>
                </Button>
                <Button className="flex" type="submit" color="purple">
                    <Link scroll={false} style={{ height: "20px", width: "70px", borderRadius: "5px", marginLeft: "auto", marginRight: "auto" }} href={`/pokemon/${data.id + 1}`}>
                        Siguiente
                    </Link>
                </Button>
            </div>

            <br></br>
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
                                <p key={index}>
                                    {data.stat.name}
                                </p>))}
                        </Typography>
                        <Typography color="purple" variant="h5" className="font-medium" textGradient>
                            {data.stats.map((data, index) => (
                                <p key={index}>
                                    {data.base_stat}
                                </p>))}
                        </Typography>
                    </div>
                    <br></br>
                    <Typography variant="h3" color="black" className="mb-2">
                        Habilidades
                    </Typography>
                    <Typography color="blue" variant="h5" className="font-medium" textGradient>
                        {data.abilities.map((data, index) => (
                            <p key={index}>
                                {data.ability.name}
                            </p>))}
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

                                <div className="listado" >
                                    <ul>
                                        {data.moves.map((data, index) => (
                                            <li key={index}>
                                                <Typography color="blue" variant="small" className="font-medium" >{data.move.name}</Typography>
                                            </li>))}
                                    </ul>
                                </div>

                            </AccordionBody>
                        </Accordion>
                    </Fragment >

                </div>

            </div>
            <br></br>

            <div className="detail flex flex-col items-center">
                <br></br>
                <div className="frase2 flex flex-col items-center space-y-2 ">
                    <span>Nuestro plato para <b>{data.name}</b> es</span>

                    <RandomMeal />
                </div>

            </div>
            <br></br>
            <div className="flex justify-center space-x-1">
                <Button className="flex" type="submit" color="purple">
                    <Link scroll={false} style={{ height: "20px", width: "70px", borderRadius: "5px", marginLeft: "auto", marginRight: "auto" }} href={`/pokemon/${data.id - 1}`}>
                        Anterior
                    </Link>
                </Button>
                <Button className="flex" type="submit" color="purple"><Link scroll={false} style={{ height: "20px", width: "100px", borderRadius: "5px", marginLeft: "auto", marginRight: "auto" }} href={{
                    pathname: '/',
                    as: '/'
                }}>Volver</Link>
                </Button>
                <Button className="flex" type="submit" color="purple">
                    <Link scroll={false} style={{ height: "20px", width: "70px", borderRadius: "5px", marginLeft: "auto", marginRight: "auto" }} href={`/pokemon/${data.id + 1}`}>
                        Siguiente
                    </Link>
                </Button>

            </div>
            <br></br>
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
