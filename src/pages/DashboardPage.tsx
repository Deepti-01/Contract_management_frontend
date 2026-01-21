import React from 'react';
import Header from '../components/Common/Header';
import ContractDashboard from '../components/Dashboard/ContractDashboard';

const DashboardPage: React.FC = () => (
  <div className="space-y-4">
    <Header
      title="Dashboard"
      subtitle="Review contracts, filter by status, and manage lifecycle steps."
    />
    <ContractDashboard />
  </div>
);

export default DashboardPage;
