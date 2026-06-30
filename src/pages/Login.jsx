import React from "react";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../components/ui/input";
import { Field, FieldError, FieldLabel } from "../components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Toaster } from "../components/ui/sonner";
import { toast } from "sonner";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

const Login = () => {

  const { login } = useAuth();

  const navigate = useNavigate();

  const [show, setShow] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const loginResponse = await api.post("/auth/login", data);

      if(loginResponse.status === 200 ) {
        toast.success("LoggedIn succesfully");

        console.log(loginResponse);

        const token = loginResponse.data.data.token;

        console.log("token is", token)

        login(data, token);

        navigate("/dashboard");
      } else {
        toast.error(loginResponse.message || "Login failed"); // backend error
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong"); // frontend error
      console.log(error);    //before deploying sab console.log remove garnu parxa
    }
    

  };

  // const handleClick = () => {
  //   toast.success("Login successful", { position: "top-right" });
  // };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card className="w-1/4 mx-auto mt-50">

      {/* <Toaster /> */}
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder=" abc@gmail.com"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="relative">
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type={show ? "text" : "password"}
                    placeholder="********"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="absolute right-1 bottom-1.5" onClick={() => {setShow(!show)}}>
                {
                    show ? <EyeOff size={18} /> : <Eye size={18} />
                }
            </div>
          </div>

          <div className="mt-4">
            <a href="/forgetPassword">Forget Password?</a>
         </div>
        </CardContent>
        <CardFooter className="block">
          {/* <Button onClick={handleClick} type="submit" className="w-full"> */}
          <Button type="submit" className="w-full">
            Login
          </Button>

          <div className="mt-4 text-center">
            Don't have an account?
            <a className="text-blue-500 underline" href="/register">Register</a>
          </div>

        </CardFooter>
      </Card>
    </form>
  );
};

export default Login;
