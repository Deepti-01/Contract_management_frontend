import React from 'react';
import Header from '../components/Common/Header';

const HomePage: React.FC = () => (
  <div className="space-y-3">
    <Header
      title="Contract Management Platform"
      subtitle="Create blueprints, generate contracts, and track lifecycle states."
    />
    <p className="text-sm text-gray-700">
      Use the navigation above to create blueprints, generate contracts from
      templates, and manage contract progression. All data lives in-memory for
      this assessment.
    </p>
  </div>
);

export default HomePage;
