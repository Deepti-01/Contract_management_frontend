import React from 'react';
import type { ContractStatus } from '../../types';

interface StatusBadgeProps {
  status: ContractStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const colorMap: Record<ContractStatus, string> = {
    CREATED: 'bg-gray-200 text-gray-800',
    APPROVED: 'bg-blue-100 text-blue-800',
    SENT: 'bg-indigo-100 text-indigo-800',
    SIGNED: 'bg-green-100 text-green-800',
    LOCKED: 'bg-gray-800 text-white',
    REVOKED: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`rounded px-2 py-1 text-xs font-semibold ${colorMap[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
