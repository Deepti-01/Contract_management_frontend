import React from 'react';
import type { Contract, ContractStatus } from '../../types';
import StatusBadge from '../Contract/StatusBadge';

interface ContractTableProps {
  contracts: Contract[];
  onAdvance: (contractId: string, nextStatus: ContractStatus) => void;
  onRevoke: (contractId: string) => void;
}

const ContractTable: React.FC<ContractTableProps> = ({
  contracts,
  onAdvance,
  onRevoke,
}) => {
  const lifecycleOrder: ContractStatus[] = [
    'CREATED',
    'APPROVED',
    'SENT',
    'SIGNED',
    'LOCKED',
  ];

  const getNextStatus = (status: ContractStatus): ContractStatus | null => {
    const index = lifecycleOrder.indexOf(status);
    if (index >= 0 && index < lifecycleOrder.length - 1) {
      return lifecycleOrder[index + 1];
    }
    return null;
  };

  const canRevoke = (status: ContractStatus): boolean =>
    status === 'CREATED' || status === 'SENT';

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-700">
              Contract
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">
              Blueprint
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">
              Status
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">
              Updated
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {contracts.length === 0 ? (
            <tr>
              <td
                className="px-4 py-3 text-center text-gray-500"
                colSpan={5}
              >
                No contracts found.
              </td>
            </tr>
          ) : (
            contracts.map((contract) => {
              const nextStatus = getNextStatus(contract.status);
              return (
                <tr key={contract.id}>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {contract.name}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {contract.blueprintName}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={contract.status} />
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {contract.updatedAt.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      type="button"
                      className="rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                      disabled={
                        !nextStatus ||
                        contract.status === 'LOCKED' ||
                        contract.status === 'REVOKED'
                      }
                      onClick={() =>
                        nextStatus && onAdvance(contract.id, nextStatus)
                      }
                    >
                      Advance
                    </button>
                    <button
                      type="button"
                      className="rounded bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                      disabled={!canRevoke(contract.status)}
                      onClick={() => onRevoke(contract.id)}
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContractTable;
