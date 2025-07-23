import "./index.css";
import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
    // You can add state, effects, and other logic here as needed
    // console.log("Pokemon component rendered");

    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const API = "https://pokeapi.co/api/v2/pokemon?limit=130";
    
    const fetchPokemonData = async () => {
        try {
            const response = await fetch(API);
            const data = await response.json();
            // console.log("Pokemon Data:", data);
            
            const pokemonList = data.results.map(async (pokemon) => {
                // console.log(pokemon.url);

                const response = await fetch(pokemon.url);
                const pokemonData = await response.json();
                // console.log("Pokemon Data:", pokemonData);
                return pokemonData;
            })
            // console.log("Pokemon List:", pokemonList);
            
            const pokemonDetails = await Promise.all(pokemonList);
            console.log("Pokemon Details", pokemonDetails);

            setPokemonData(pokemonDetails);
            setLoading(false);

        } catch (error) {
            console.error("Error", error);
            setLoading(false);
            setError(error);
        }
    }

    useEffect(() => {
        fetchPokemonData();
    }, []);

    // Filter the pokemonData based on the search term
    const filteredPokemonData = pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="loading">
                <h2>Loading...</h2>
            </div>
        );
    }
    if (error) {
        return (
            <div className="error">
                <h2>Error: {error.message}</h2>
            </div>
        );
    }

  return (
    <>
        <section className="pokemon-container">
            <header>
                <h1> Search Pokemon API</h1>
            </header>
            <div className="pokemon-header">
                <input
                    type="text" placeholder="Search Your Favrouite Pokemon"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

            </div>
            <div>
                <ul className="pokemon-card-list">
                    {
                        filteredPokemonData.map((pokemon) => {
                            return (
                                <PokemonCards key={pokemon.id} pokemonData={pokemon} />
                            );
                        })
                    }
                </ul>
            </div>
        </section>
    </>


    // <>
    //     <div className="pokemon-container">
    //     <h2>Pokemon List</h2>
    //         <ul className="pokemon-card-list">
    //             {pokemonData.map((pokemon) => (
    //             <li key={pokemon.id}>
    //                 <div className="pokemon-card">
    //                     <div className="pokemon-card-image-container">
    //                         <img
    //                         className="pokemon-card-image"
    //                         src={pokemon.sprites.front_default} // Use each Pokémon's image URL
    //                         alt={pokemon.name}
    //                         />
    //                     </div>
    //                     <div className="pokemon-card-title">{pokemon.name}</div>
    //                     <div className="pokemon-card-description">
    //                         <p>Height: {pokemon.height}</p>
    //                         <p>Weight: {pokemon.weight}</p>
    //                     </div>
    //                 </div>
    //             </li>
    //             ))}
    //         </ul>
    //     </div>
    // </>
  );
}