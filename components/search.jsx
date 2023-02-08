import React, { useState} from "react";
import Link from "next/link";
import design from "../styles/Pokemon.module.css"


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
                setError("No existen pokémons con ese nombre");
                return;
            }
            const data = await response.json();
            setPokemon(data);
        } catch (error) {
            setError("An error occurred");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            {error && (
                <div className={design.error}>{error}</div>
            )}
            {pokemon && (
                <Link href={{
                    pathname: '/pokemon/[name]',
                    query: { name: pokemon.name }
                }}>
                    <div>
                        <h2>{pokemon.name}</h2>
                        {pokemon.types.map((pokemon, index) => (
                            <div key={index}>
                                <h4>{pokemon.type.name}</h4>
                            </div>))}
                        <img src={pokemon.sprites.other.dream_world.front_default}></img>
                    </div>
                </Link>
            )}
        </div>
    );
}

export default Search