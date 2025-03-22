
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12',
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-display font-bold">
            <span className="text-gradient">兵拓时代</span>
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="#features">特色</NavLink>
          <NavLink href="#products">产品</NavLink>
          <NavLink href="#pricing">价格</NavLink>
          <NavLink href="#about">关于</NavLink>
        </div>

        <div className="flex items-center">
          <button
            className="px-6 py-2 rounded-full bg-black text-white font-medium hover:bg-opacity-80 transition-all duration-200"
          >
            立即报名
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a
      href={href}
      className="text-foreground font-medium transition-colors duration-200 hover:text-primary/70 link-underline"
    >
      {children}
    </a>
  );
};

export default Navbar;
