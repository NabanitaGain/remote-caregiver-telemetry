import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartPulse,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Chrome,
  ArrowRight,
} from "lucide-react";

import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";


export default function Login() {

  const navigate = useNavigate();

  const { login, googleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  // =====================================================
  // VALIDATION
  // =====================================================

  const validate = () => {

    if (!email.trim()) {
      return "Email is required.";
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Please enter a valid email address.";
    }

    if (!password) {
      return "Password is required.";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }

    return "";

  };


  // =====================================================
  // NORMAL LOGIN
  // =====================================================

  const handleLogin = (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    const validationError = validate();


    if (validationError) {

      setError(validationError);

      // Toast error
      toast.error(validationError);

      return;

    }


    const result = login(
      email.trim().toLowerCase(),
      password
    );


    // LOGIN FAILED
    if (!result.success) {

      setError(result.message);

      // Toast error
      toast.error(result.message);

      return;

    }


    // LOGIN SUCCESS
    setSuccess(result.message);

    // Toast success
    toast.success("Login successful! Welcome back.");

    
    setTimeout(() => {

      navigate("/");

    }, 700);

  };


  // =====================================================
  // GOOGLE DEMO LOGIN
  // =====================================================

  const handleGoogleLogin = () => {

    const result = googleLogin();


    if (result.success) {

      toast.success(
        "Google login successful! Welcome back."
      );


      setTimeout(() => {

        navigate("/");

      }, 700);

    } else {

      toast.error(result.message);

    }

  };


  return (

    <div className="min-h-screen bg-base-200/50">

      <div className="grid min-h-screen lg:grid-cols-2">


        {/* =====================================================
            BRAND SECTION
        ===================================================== */}

        <div className="hidden bg-primary p-10 text-primary-content lg:flex lg:flex-col lg:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">

              <HeartPulse size={25} />

            </div>


            <div>

              <h1 className="text-xl font-bold">
                CareSync
              </h1>

              <p className="text-xs opacity-70">
                Remote Caregiver Telemetry
              </p>

            </div>

          </div>


          <div className="max-w-lg">

            <h2 className="text-4xl font-bold leading-tight">

              Smarter monitoring.

              <br />

              Better patient care.

            </h2>


            <p className="mt-5 text-sm leading-6 opacity-80">

              Monitor patient health data, identify critical
              alerts, and keep caregivers connected through
              one intelligent telemetry dashboard.

            </p>

          </div>


          <p className="text-xs opacity-60">
            © 2026 CareSync
          </p>

        </div>


        {/* =====================================================
            LOGIN FORM
        ===================================================== */}

        <div className="flex items-center justify-center p-6 sm:p-10">

          <div className="w-full max-w-md">


            {/* MOBILE BRAND */}

            <div className="mb-8 flex items-center gap-3 lg:hidden">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-content">

                <HeartPulse size={25} />

              </div>


              <div>

                <h1 className="font-bold">
                  CareSync
                </h1>

                <p className="text-xs opacity-60">
                  Remote Caregiver Telemetry
                </p>

              </div>

            </div>


            {/* HEADING */}

            <div className="mb-8">

              <h2 className="text-3xl font-bold">
                Welcome back
              </h2>

              <p className="mt-2 text-sm opacity-60">
                Sign in to continue to your dashboard.
              </p>

            </div>


            {/* ERROR */}

            {error && (

              <div className="alert alert-error mb-5 text-sm">

                <span>
                  {error}
                </span>

              </div>

            )}


            {/* SUCCESS */}

            {success && (

              <div className="alert alert-success mb-5 text-sm">

                <span>
                  {success}
                </span>

              </div>

            )}


            {/* LOGIN FORM */}

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >


              {/* EMAIL */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Email address
                </label>


                <label className="input input-bordered flex items-center gap-3">

                  <Mail
                    size={18}
                    className="opacity-50"
                  />


                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {

                      setEmail(e.target.value);
                      setError("");

                    }}
                    placeholder="you@example.com"
                    className="grow"
                  />

                </label>

              </div>


              {/* PASSWORD */}

              <div>

                <div className="mb-2 flex justify-between">

                  <label className="text-sm font-medium">
                    Password
                  </label>


                  <button
                    type="button"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </button>

                </div>


                <label className="input input-bordered flex items-center gap-3">

                  <Lock
                    size={18}
                    className="opacity-50"
                  />


                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) => {

                      setPassword(e.target.value);
                      setError("");

                    }}
                    placeholder="Enter your password"
                    className="grow"
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >

                    {showPassword ? (

                      <EyeOff size={18} />

                    ) : (

                      <Eye size={18} />

                    )}

                  </button>

                </label>


                <p className="mt-2 text-xs opacity-50">
                  Minimum 8 characters
                </p>

              </div>


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="btn btn-primary w-full"
              >

                Sign in

                <ArrowRight size={17} />

              </button>

            </form>


            {/* DIVIDER */}

            <div className="my-6 flex items-center gap-3">

              <div className="h-px flex-1 bg-base-300" />

              <span className="text-xs opacity-50">
                OR
              </span>

              <div className="h-px flex-1 bg-base-300" />

            </div>


            {/* GOOGLE LOGIN */}

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full"
            >

              <Chrome size={18} />

              Continue with Google

            </button>


            {/* REGISTER */}

            <p className="mt-6 text-center text-sm opacity-60">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-semibold text-primary hover:underline"
              >

                Register

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}