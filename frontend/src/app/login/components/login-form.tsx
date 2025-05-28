"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, Mail } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const router = useRouter();

  // const loginMutation = useMutation({
  //   mutationFn: loginUser,
  //   onSuccess: (data) => {
  //     console.log("Login realizado com sucesso:", data)
  //     // Aqui você pode salvar o token no localStorage ou cookies
  //     localStorage.setItem("token", data.token)
  //     router.push("/dashboard")
  //   },
  //   onError: (error: any) => {
  //     console.error("Erro no login:", error)
  //   },
  // })

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   loginMutation.mutate({ email, password })
  // }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Digite seu email e senha para acessar sua conta
        </CardDescription>
      </CardHeader>
      <form onSubmit={() => {}}>
        <CardContent className="space-y-4">
          {/* {loginMutation.isError && (
            <Alert variant="destructive">
              <AlertDescription>
                {loginMutation.error?.message || "Erro ao fazer login. Verifique suas credenciais."}
              </AlertDescription>
            </Alert>
          )} */}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full" disabled={false}>
            {/* {loginMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : ( */}
            Entrar
            {/* )} */}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
