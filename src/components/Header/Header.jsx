import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  const activeNavItems = navItems.filter((item) => item.active);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center transition-transform hover:scale-105"
            >
              <Logo width="120px" colorClass="text-indigo-600" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-1">
              {activeNavItems.map((item) => (
                <li key={item.name}>
                  {/* <button
                    onClick={() => navigate(item.slug)}
                    className="px-4 py-2 rounded-full text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    {item.name}
                  </button> */}
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-4 py-2 rounded-full text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 hover:shadow-sm"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
              {authStatus && (
                <li className="pl-2">
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg animate-fade-in">
          <div className="px-4 py-3 space-y-2">
            {activeNavItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.slug);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-3 rounded-lg text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
            {authStatus && (
              <div className="pt-2 border-t border-gray-100">
                <LogoutBtn fullWidth={true} />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
