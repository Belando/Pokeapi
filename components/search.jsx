import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@material-tailwind/react";
import { Alert } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { Card, CardHeader, CardBody, Typography, } from "@material-tailwind/react";
import Image from "next/image";
import styles from "../styles/Home.module.css"

const Search = () => {
    const [pokemon, setPokemon] = useState(null);
    const [name, setName] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async event => {
        event.preventDefault();
        if (!name) {
            return;
        }
        setError(null)
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            if (!response.ok) {
                setError(<Alert className="flex justify-center" style={{ marginLeft: "auto", marginRight: "auto", width: "100%" }} icon={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                } color="red">No existen Pokémons con ese nombre</Alert>);
                return;
            }
            const data = await response.json();
            setPokemon(data);
        } catch (error) {
            setError("An error occurred");
        }
    };

    return (
        <div className="flex w-72 flex-col justify-center gap-1">
            <form className="flex justify-center" onSubmit={handleSubmit}>
                <Input color="purple" label="Busca tu pokémon" type="text" value={name} style={{ backgroundColor: "white", padding: "10px", borderRadius: "5px", marginLeft: "auto", marginRight: "auto" }} onChange={e => setName(e.target.value)} />
                <Button className="center-button" type="submit" color="purple">Buscar</Button>
            </form>
            {error && (
                <div>{error}</div>
            )}
            {pokemon && (
                <Link href={{
                    pathname: '/pokemon/[name]',
                    query: { name: pokemon.name }
                }}>            
                    <Card className={`${styles.card} ${pokemon.types[0].type.name}`}>
                        <br></br>
                        <Typography variant="h4" color="white" className="mb-2">
                            {pokemon.name}
                            </Typography>
                        <Image src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} className={styles.image2} height="250" width={250} />
                        <CardBody className="text-center">
                            <Typography color="blue" className="font-medium" textGradient>
                                <div className={styles.nameTypes}>
                                    <div className={styles.types}>
                                        {pokemon.types.map((poke, index) => {
                                            return (<div key={index} className={styles.type}>{poke.type.name}</div>)
                                        })}
                                    </div>
                                </div>
                            </Typography>
                        </CardBody>
                    </Card>
                </Link>
            )}
        </div>
    );
}

export default Search