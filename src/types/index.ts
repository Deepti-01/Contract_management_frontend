export type FieldType = 'TEXT' | 'DATE' | 'SIGNATURE' | 'CHECKBOX';

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  position: { x: number; y: number };
}

export interface Blueprint {
  id: string;
  name: string;
  createdAt: Date;
  fields: Field[];
}

export type ContractStatus =
  | 'CREATED'
  | 'APPROVED'
  | 'SENT'
  | 'SIGNED'
  | 'LOCKED'
  | 'REVOKED';

export interface ContractField {
  fieldId: string;
  fieldLabel: string;
  fieldType: FieldType;
  value: string | boolean;
}

export interface Contract {
  id: string;
  name: string;
  blueprintId: string;
  blueprintName: string;
  fields: ContractField[];
  status: ContractStatus;
  createdAt: Date;
  updatedAt: Date;
}
