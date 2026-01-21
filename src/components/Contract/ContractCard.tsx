import React from 'react';
import type { Contract } from '../../types';
import StatusBadge from './StatusBadge';

interface ContractCardProps {
  contract: Contract;
}

const ContractCard: React.FC<ContractCardProps> = ({ contract }) => {
  return (
    <div className="rounded border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{contract.name}</h3>
        <StatusBadge status={contract.status} />
      </div>
      <p className="text-sm text-gray-600">Blueprint: {contract.blueprintName}</p>
      <p className="text-xs text-gray-500">
        Created: {contract.createdAt.toLocaleString()}
      </p>
      <p className="text-xs text-gray-500">
        Updated: {contract.updatedAt.toLocaleString()}
      </p>
    </div>
  );
};

export default ContractCard;
