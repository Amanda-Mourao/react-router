import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Journal from "./Pages/Journal";
import Home from "./Pages/Home";
import PokemonProfile from "./Components/PokemonProfile";


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='journal' element={<Journal />} />
          <Route path='pokemon/:id' element={<PokemonProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
