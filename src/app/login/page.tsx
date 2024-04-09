"use client";

import SpinnerIcon from "@/components/icon/spinner";
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
import { Toggle } from "@/components/ui/toggle";
import { signIn, signOut } from "@/lib/auth";
import { dbUrl } from "@/lib/env";
import {
  EyeClosedIcon,
  EyeOpenIcon,
  ReloadIcon,
  ShadowIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {};

const LoginPage = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [viewPassword, setViewPassword] = useState("password");
  const handleViewPassword = () => {
    setViewPassword((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const username = (e.target as HTMLFormElement)["username"].value;
    const password = (e.target as HTMLFormElement)["password"].value;
    if (!username) {
      toast.error("Username is required");
      setLoading(false);
      return;
    }
    if (!password) {
      toast.error("Password is required");
      setLoading(false);
      return;
    }

    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(async (res) => {
        const data = await res.json();

        if (res.ok) {
          toast.success("Successfully logged in!");
          signIn(data.user);
        } else {
          toast.error("Something went wrong, please try again.");
          signOut();
        }
        setLoading(false);
        router.push("/");
      })
      .catch((err) => {
        toast.error("Couldn't login, please try again later.");
        setLoading(false);

        signOut();
      });
  };
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
      <form className="" onSubmit={handleLogin}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your username below to login to your account. An account
              would be created if it doesn&apos;t exist.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" placeholder="Username" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="flex gap-1">
                <Input
                  id="password"
                  type={viewPassword}
                  name="password"
                  placeholder="Password"
                />
                <Toggle onClick={handleViewPassword}>
                  {viewPassword === "password" ? (
                    <EyeClosedIcon />
                  ) : (
                    <EyeOpenIcon />
                  )}
                </Toggle>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={loading}>
              {loading && <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />}
              Sign in
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default LoginPage;
