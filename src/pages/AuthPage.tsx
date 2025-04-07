import AuthForm from "@/components/auth/AuthForm";
import React from "react";

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex flex-col">
      <AuthForm />
    </div>
  );
};

export default AuthPage;
