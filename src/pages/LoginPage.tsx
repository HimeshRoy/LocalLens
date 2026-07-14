import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = () => {
    if (!identifier.trim() || !password.trim()) {
      return;
    }

    login.mutate(
      {
        identifier,
        password,
      },
      {
        onSuccess: (response) => {
          switch (response.data.user.role) {
            case "ADMIN":
              navigate("/admin/dashboard", {
                replace: true,
              });
              break;

            case "BUSINESS":
              navigate("/business", {
                replace: true,
              });
              break;

            default:
              navigate(from, {
                replace: true,
              });
          }
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-12">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6">
        <div className="pt-10 flex-col justify-center text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 text-center">
            Explore
          </span>

          <h1 className="text-5xl font-extrabold leading-tight text-blue-700 text-center">
            <a href="/">LocalLens</a>
          </h1>

          <p className="mt-3 max-w-sm text-base leading-7 text-zinc-600 text-center">
            Discover hidden cafés, restaurants, parks and local gems shared by
            people around you.
          </p>
        </div>

        <div className="clay mt-8 rounded-4xl p-8">
          <h2 className="text-2xl font-bold text-zinc-900 text-center">
            Sign in
          </h2>

          <div className="mt-8">
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Email or Username
            </label>

            <input
              autoFocus
              type="text"
              value={identifier}
              disabled={login.isPending}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter your email or username"
              className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-base outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
          <div className="mt-3">
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                disabled={login.isPending}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-4 pr-14 text-base outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-blue-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
              Forgot Password?
            </button>
          </div>

          {login.errorMessage && (
            <div className="mt-3">
              <p className="text-sm font-medium text-red-500 text-center">
                {login.errorMessage}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={handleLogin}
            disabled={login.isPending}
            className="mt-5 h-14 w-full rounded-2xl bg-blue-600 text-base font-semibold text-white transition hover:bg-blue-700"
          >
            {login.isPending ? "Signing In..." : "Sign In"}
          </button>
          <div className="mt-5 text-center text-sm text-zinc-600">
            Don't have an account? <br />
            <Link
              to="/signup"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
