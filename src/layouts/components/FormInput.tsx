"use client";
import React, { ChangeEvent } from "react";

interface FormInputProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  id,
  value,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="w-full p-2 border rounded"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
