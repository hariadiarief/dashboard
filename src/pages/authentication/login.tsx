import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link, useNavigate } from "react-router";
import { ILoginPayload, ILoginResponse, login } from "@/services/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/auth/authContext";

export default function Login() {
  const { dispatch } = useAuth();
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation<ILoginResponse, Error, ILoginPayload>({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.jwt);
      dispatch({ type: "login", payload: { token: data.jwt } });
      navigate("/");
    },
    onError: (error) => {
      console.error("Login gagal:", error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({
      identifier: email,
      password,
    });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full md:max-w-xl max-w-sm pt-6">
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <p className="text-sm text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
