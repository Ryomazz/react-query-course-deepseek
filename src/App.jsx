import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Pokemons from "./components/Pokemons";

const queryClient = new QueryClient();

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <Pokemons />
      </QueryClientProvider>
   );
}

export default App;
