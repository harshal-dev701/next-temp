'use client';
import { useTheme } from '@/contexts/ThemeProvider';
import Link from 'next/link';
import { useState, useEffect, useRef, Ref } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ChevronDown } from 'lucide-react';

const getLanguageLabel = (lang) => {
  switch (lang) {
    case 'english':
      return 'English';
    case 'spanish':
      return 'Español';
    default:
      return 'English';
  }
};

export default function Header() {
  const { language, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const t = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const themeDropdownDesktopRef = useRef<HTMLLIElement>(null);
  const themeDropdownMobileRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  // Close theme dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const desktopContains = themeDropdownDesktopRef.current?.contains(event.target as Node);
      const mobileContains = themeDropdownMobileRef.current?.contains(event.target as Node);

      if (isThemeDropdownOpen && !desktopContains && !mobileContains) {
        setIsThemeDropdownOpen(false);
      }
    };

    if (isThemeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isThemeDropdownOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const getThemeIcon = () => {
    if (theme === 'light') {
      return (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
          />
        </svg>
      );
    } else if (theme === 'dark') {
      return (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
          />
        </svg>
      );
    } else {
      return (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
          />
        </svg>
      );
    }
  };

  const handleSelect = (item) => {
    changeLanguage(item);
    // setOpen(false); // Close popover after selection
  };

  return (
    <header
      suppressHydrationWarning
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${'bg-light-blue/70 dark:bg-gray-950/70 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20'}`}>
      <nav className='w-full mx-auto px-4 sm:px-6 lg:px-8' aria-label='Main navigation'>
        <div className='flex items-center justify-between h-14 md:h-16'>
          {/* Logo/Brand */}
          <div className='flex shrink-0'>
            <Link
              href='/'
              className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-light-blue transition-colors duration-200'
              onClick={closeMenu}
              aria-label='Home'>
              {/* Blog */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className='hidden md:flex md:items-center md:space-x-8 list-none'>
            <li>
              <Link
                href='/'
                className='text-gray hover:text-blue-600 dark:hover:text-light-blue font-medium transition-colors duration-200 px-3 py-2'>
                {t.navbar.menu.home}
              </Link>
            </li>
            <li>
              <Link
                href='/'
                className='text-gray hover:text-blue-600 dark:hover:text-light-blue font-medium transition-colors duration-200 px-3 py-2'>
                {t.navbar.menu.blog}
              </Link>
            </li>
            <li>
              <Link
                href='/'
                className='text-gray hover:text-blue-600 dark:hover:text-light-blue font-medium transition-colors duration-200 px-3 py-2'>
                {t.navbar.menu.about}
              </Link>
            </li>
            <li>
              <Link
                href='/'
                className='text-gray hover:text-blue-600 dark:hover:text-light-blue font-medium transition-colors duration-200 px-3 py-2'>
                {t.navbar.menu.contact}
              </Link>
            </li>

            {/* Theme Dropdown */}
            <li className='relative' ref={themeDropdownDesktopRef as unknown as Ref<HTMLLIElement>}>
              <button
                onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                className='flex items-center justify-center p-2 rounded-md cursor-pointer text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-light-blue hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-light-blue transition-colors duration-200'
                aria-label='Theme selector'>
                {getThemeIcon()}
              </button>

              {isThemeDropdownOpen && (
                <div className='absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50'>
                  <div className='py-1' role='menu'>
                    <button
                      onClick={() => {
                        setTheme('light');
                        setIsThemeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 cursor-pointer ${
                        theme === 'light'
                          ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-light-blue'
                          : 'text-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      } transition-colors duration-200`}
                      role='menuitem'>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                        />
                      </svg>
                      <span>Light</span>
                      {theme === 'light' && (
                        <svg className='w-4 h-4 ml-auto' fill='currentColor' viewBox='0 0 20 20'>
                          <path
                            fillRule='evenodd'
                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                            clipRule='evenodd'
                          />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setTheme('dark');
                        setIsThemeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 cursor-pointer ${
                        theme === 'dark'
                          ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-light-blue'
                          : 'text-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      } transition-colors duration-200`}
                      role='menuitem'>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                        />
                      </svg>
                      <span>Dark</span>
                      {theme === 'dark' && (
                        <svg className='w-4 h-4 ml-auto' fill='currentColor' viewBox='0 0 20 20'>
                          <path
                            fillRule='evenodd'
                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                            clipRule='evenodd'
                          />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setTheme('system');
                        setIsThemeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 cursor-pointer ${
                        theme === 'system'
                          ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-light-blue'
                          : 'text-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      } transition-colors duration-200`}
                      role='menuitem'>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                        />
                      </svg>
                      <span>System</span>
                      {theme === 'system' && (
                        <svg className='w-4 h-4 ml-auto' fill='currentColor' viewBox='0 0 20 20'>
                          <path
                            fillRule='evenodd'
                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                            clipRule='evenodd'
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </li>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                className='flex lg:py-4 max-lg:w-[100px] h-auto w-[150px] border cursor-pointer border-border relative ring-0 focus:outline-none focus:ring-0 focus:border-black font-size-18 !font-normal xxl:!px-30 flex-shrink-0 language-selector header-text items-center justify-between px-3 py-2 bg-white hover:bg-gray-50 transition-colors'
                aria-label={`Select language. Current language: ${getLanguageLabel(language)}`}>
                <span>{getLanguageLabel(language)}</span>
                <ChevronDown
                  className='h-4 w-4 transition-transform duration-200 text-black'
                  style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </PopoverTrigger>
              <PopoverContent
                className='w-[150px] bg-white p-0 border border-border shadow-md z-100 cursor-pointer'
                align='start'
                sideOffset={4}>
                <div className='flex flex-col'>
                  <button
                    onClick={() => {
                      setOpen(false);
                      handleSelect('english');
                    }} 
                    className={`px-3 py-2 text-left font-size-16 hover:bg-gray-100 transition-colors cursor-pointer ${
                      language === 'english' ? 'bg-gray-50 font-medium' : ''
                    }`}>
                    English
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                      handleSelect('spanish');
                    }}
                    className={`px-3 py-2 text-left font-size-16 hover:bg-gray-100 transition-colors cursor-pointer ${
                      language === 'spanish' ? 'bg-gray-50 font-medium' : ''
                    }`}>
                    Español
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </ul>

          {/* Mobile menu button and theme selector */}
        </div>

        {/* Mobile Navigation Menu */}
        <section
          id='mobile-menu'
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
          aria-label='Mobile navigation menu'>
          <ul className='px-2 pt-2 pb-4 space-y-1 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 list-none'>
            <li>
              <Link
                href='/'
                className='block px-3 py-2 text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-light-blue hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md font-medium transition-colors duration-200'
                onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href='/'
                className='block px-3 py-2 text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-light-blue hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md font-medium transition-colors duration-200'
                onClick={closeMenu}>
                Blog
              </Link>
            </li>
            <li>
              <Link
                href='/'
                className='block px-3 py-2 text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-light-blue hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md font-medium transition-colors duration-200'
                onClick={closeMenu}>
                About
              </Link>
            </li>
            <li>
              <Link
                href='/'
                className='block px-3 py-2 text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-light-blue hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md font-medium transition-colors duration-200'
                onClick={closeMenu}>
                Contact
              </Link>
            </li>
          </ul>
        </section>
      </nav>

      {/* Scroll Progress Bar */}
    </header>
  );
}
