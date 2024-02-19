"use client";
import useAuth from "@/hook/useAuth";
import useRegistrationForm from "@/hook/useRegistrationForm";
import { Axios } from "@/lib/axios";
import React from "react";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/SubmitButton";

const Register = () => {
  const { formData, handleChange } = useRegistrationForm();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await Axios.post("user", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    // Handle form submission with formData
    if (res.status === 200) {
      login(formData.email, formData.password);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        label="Name"
        type="text"
        id="name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
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

export default Register;
