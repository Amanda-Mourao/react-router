import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSearch } from "../context/SearchContext";

function Navbar() {
  const { searchTerm, setSearchTerm } = useSearch();

  console.log(searchTerm);
  return (
    <>
      <header className="flex items-center justify-around bg-[#ef5c55] text-white border-b-2">
        <div className="flex items-center gap-10">
          <NavLink to="/">
            <img src={logo} className="w-[150px]" alt="Pokédex Diary" />
          </NavLink>
          <h1 className="text-3xl font-bold">Pokédex Diary</h1>
        </div>
        <div className="flex items-center justify-around gap-4">
          <label id="search"></label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="enter pokémon name or ID"
            className="bg-[#f5f6f8] rounded-[8px] w-[16rem] h-[48px] text-[#4a7de6] placeholder-[#4a7de6] border-2 border-solid border-[#4a7de6] pl-2"
          />
          {/* <button
            id="searchButton"
            className="bg-[#4a7de6] text-[16px] text-center text-white font-semibold w-[122px] h-[48px] rounded-[8px] hover:shadow-lg"
          >
            Find your Pokémon!
          </button> */}
        </div>
        <nav className="flex gap-10">
          <NavLink to="/">
            <p className="text-white hover:text-[#4a7de6] font-bold">Home</p>
          </NavLink>
          <NavLink to="journal">
            <p className="text-white hover:text-[#4a7de6] font-bold">Journal</p>
          </NavLink>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
