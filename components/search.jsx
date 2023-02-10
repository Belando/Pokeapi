import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@material-tailwind/react";
import { Alert } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { Card, CardHeader, CardBody, Typography, } from "@material-tailwind/react";
import Image from "next/image";

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
                setError(<Alert icon={
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
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
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
                <Input color="purple" background="red" label="Busca tu pokémon" type="text" value={name} style={{ backgroundColor: "white", padding: "10px", borderRadius: "5px"}} onChange={e => setName(e.target.value)} />
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
                    <Card className="w-60">
                        <CardHeader floated={false} className="h-60">
                            <Image src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} height="200" width={200} />
                        </CardHeader>
                        <CardBody className="text-center">
                            <Typography variant="h4" color="blue-gray" className="mb-2">
                                {pokemon.name}
                            </Typography>
                            <Typography color="blue" className="font-medium" textGradient>
                                {pokemon.types.map((pokemon, index) => <h4 key={index}>{pokemon.type.name}</h4>)
                                }
                            </Typography>
                        </CardBody>
                    </Card>
                </Link>
            )}
        </div>
    );
}

export default Search