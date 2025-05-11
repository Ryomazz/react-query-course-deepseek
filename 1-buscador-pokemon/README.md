# **1️⃣ Proyecto 1: "Buscador de Pokémon"**  
**📌 Conceptos aprendidos:**  
- Primer contacto con `useQuery`.  
- Fetching básico de API (`fetch` o `axios`).  
- Manejo de estados de carga (`isLoading`) y error (`isError`).  

**🎯 Características:**  
- Buscar Pokémon por nombre o ID.  
- Mostrar imagen, tipo y stats.  

**🔗 API Sugerida:**  
```js
const fetchPokemon = async (name) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return res.json();
};
```
