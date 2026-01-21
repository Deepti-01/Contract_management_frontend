import React from 'react';
import ContractForm from '../components/Contract/ContractForm';
import Header from '../components/Common/Header';

const ContractPage: React.FC = () => (
  <div className="space-y-4">
    <Header
      title="Create Contract"
      subtitle="Select a blueprint and auto-save contract field edits."
    />
    <ContractForm />
  </div>
);

export default ContractPage;
