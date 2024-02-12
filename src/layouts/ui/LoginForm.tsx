"use client";
import FormInput from "@/components/FormInput";
import SubmitButton from "@/components/SubmitButton";
import useAuth from "@/hook/useAuth";
import useRegistrationForm from "@/hook/useRegistrationForm";
import React from "react";

const LoginForm = () => {
  const { formData, handleChange } = useRegistrationForm();
  const { login } = useAuth();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        label="Email"
        type="email"
        id="email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <FormInput
        label="Password"
        type="password"
        id="password"
        value={formData.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />
      <SubmitButton label="Register" />
    </form>
  );
};

export default LoginForm;
