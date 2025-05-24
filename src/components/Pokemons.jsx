import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PokemonSolo from "./PokemonSolo";
import PokemonCard from "./PokemonCard";

const fetchPokemons = async () => {
   try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      if (!response.ok) throw new Error("Error al obtener los datos");
      const data = await response.json();
      return data.results;
   } catch (error) {
      throw new Error("Error: " + error.message);
   }
};

function Pokemons() {
   const { isPending, error, data } = useQuery({
      queryKey: ["pokemons"],
      queryFn: fetchPokemons,
   });
   const [showPokemon, setShowPokemon] = useState(false);

   if (isPending) return <h1>Loading....</h1>;
   if (error) return <h1>There was an error: {error} </h1>;

   return (
      <div>
         {data.map((pokeInfo) => (
            <PokemonSolo
               pokeInfo={pokeInfo}
               key={pokeInfo.name}
               showPokemon={showPokemon}
               setShowPokemon={setShowPokemon}
            />
         ))}
      </div>
   );
}
export default Pokemons;
