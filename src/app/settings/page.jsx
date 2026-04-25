"use client";
import React from "react";
import Header from "./compsett/header";
import ProfileForm from "./compsett/profileForm";

export default function SettingsPage() {
  return (
    <div className="px-10 py-10 lg:px-16">
      <Header />
      <ProfileForm />
    </div>
  );
};