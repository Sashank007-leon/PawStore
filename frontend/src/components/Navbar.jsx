import { useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import ProfileMenu from "./admin/ProfileMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const { cartItems } = useCart();
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = user?.isAdmin;
  const userName = user?.user?.name || user?.name || "User";

  const navItems = isAdmin
    ? [{ label: "Dashboard", path: "/admin/dashboard" }]
    : [
        { label: "Home", path: "/" },
        { label: "Breeds", path: "/dogs" },
        { label: "Accessories", path: "/accessories" },
        { label: "Blog", path: "/blog" },
        { label: "Contact", path: "/contact" },
      ];

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchInput.trim()) {
        navigate(`/dogs?search=${encodeURIComponent(searchInput.trim())}`);
        setSearchInput("");
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <nav className="bg-[#FFF0D9] px-6 md:px-12 py-5 shadow-sm text-black font-poppins">
      <div className="flex justify-between items-center w-full max-w-[1600px] mx-auto">
        {/* Logo */}
        <Link
          to={isAdmin ? "/admin/dashboard" : "/"}
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center space-x-2 font-semibold text-lg"
        >
          <Icon icon="fxemoji:dog" className="w-7 h-7" aria-hidden="true" />
          <span className="text-black font-medium">
            {isAdmin ? "Pawstore Admin" : "Pawstore"}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center flex-1 justify-center">
          <div className="flex items-center gap-12">
            {navItems.map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                className={`text-base font-medium transition ${
                  location.pathname === path
                    ? "text-black font-bold"
                    : "text-gray-800"
                } hover:text-black`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section: Search, Cart, Auth */}
        <div className="hidden md:flex items-center gap-4">
          {!isAdmin && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search for pets..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearch}
                className="pl-5 pr-10 py-3 rounded-2xl border-none bg-white text-base font-normal w-[270px] focus:ring-0 outline-none placeholder:text-gray-400 shadow-sm"
                style={{ minWidth: 220 }}
              />
              <Icon
                icon="ic:round-search"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
                aria-hidden="true"
              />
            </div>
          )}
          {!isAdmin && (
            <Link to="/cart" className="relative flex items-center">
              <Icon
                icon="mdi:cart"
                className="text-2xl text-gray-700"
                aria-hidden="true"
              />
              {cartItems?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {cartItems.length > 99 ? "99+" : cartItems.length}
                </span>
              )}
            </Link>
          )}
          {isLoggedIn && !isAdmin && (
            <ProfileMenu userName={userName} onLogout={logout} />
          )}

          {isLoggedIn && isAdmin && (
            <button
              onClick={logout}
              className="text-base font-medium px-6 py-2 rounded-2xl bg-white border-none hover:bg-red-600 hover:text-white transition"
            >
              Logout
            </button>
          )}

          {!isLoggedIn && (
            <Link
              to="/login"
              className="text-base font-medium px-6 py-2 rounded-2xl bg-white border-none hover:bg-amber-600 hover:text-white transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Icon icon="ic:round-menu" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4 px-6">
          {navItems.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              onClick={() => setIsMenuOpen(false)}
              className={`block text-base ${
                location.pathname === path
                  ? "font-bold text-black"
                  : "text-gray-700"
              } hover:text-black`}
            >
              {label}
            </Link>
          ))}

          {!isAdmin && (
            <>
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="relative flex items-center w-max"
              >
                <Icon
                  icon="mdi:cart"
                  className="text-2xl text-gray-700"
                  aria-hidden="true"
                />
                {cartItems?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {cartItems.length > 99 ? "99+" : cartItems.length}
                  </span>
                )}
                <span className="ml-2 text-base">Cart</span>
              </Link>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for pets..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-full pl-5 pr-10 py-3 rounded-2xl bg-white text-base font-normal focus:ring-0 outline-none placeholder:text-gray-400 shadow-sm"
                />
                <Icon
                  icon="ic:round-search"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
                  aria-hidden="true"
                />
              </div>
            </>
          )}

          {isLoggedIn && !isAdmin && (
            <>
              <span className="text-base font-medium block">
                Welcome, {userName}
              </span>

              <Link
                to="/orders"
                onClick={() => setIsMenuOpen(false)}
                className="block text-base font-medium px-6 py-2 rounded-2xl bg-white border-none hover:bg-amber-600 hover:text-white transition"
              >
                My Orders
              </Link>

              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="text-base font-medium px-6 py-2 rounded-2xl bg-white border-none hover:bg-red-500 hover:text-white transition text-red-600"
              >
                Logout
              </button>
            </>
          )}

          {isLoggedIn && isAdmin && (
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="text-base font-medium px-6 py-2 rounded-2xl bg-white border-none hover:bg-red-500 hover:text-white transition text-red-600"
            >
              Logout
            </button>
          )}

          {!isLoggedIn && (
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium px-6 py-2 rounded-2xl bg-white border-none hover:bg-amber-600 hover:text-white transition"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
