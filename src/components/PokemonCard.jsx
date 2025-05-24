function PokemonCard({ pokeData, togglePokemon }) {
   return (
      <>
         <section className="pokeCard">
            <button onClick={togglePokemon}>✖️</button>
            <h1>{pokeData?.name}</h1>
            <img src={pokeData?.sprites?.front_default} alt={pokeData?.name} />
            {pokeData?.stats?.map((stat) => {
               return (
                  <div key={stat.stat.name}>
                     {stat.stat.name}: {stat.base_stat}{" "}
                  </div>
               );
            })}
            <article>
               <h3>Abilities</h3>
               {pokeData?.abilities?.map((ability) => (
                  <p key={ability.ability.name}> {ability.ability.name} </p>
               ))}
            </article>
            <article>
               <h3>Types</h3>
               {pokeData?.types?.map((type) => (
                  <p key={type.type.name}> {type.type.name} </p>
               ))}
            </article>
         </section>
      </>
   );
}
export default PokemonCard;
