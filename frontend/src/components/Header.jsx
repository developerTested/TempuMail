import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-boxBg px-6 py-4 shadow-md flex justify-between items-center  bg-[#111827]">
      <h1 className="text-2xl font-bold text-gray-100">
        <Link to="/">TempuMail</Link>
      </h1>

      <nav className="flex space-x-6">
        <Link
          to="/aboutus"
          className="text-white px-4 py-2 rounded-lg transition duration-200 hover:bg-white hover:text-black"
        >
          About Us
        </Link>

        <Link
          to="/howitswork"
          className="text-white px-4 py-2 rounded-lg transition duration-200 hover:bg-white hover:text-black"
        >
          How It Works
        </Link>
      </nav>
    </header>
  );
};

export default Header;
