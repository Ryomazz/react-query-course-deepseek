import { useQuery } from "@tanstack/react-query";

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

   if (isPending) return <h2>Loading...</h2>;
   if (error) return <h2>Error: {error} </h2>;

   const handleClick = () => {};

   return (
      <section onClick={handleClick}>
         <h2>{data?.name}</h2>
         <img src={data?.sprites?.front_default} />
         {data.stats.map((stat) => {
            return (
               <div key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}{" "}
               </div>
            );
         })}
      </section>
   );
}
export default PokemonSolo;
