import React, { useMemo, useState } from 'react';
import { useContractStore } from '../../store/contractStore';
import type { Contract, ContractStatus } from '../../types';
import ContractTable from './ContractTable';

type StatusFilter = 'ALL' | ContractStatus;

const ContractDashboard: React.FC = () => {
  const contracts = useContractStore((state) => state.contracts);
  const updateStatus = useContractStore((state) => state.updateContractStatus);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

  const handleAdvance = (
    contractId: string,
    nextStatus: ContractStatus,
  ): void => {
    updateStatus(contractId, nextStatus);
  };

  const handleRevoke = (contractId: string): void => {
    updateStatus(contractId, 'REVOKED');
  };

  const visibleContracts: Contract[] = useMemo(() => {
    if (statusFilter === 'ALL') {
      return contracts;
    }
    return contracts.filter((contract) => contract.status === statusFilter);
  }, [contracts, statusFilter]);

  return (
    <div className="space-y-4 rounded border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Contract Dashboard</h2>
          <p className="text-sm text-gray-600">
            Manage lifecycle states and review contract progress.
          </p>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Filter by status
          </label>
          <select
            className="rounded border border-gray-300 p-2"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as StatusFilter)
            }
          >
            <option value="ALL">All</option>
            <option value="CREATED">CREATED</option>
            <option value="APPROVED">APPROVED</option>
            <option value="SENT">SENT</option>
            <option value="SIGNED">SIGNED</option>
            <option value="LOCKED">LOCKED</option>
            <option value="REVOKED">REVOKED</option>
          </select>
        </div>
      </div>

      <ContractTable
        contracts={visibleContracts}
        onAdvance={handleAdvance}
        onRevoke={handleRevoke}
      />
    </div>
  );
};

export default ContractDashboard;
