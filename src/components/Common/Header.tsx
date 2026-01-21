import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => (
  <header className="mb-4">
    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
    {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
  </header>
);

export default Header;
