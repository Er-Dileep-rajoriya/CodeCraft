"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { Eye, EyeOff, UserPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "@/redux/userReducer";
import { LoginUser } from "@/actions/user_auth";
import { toast } from "sonner";

type userObject = {
  email: string;
  password: string;
};

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<userObject>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    formError: "",
  });
  const dispatch = useDispatch();

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleFormSubmitManually(e: FormEvent) {
    e.preventDefault();

    // Validate email and password
    if (!user.email || user.email.trim() === "") {
      setErrors({ ...errors, emailError: "Please enter your email" });
      return;
    }

    if (!user.password || user.password.trim() === "") {
      setErrors({ ...errors, passwordError: "Please enter your password" });
      return;
    }

    try {
      setLoading(true);

      const result = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (result?.error) {
        // Handle login error
        setErrors({
          ...errors,
          formError: result.error || "Invalid email or password",
        });
      } else {
        // Login successful
        dispatch(setLoggedInUser(user));
        toast.success("Logged in successfully");
        router.push("/"); // Redirect to home page
      }
    } catch (err) {
      console.error(err);
      setErrors({
        ...errors,
        formError: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  // async function handleFormSubmitManually(e: FormEvent) {
  //   e.preventDefault();

  //   if (!user.email || user.email.trim() == "") {
  //     setErrors({ ...errors, emailError: "Please enter your email" });
  //     return;
  //   }

  //   if (!user.password || user.password.trim() == "") {
  //     setErrors({ ...errors, passwordError: "Please enter your password" });
  //     return;
  //   }

  //   // implement next-auth manually logic using credentials Provider here

  //   // try {
  //   //   setLoading(true);
  //   //   const response = await LoginUser(user);

  //   //   if (response.status === 200) {
  //   //     setLoading(true);
  //   //     dispatch(setLoggedInUser(response.user));
  //   //     router.push("/");
  //   //     toast.success("User logged in successfully");
  //   //   } else {
  //   //     setErrors({
  //   //       ...errors,
  //   //       formError: response.message || "Something went wrong",
  //   //     });
  //   //   }
  //   // } catch (err) {
  //   //   console.log(err);
  //   //   setErrors({
  //   //     ...errors,
  //   //     formError: "Something went wrong. Please try again.",
  //   //   });
  //   // } finally {
  //   //   setLoading(false);
  //   // }
  // }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 pt-16">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Log In
        </h1>

        <p className="text-red-500 text-center">{errors.formError}</p>

        {/* Login Form */}
        <form onSubmit={handleFormSubmitManually} className="space-y-6">
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
                // required
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

          {/* Login Button */}
          <Button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="mx-4 text-gray-500 dark:text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Google Login Button */}
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
          <span>Log in with Google</span>
        </Button>

        {/* GitHub Login Button */}
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
          <span>Log in with GitHub</span>
        </Button>

        {/* Signup Link */}
        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
