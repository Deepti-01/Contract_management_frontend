import React, { useMemo, useState } from 'react';
import { useContractStore } from '../../store/contractStore';
import type { Blueprint, Contract, FieldType } from '../../types';
import StatusBadge from './StatusBadge';

const ContractForm: React.FC = () => {
  const blueprints = useContractStore((state) => state.blueprints);
  const createContract = useContractStore((state) => state.createContract);
  const updateContractField = useContractStore(
    (state) => state.updateContractField,
  );
  const [selectedBlueprintId, setSelectedBlueprintId] = useState('');
  const [contractName, setContractName] = useState('');
  const [activeContractId, setActiveContractId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const activeContract = useContractStore((state) =>
    state.contracts.find((contract) => contract.id === activeContractId),
  );

  const selectedBlueprint: Blueprint | undefined = useMemo(
    () => blueprints.find((bp) => bp.id === selectedBlueprintId),
    [blueprints, selectedBlueprintId],
  );

  const handleCreateContract = (): void => {
    setError('');
    setSuccess('');
    if (!selectedBlueprintId) {
      setError('Please select a blueprint.');
      return;
    }
    if (!contractName.trim()) {
      setError('Contract name is required.');
      return;
    }
    const contract = createContract(contractName.trim(), selectedBlueprintId);
    if (!contract) {
      setError('Unable to create contract. Blueprint missing.');
      return;
    }
    setActiveContractId(contract.id);
    setSuccess('Contract created and ready for editing.');
    setContractName('');
  };

  const handleFieldChange = (
    fieldId: string,
    value: string | boolean,
    fieldType: FieldType,
  ): void => {
    const isCheckbox = fieldType === 'CHECKBOX';
    const resolvedValue = isCheckbox ? Boolean(value) : String(value);
    if (activeContract) {
      updateContractField(activeContract.id, fieldId, resolvedValue);
    }
  };

  const isReadOnly =
    activeContract?.status === 'LOCKED' || activeContract?.status === 'REVOKED';

  return (
    <div className="space-y-4 rounded border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="text-xl font-semibold">Create Contract</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Blueprint
          </label>
          <select
            className="w-full rounded border border-gray-300 p-2"
            value={selectedBlueprintId}
            onChange={(event) => setSelectedBlueprintId(event.target.value)}
          >
            <option value="">Choose a blueprint</option>
            {blueprints.map((bp) => (
              <option key={bp.id} value={bp.id}>
                {bp.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Contract Name
          </label>
          <input
            className="w-full rounded border border-gray-300 p-2"
            placeholder="Enter contract name"
            value={contractName}
            onChange={(event) => setContractName(event.target.value)}
          />
        </div>
      </div>

      <button
        type="button"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        onClick={handleCreateContract}
      >
        Create Contract
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}

      {selectedBlueprint && !activeContractId && (
        <p className="text-sm text-gray-600">
          Blueprint fields will appear after creating the contract.
        </p>
      )}

      {activeContract && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{activeContract.name}</h3>
            <StatusBadge status={activeContract.status} />
          </div>
          <div className="space-y-4">
            {activeContract.fields.map((field) => {
              if (field.fieldType === 'SIGNATURE') {
                return (
                  <div key={field.fieldId} className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      {field.fieldLabel} (Signature)
                    </p>
                    <div className="flex h-24 items-center justify-center rounded border border-dashed border-gray-400 bg-gray-50 text-gray-500">
                      Signature placeholder
                    </div>
                  </div>
                );
              }

              if (field.fieldType === 'CHECKBOX') {
                return (
                  <label
                    key={field.fieldId}
                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                      checked={Boolean(field.value)}
                      disabled={isReadOnly}
                      onChange={(event) =>
                        handleFieldChange(
                          field.fieldId,
                          event.target.checked,
                          field.fieldType,
                        )
                      }
                    />
                    {field.fieldLabel}
                  </label>
                );
              }

              const inputType = field.fieldType === 'DATE' ? 'date' : 'text';
              return (
                <div key={field.fieldId} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.fieldLabel}
                  </label>
                  <input
                    type={inputType}
                    className="w-full rounded border border-gray-300 p-2"
                    value={String(field.value)}
                    disabled={isReadOnly}
                    onChange={(event) =>
                      handleFieldChange(
                        field.fieldId,
                        event.target.value,
                        field.fieldType,
                      )
                    }
                  />
                </div>
              );
            })}
          </div>
          {isReadOnly && (
            <p className="text-sm text-gray-500">
              This contract is locked and cannot be edited.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ContractForm;
