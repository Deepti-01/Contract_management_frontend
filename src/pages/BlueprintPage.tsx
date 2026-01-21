import React from 'react';
import BlueprintForm from '../components/Blueprint/BlueprintForm';
import Header from '../components/Common/Header';

const BlueprintPage: React.FC = () => (
  <div className="space-y-4">
    <Header
      title="Create Blueprint"
      subtitle="Define reusable templates with structured fields."
    />
    <BlueprintForm />
  </div>
);

export default BlueprintPage;
