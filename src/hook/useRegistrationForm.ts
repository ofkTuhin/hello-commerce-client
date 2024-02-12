import { useState } from "react";
interface RegistrationState {
  name: string;
  email: string;
  password: string;
}

const useRegistrationForm = () => {
  const [formData, setFormData] = useState<RegistrationState>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (
    field: keyof RegistrationState,
    value: string | number,
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return { formData, handleChange };
};

export default useRegistrationForm;
