import { Link } from "react-router-dom"
import { SunIcon, MoonIcon, MenuIcon, XIcon } from "@heroicons/react/solid"
import { useState } from "react"
import { MessageCircle } from 'lucide-react';

function Header({ darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold relative group">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-hover">
              AnonyPost
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-hover transition-all group-hover:w-full"></span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/chat" className="md:hidden">
              <MessageCircle className="h-6 w-6" />
            </Link>
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 py-4 border-t dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <NavLinks mobile />
              <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} mobile />
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

function NavLinks({ mobile }) {
  const baseClasses = "relative group transition-colors duration-200"
  const mobileClasses = mobile ? "block py-2" : ""
  const linkClasses = `${baseClasses} ${mobileClasses}`

  return (
    <>
      <Link to="/" className={linkClasses}>
        Home
        <NavLinkUnderline />
      </Link>
      <Link to="/support" className={linkClasses}>
        Support
        <NavLinkUnderline />
      </Link>
      <Link to="/about" className={linkClasses}>
        About
        <NavLinkUnderline />
      </Link>
    </>
  )
}

function NavLinkUnderline() {
  return (
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
  )
}

function ThemeToggle({ darkMode, setDarkMode, mobile }) {
  const baseClasses = "p-2 rounded-lg transition-colors duration-200"
  const mobileClasses = mobile ? "w-full flex items-center space-x-2" : ""
  const buttonClasses = `${baseClasses} ${mobileClasses} hover:bg-gray-100 dark:hover:bg-gray-700`

  return (
    <button onClick={() => setDarkMode(!darkMode)} className={buttonClasses}>
      {darkMode ? (
        <>
          <SunIcon className="h-5 w-5" />
          {mobile && <span>Light Mode</span>}
        </>
      ) : (
        <>
          <MoonIcon className="h-5 w-5" />
          {mobile && <span>Dark Mode</span>}
        </>
      )}
    </button>
  )
}

export default Header

