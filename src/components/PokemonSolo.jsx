import { useQuery } from "@tanstack/react-query";
import PokemonCard from "./PokemonCard";
import { useState } from "react";

async function fetchSinglePokemon({ queryKey }) {
   const [_, pokeInfo] = queryKey;
   try {
      const response = await fetch(pokeInfo.url);
      if (!response.ok) throw new Error("Error while fetching poke info");
      const data = await response.json();
      return data;
   } catch (error) {
      throw new Error("There was an error: " + error.message);
   }
}

function PokemonSolo({ pokeInfo }) {
   const { isPending, error, data } = useQuery({
      queryKey: ["pokemon", pokeInfo],
      queryFn: fetchSinglePokemon,
   });

   const [showPokemon, setShowPokemon] = useState(false);
   const togglePokemon = () => {
      setShowPokemon(!showPokemon);
   };

   if (isPending) return <h2>Loading...</h2>;
   if (error) return <h2>Error: {error} </h2>;

   return (
      <div>
         <section className="pokemon" onClick={togglePokemon}>
            <h2>{data?.name}</h2>
            <img src={data?.sprites?.front_default} />
            {showPokemon && (
               <PokemonCard
                  pokeData={data}
                  setShowPokemon={setShowPokemon}
                  showPokemon={showPokemon}
               />
            )}
         </section>
      </div>
   );
}
export default PokemonSolo;
