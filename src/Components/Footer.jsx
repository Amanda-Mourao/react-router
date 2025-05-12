import logo from "../assets/logo.png";

function Footer() {
  return (
    <div className="flex items-center justify-around bg-[#ef5c55] text-white border-t-2">
      <div className="flex items-center gap-2">
        <h3>Created with</h3>
        <img src={logo} className="w-[100px]" alt="Pokédex Diary" />
      </div>
    </div>
  );
}

export default Footer;
