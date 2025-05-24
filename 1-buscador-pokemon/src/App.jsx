import {
   QueryClient,
   QueryClientProvider,
   useQuery,
} from "@tanstack/react-query";
import { useState } from "react";

const queryClient = new QueryClient();

const fetchPokemon = async (pokemonName) => {
   try {
      const response = await fetch(
         `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      if (!response.ok) throw new Error("Pokemon no encontrado");
      return response.json();
   } catch (error) {
      throw new Error(error.message);
   }
};

function Pokemon({ pokemonName }) {
   const { isPending, error, data } = useQuery({
      queryKey: ["pokemon", pokemonName],
      queryFn: () => fetchPokemon(pokemonName),
   });

   if (isPending) return <span>Loading...</span>;

   if (error) {
      return <span>Error: {error.message}</span>;
   }

   return (
      <div>
         <h1>{data.name}</h1>
         <img src={data.sprites?.front_default} alt="" />
         {data.stats &&
            data.stats.map((stat) => {
               const { base_stat } = stat;
               const stat_name = stat.stat.name;

               return (
                  <h2 key={stat_name}>
                     {stat_name}--{base_stat}{" "}
                  </h2>
               );
            })}
      </div>
   );
}

function App() {
   const [query, setQuery] = useState("");
   const [pokemonName, setPokemonName] = useState("");
   const handleSubmit = (e) => {
      e.preventDefault();
      setPokemonName(query);
   };

   return (
      <section>
         <h1>Pokemon TanStack Query</h1>
         <form>
            <input
               type="text"
               placeholder="Charizard, Pickachu..."
               value={query}
               onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSubmit}>Search</button>
         </form>
         <QueryClientProvider client={queryClient}>
            {pokemonName && <Pokemon pokemonName={pokemonName}></Pokemon>}
         </QueryClientProvider>
      </section>
   );
}
export default App;
