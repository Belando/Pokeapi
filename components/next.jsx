import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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

    const handleClick = () => {
        setPage(page + 1);
    };

    return (
        <div>
            <Link href={`/${page + 1}`}>
                <button onClick={handleClick}>Next</button>
            </Link>
            {pokemon.map((p) => (
                <p key={p.name}>{p.name}</p>
            ))}
        </div>
    );
};

export default PokemonList;