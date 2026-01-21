import React from 'react';

type NavKey = 'dashboard' | 'blueprint' | 'contract';

interface NavigationProps {
  active: NavKey;
  onNavigate: (key: NavKey) => void;
}

const Navigation: React.FC<NavigationProps> = ({ active, onNavigate }) => {
  const links: { key: NavKey; label: string }[] = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'blueprint', label: 'Create Blueprint' },
    { key: 'contract', label: 'Create Contract' },
  ];

  return (
    <nav className="mb-6 flex gap-3">
      {links.map((link) => (
        <button
          key={link.key}
          type="button"
          className={`rounded px-4 py-2 text-sm font-semibold ${
            active === link.key
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => onNavigate(link.key)}
        >
          {link.label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
