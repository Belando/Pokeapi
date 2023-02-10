import React, { useState, useEffect } from 'react';
import { Button } from "@material-tailwind/react";

const PokemonList = () => {
    const [page, setPage] = useState(1);
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`
            );
            const data = await res.json();
    
            setPokemon(data.results);
        };
    
        fetchData();
    }, [page]);
    
    const handleNextClick = async () => {
        const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon?offset=${(page) * 20}&limit=20`
        );
        const data = await res.json();
        setPokemon(data.results);
        setPage(page + 1);
    };
    
    const handlePrevClick = async () => {
        const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon?offset=${(page - 2) * 20}&limit=20`
        );
        const data = await res.json();
        setPokemon(data.results);
        setPage(page - 1);
    };       

    return (
        <div>
            <Button size="md" color="purple" onClick={handlePrevClick}>Anterior</Button>
            <Button size="md" color="purple" onClick={handleNextClick}>Siguiente</Button>
            {pokemon.map((p) => (
                <p key={p.name}>{p.name}</p>
            ))}
        </div>
    );
};

export default PokemonList;

