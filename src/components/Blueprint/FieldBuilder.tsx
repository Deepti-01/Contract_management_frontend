import React, { useState } from 'react';
import type { Field, FieldType } from '../../types';

const fieldTypes: FieldType[] = ['TEXT', 'DATE', 'SIGNATURE', 'CHECKBOX'];

interface FieldBuilderProps {
  fields: Field[];
  onAddField: (field: Field) => void;
  onRemoveField: (fieldId: string) => void;
}

const FieldBuilder: React.FC<FieldBuilderProps> = ({
  fields,
  onAddField,
  onRemoveField,
}) => {
  const [label, setLabel] = useState('');
  const [type, setType] = useState<FieldType>('TEXT');

  const handleAdd = (): void => {
    if (!label.trim()) {
      return;
    }
    const field: Field = {
      id: Date.now().toString(),
      label: label.trim(),
      type,
      position: { x: 0, y: fields.length },
    };
    onAddField(field);
    setLabel('');
    setType('TEXT');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 md:flex-row">
        <input
          className="w-full rounded border border-gray-300 p-2"
          placeholder="Field label"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
        />
        <select
          className="rounded border border-gray-300 p-2 md:w-40"
          value={type}
          onChange={(event) => setType(event.target.value as FieldType)}
        >
          {fieldTypes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          onClick={handleAdd}
        >
          Add Field
        </button>
      </div>
      <div className="space-y-2">
        {fields.length === 0 ? (
          <p className="text-sm text-gray-500">No fields added yet.</p>
        ) : (
          fields.map((field) => (
            <div
              key={field.id}
              className="flex items-center justify-between rounded border border-gray-200 bg-white p-2"
            >
              <div>
                <p className="font-medium">{field.label}</p>
                <p className="text-xs text-gray-500">{field.type}</p>
              </div>
              <button
                type="button"
                className="text-sm text-red-600 hover:underline"
                onClick={() => onRemoveField(field.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FieldBuilder;
