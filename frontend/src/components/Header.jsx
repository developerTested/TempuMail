const Header = () => {
  return (
    <header className="bg-boxBg px-6 py-4 shadow-md flex justify-between items-center  bg-[#111827]">
      <h1 className="text-2xl font-bold text-gray-100">TempuMail</h1>

      <nav className="flex space-x-6">
        <a href="about" className="text-gray-50 hover:underline">
          About Us
        </a>
        <a href="how-it-works" className="text-gray-50 hover:underline">
          How It Works
        </a>
      </nav>
    </header>
  );
};

export default Header;
