import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiBookOpen, FiMenu, FiX } from "react-icons/fi";
import { storeContext } from "../context/storeContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth } = useContext(storeContext);
  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-[#f3ece3] text-[#8a4b24]"
        : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
    }`;

  return (
    <header className="fixed left-0 top-0 z-30 w-full border-b border-stone-200/80 bg-[#faf8f4]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#8a4b24] text-white shadow-sm">
            <FiBookOpen className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight text-stone-900">Between the Covers</span>
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-stone-700 transition hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-[#8a4b24] md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>

        <div className={`${isOpen ? "block" : "hidden"} w-full pt-3 md:block md:w-auto md:pt-0`}>
          <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
            {isAuth ? (
              <>
                <li><NavLink to="/" end className={linkClass} onClick={() => setIsOpen(false)}>Dashboard</NavLink></li>
                <li><NavLink to="/profile" className={linkClass} onClick={() => setIsOpen(false)}>Profile</NavLink></li>
                <li><NavLink to="/signout" className="mt-1 inline-flex justify-center rounded-full bg-[#8a4b24] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#713b1c] md:ml-2 md:mt-0" onClick={() => setIsOpen(false)}>Sign out</NavLink></li>
              </>
            ) : (
              <>
                <li><NavLink to="/register" className={linkClass} onClick={() => setIsOpen(false)}>Create account</NavLink></li>
                <li><NavLink to="/login" className="mt-1 inline-flex justify-center rounded-full bg-[#8a4b24] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#713b1c] md:ml-2 md:mt-0" onClick={() => setIsOpen(false)}>Sign in</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
