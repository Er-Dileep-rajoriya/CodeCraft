"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { Eye, EyeOff, Router } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignUpUser } from "@/actions/user_auth";
import { toast } from "sonner";

type userObject = {
  name: string;
  email: string;
  password: string;
};

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { data: session, status } = useSession();
  const [user, setUser] = useState<userObject>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
    formError: "",
  });
  const [loading, setLoading] = useState(false);

  // Redirect to home page if user is already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Show loading state while session is being fetched
  if (status === "loading") {
    return null; // or return a loading spinner
  }

  // SignUp form submission (onSubmit event)
  async function handleSignUpUserManualy(e: FormEvent) {
    e.preventDefault();

    console.log("User : ", user);
    // client side validation
    if (!user.name || user.name.trim() == "") {
      setErrors({ ...errors, nameError: "Name is required" });
      return;
    }

    if (!user.email || user.email.trim() == "") {
      setErrors({ ...errors, emailError: "Email is required" });
      return;
    }

    if (!user.password || user.password.trim() == "") {
      setErrors({
        ...errors,
        passwordError: "Password is required",
      });
      return;
    }

    if (user.password.length < 6) {
      setErrors({
        ...errors,
        passwordError: "Password must be at least 6 characters long",
      });
      return;
    }

    try {
      setLoading(true);
      // Call the server action
      const response = await SignUpUser(user);

      if (response.status === 201) {
        router.push("/auth/login");
        toast.success("User created successfully. Please log in.");
      } else {
        setErrors({ ...errors, formError: response.message });
      }
    } catch (err) {
      setErrors({
        ...errors,
        formError: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 pt-16">
      {" "}
      {/* Add pt-16 here */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Sign Up
        </h1>

        {/* Form Error if any */}
        <p className="text-red-500 text-center">{errors.formError}</p>

        {/* Signup Form */}
        <form onSubmit={handleSignUpUserManualy} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Name
            </label>
            <input
              value={user.name}
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
                setErrors({ ...errors, nameError: "" });
              }}
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <p className="text-red-500">{errors.nameError}</p>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
                setErrors({ ...errors, emailError: "" });
              }}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <p className="text-red-500">{errors.emailError}</p>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                  setErrors({ ...errors, passwordError: "" });
                }}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <p className="text-red-500">{errors.passwordError}</p>
          </div>

          {/* Signup Button */}
          <Button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
          >
            {loading ? "Loading..." : "Sign Up"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="mx-4 text-gray-500 dark:text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Google Signup Button */}
        <Button
          onClick={() => {
            signIn("google");
            router.push("/");
          }}
          variant="outline"
          className="w-full flex items-center justify-center space-x-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-semibold py-2 rounded-lg"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="h-5 w-5"
          />
          <span>Sign up with Google</span>
        </Button>

        {/* GitHub Signup Button */}
        <Button
          onClick={() => {
            signIn("github");
            router.push("/");
          }}
          variant="outline"
          className="w-full flex items-center justify-center space-x-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-semibold py-2 rounded-lg mt-4"
        >
          <img
            src="https://www.svgrepo.com/show/512317/github-142.svg"
            alt="GitHub"
            className="h-5 w-5"
          />
          <span>Sign up with GitHub</span>
        </Button>

        {/* Login Link */}
        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
