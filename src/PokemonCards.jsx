export const PokemonCards = ({ pokemonData }) => {
    return (
        <li className="pokemon-card">
            <figure className="pokemon-card-image-container">
                <img
                    src={pokemonData.sprites.other.dream_world.front_default || pokemonData.sprites.front_default}
                    alt={pokemonData.name}
                    className="pokemon-card-image"
                    onError={e => { e.target.onerror = null; e.target.src = pokemonData.sprites.front_default; }}
                />
            </figure>
            <h1>{pokemonData.name}</h1>
            <p>
                {pokemonData.types.map((type) => type.type.name).join(', ')}
            </p>
            <div>
                <p><span>Height:</span> {pokemonData.height}</p>
                <p><span>Weight:</span> {pokemonData.weight}</p>
                <p><span>Speed:</span> {pokemonData.stats.find(stat => stat.stat.name === 'speed').base_stat}</p>
                <p>
                    {pokemonData.abilities
                        .map((abilityInfo) => abilityInfo.ability.name)
                        .slice(0, 1)
                        .join(', ')
                        ? `Ability: ${pokemonData.abilities
                            .map((abilityInfo) => abilityInfo.ability.name)
                            .slice(0, 1)
                            .join(', ')}`
                        : 'No abilities available'
                    }
                </p>
                <p>Version: {
                    pokemonData.game_indices
                        .map((game_indices) => game_indices.version.name)
                        .slice(1, 4)
                        .join(', ')
                }</p>
                <p>Experience: {pokemonData.base_experience}</p>
                <p>Attack: {pokemonData.stats[1].base_stat}</p>
                <p>Defence: {pokemonData.stats[2].base_stat}</p>
            </div>
        </li>
    );
}