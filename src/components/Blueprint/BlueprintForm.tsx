import React, { useState } from 'react';
import { useContractStore } from '../../store/contractStore';
import type { Blueprint, Field } from '../../types';
import FieldBuilder from './FieldBuilder';

interface BlueprintFormProps {
  onCreated?: (blueprint: Blueprint) => void;
}

const BlueprintForm: React.FC<BlueprintFormProps> = ({ onCreated }) => {
  const addBlueprint = useContractStore((state) => state.addBlueprint);
  const [name, setName] = useState('');
  const [fields, setFields] = useState<Field[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddField = (field: Field): void => {
    setFields((current) => [...current, field]);
  };

  const handleRemoveField = (fieldId: string): void => {
    setFields((current) => current.filter((field) => field.id !== fieldId));
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError('Blueprint name is required.');
      return;
    }
    if (fields.length === 0) {
      setError('At least one field is required.');
      return;
    }

    const blueprint = addBlueprint(name.trim(), fields);
    setSuccess('Blueprint created successfully.');
    setName('');
    setFields([]);
    if (onCreated) {
      onCreated(blueprint);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Blueprint Name
        </label>
        <input
          className="mt-1 w-full rounded border border-gray-300 p-2"
          placeholder="Enter blueprint name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <FieldBuilder
        fields={fields}
        onAddField={handleAddField}
        onRemoveField={handleRemoveField}
      />

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Create Blueprint
        </button>
        {error && <span className="text-sm text-red-600">{error}</span>}
        {success && <span className="text-sm text-green-600">{success}</span>}
      </div>
    </form>
  );
};

export default BlueprintForm;
