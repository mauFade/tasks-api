import React from "react";
import LoginForm from "./components/login-form";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            Entre na sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Ou{" "}
            <a
              href="/signup"
              className="font-medium text-primary hover:text-primary/80"
            >
              crie uma nova conta
            </a>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
