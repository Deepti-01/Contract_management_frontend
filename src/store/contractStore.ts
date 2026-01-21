import { create } from 'zustand';
import type {
  Blueprint,
  Contract,
  ContractField,
  ContractStatus,
  Field,
} from '../types';

interface ContractStoreState {
  blueprints: Blueprint[];
  contracts: Contract[];
  addBlueprint: (name: string, fields: Field[]) => Blueprint;
  getBlueprint: (id: string) => Blueprint | undefined;
  createContract: (name: string, blueprintId: string) => Contract | undefined;
  updateContractField: (
    contractId: string,
    fieldId: string,
    value: string | boolean,
  ) => void;
  updateContractStatus: (contractId: string, status: ContractStatus) => void;
  getContract: (id: string) => Contract | undefined;
  getContractsByStatus: (status: ContractStatus) => Contract[];
}

export const useContractStore = create<ContractStoreState>((set, get) => ({
  blueprints: [],
  contracts: [],

  addBlueprint: (name, fields) => {
    const now = new Date();
    const blueprint: Blueprint = {
      id: Date.now().toString(),
      name,
      createdAt: now,
      fields,
    };
    set((state) => ({ blueprints: [...state.blueprints, blueprint] }));
    return blueprint;
  },

  getBlueprint: (id) => get().blueprints.find((bp) => bp.id === id),

  createContract: (name, blueprintId) => {
    const blueprint = get().getBlueprint(blueprintId);
    if (!blueprint) {
      return undefined;
    }
    const now = new Date();
    const contract: Contract = {
      id: Date.now().toString(),
      name,
      blueprintId,
      blueprintName: blueprint.name,
      fields: blueprint.fields.map((field) => {
        const contractField: ContractField = {
          fieldId: field.id,
          fieldLabel: field.label,
          fieldType: field.type,
          value: field.type === 'CHECKBOX' ? false : '',
        };
        return contractField;
      }),
      status: 'CREATED',
      createdAt: now,
      updatedAt: now,
    };
    set((state) => ({ contracts: [...state.contracts, contract] }));
    return contract;
  },

  updateContractField: (contractId, fieldId, value) => {
    set((state) => {
      const contracts = state.contracts.map((contract) => {
        if (contract.id !== contractId) {
          return contract;
        }
        if (contract.status === 'LOCKED' || contract.status === 'REVOKED') {
          return contract;
        }
        const fields = contract.fields.map((field) =>
          field.fieldId === fieldId ? { ...field, value } : field,
        );
        return { ...contract, fields, updatedAt: new Date() };
      });
      return { contracts };
    });
  },

  updateContractStatus: (contractId, status) => {
    set((state) => {
      const order: ContractStatus[] = [
        'CREATED',
        'APPROVED',
        'SENT',
        'SIGNED',
        'LOCKED',
      ];

      const contracts = state.contracts.map((contract) => {
        if (contract.id !== contractId) {
          return contract;
        }
        if (contract.status === 'LOCKED' || contract.status === 'REVOKED') {
          return contract;
        }

        if (status === 'REVOKED') {
          const allowed = contract.status === 'CREATED' || contract.status === 'SENT';
          if (!allowed) {
            return contract;
          }
          return { ...contract, status, updatedAt: new Date() };
        }

        const currentIndex = order.indexOf(contract.status);
        const nextIndex = order.indexOf(status);
        const isNextStep = nextIndex === currentIndex + 1;
        if (!isNextStep) {
          return contract;
        }

        return { ...contract, status, updatedAt: new Date() };
      });
      return { contracts };
    });
  },

  getContract: (id) => get().contracts.find((ct) => ct.id === id),

  getContractsByStatus: (status) =>
    get().contracts.filter((ct) => ct.status === status),
}));
