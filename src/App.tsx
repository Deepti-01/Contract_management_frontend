import React, { useState } from 'react';
import DashboardPage from './pages/DashboardPage';
import BlueprintPage from './pages/BlueprintPage';
import ContractPage from './pages/ContractPage';
import Navigation from './components/Common/Navigation';
import HomePage from './pages/HomePage';
import './App.css';

type PageKey = 'dashboard' | 'blueprint' | 'contract';

const App: React.FC = () => {
  const [page, setPage] = useState<PageKey>('dashboard');

  const renderPage = (): React.ReactNode => {
    if (page === 'blueprint') {
      return <BlueprintPage />;
    }
    if (page === 'contract') {
      return <ContractPage />;
    }
    return <DashboardPage />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <HomePage />
        <Navigation active={page} onNavigate={setPage} />
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
