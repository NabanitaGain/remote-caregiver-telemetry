import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  HeartPulse,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Chrome,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();

  const { register, googleLogin } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [terms, setTerms] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const validate = () => {
    if (!form.name.trim()) {
      return "Full name is required.";
    }

    if (form.name.trim().length < 3) {
      return "Name must be at least 3 characters.";
    }

    if (!form.email.trim()) {
      return "Email is required.";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return "Please enter a valid email address.";
    }

    if (!form.password) {
      return "Password is required.";
    }

    if (form.password.length < 8) {
      return "Password must be at least 8 characters.";
    }

    if (!/[A-Z]/.test(form.password)) {
      return "Password must contain an uppercase letter.";
    }

    if (!/[0-9]/.test(form.password)) {
      return "Password must contain a number.";
    }

    if (form.password !== form.confirmPassword) {
      return "Passwords do not match.";
    }

    if (!terms) {
      return "Please accept the Terms & Conditions.";
    }

    return "";
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setError("");

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    const result = register({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/login");
  };

  const handleGoogleRegister = () => {
    googleLogin();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-base-200/50">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* BRAND */}

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

          <div>

            <h2 className="text-4xl font-bold">
              Create your account.
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-6 opacity-80">
              Join CareSync and manage your remote
              patient monitoring dashboard.
            </p>

          </div>

          <p className="text-xs opacity-60">
            © 2026 CareSync
          </p>

        </div>


        {/* REGISTER */}

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


            <div className="mb-7">

              <h2 className="text-3xl font-bold">
                Create your account
              </h2>

              <p className="mt-2 text-sm opacity-60">
                Register to access the caregiver dashboard.
              </p>

            </div>


            {/* ERROR */}

            {error && (
              <div className="alert alert-error mb-5 text-sm">
                <span>{error}</span>
              </div>
            )}


            <form
              onSubmit={handleRegister}
              className="space-y-4"
            >

              {/* NAME */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Full name
                </label>

                <label className="input input-bordered flex items-center gap-3">

                  <User
                    size={18}
                    className="opacity-50"
                  />

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Emma Carter"
                    className="grow"
                  />

                </label>

              </div>


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
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="grow"
                  />

                </label>

              </div>


              {/* PASSWORD */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Password
                </label>

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
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create password"
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
                  8+ characters · 1 uppercase · 1 number
                </p>

              </div>


              {/* CONFIRM */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Confirm password
                </label>

                <label className="input input-bordered flex items-center gap-3">

                  <Lock
                    size={18}
                    className="opacity-50"
                  />

                  <input
                    type={
                      showConfirm
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="grow"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirm(!showConfirm)
                    }
                  >
                    {showConfirm ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </label>

              </div>


              {/* TERMS */}

              <label className="flex items-start gap-3 py-2 text-sm">

                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary mt-0.5"
                  checked={terms}
                  onChange={(e) =>
                    setTerms(e.target.checked)
                  }
                />

                <span>
                  I agree to the Terms & Conditions
                  and Privacy Policy.
                </span>

              </label>


              {/* REGISTER */}

              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                Create account
                <ArrowRight size={17} />
              </button>

            </form>


            {/* DIVIDER */}

            <div className="my-5 flex items-center gap-3">

              <div className="h-px flex-1 bg-base-300" />

              <span className="text-xs opacity-50">
                OR
              </span>

              <div className="h-px flex-1 bg-base-300" />

            </div>


            {/* GOOGLE */}

            <button
              type="button"
              onClick={handleGoogleRegister}
              className="btn btn-outline w-full"
            >
              <Chrome size={18} />
              Sign up with Google
            </button>


            {/* LOGIN */}

            <p className="mt-6 text-center text-sm opacity-60">

              Already have an account?{" "}

              <Link
                to="/login"
                className="font-semibold text-primary hover:underline"
              >
                Sign in
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}