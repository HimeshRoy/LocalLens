import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";
import { useCheckUsername } from "../hooks/useCheckUsername";
import { useCheckEmail } from "../hooks/useCheckEmail";
import { checkPasswordStrength } from "../utils/passwordStrength";
import { useRegister } from "../hooks/useRegister";
import { validateRegister } from "../utils/registerValidation";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const debouncedUsername = useDebounce(username);
  const debouncedEmail = useDebounce(email);
  const usernameCheck = useCheckUsername(debouncedUsername);
  const emailCheck = useCheckEmail(debouncedEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordStrength = checkPasswordStrength(password);
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;
  const register = useRegister();
  const navigate = useNavigate();

  const handleRegister = () => {
    const validation = validateRegister({
      fullName,
      username,
      email,
      password,
      confirmPassword,
      usernameAvailable: usernameCheck.data?.data.available ?? false,
      emailAvailable: emailCheck.data?.data.available ?? false,
    });

    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }

    register.mutate(
      {
        fullName,
        username,
        email,
        password,
      },
      {
        onSuccess: () => {
          navigate("/", {
            replace: true,
          });
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-20">
      <ToastContainer className={"p-6"} />
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6">
        <div className="pt-10 flex-col justify-center text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Join
          </span>

          <h1 className="text-5xl font-extrabold leading-tight text-blue-700">
            <a href="/">
            LocalLens
            </a>
          </h1>

          <p className="mt-3 max-w-sm text-base leading-7 text-zinc-600">
            Share amazing places, help your community and discover hidden gems
            around you.
          </p>
        </div>

        <div className="clay mt-8 rounded-[32px] p-8">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Create Account
          </span>

          <div className="mt-3">
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-base outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
          <div className="mt-3">
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a unique username"
              className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-base outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            {username.trim().length >= 3 && (
              <div className="mt-2">
                {usernameCheck.isPending ? (
                  <p className="text-sm text-zinc-500">Checking username...</p>
                ) : usernameCheck.data?.data.available ? (
                  <p className="text-sm font-medium text-green-600">
                    Username available
                  </p>
                ) : (
                  <p className="text-sm font-medium text-red-600">
                    Username already taken
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="mt-3">
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-base outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            {email.trim().length > 5 && (
              <div className="mt-2">
                {emailCheck.isPending ? (
                  <p className="text-sm text-zinc-500">
                    <></>
                  </p>
                ) : emailCheck.data?.data.available ? (
                  <></>
                ) : (
                  <p className="text-sm font-medium text-red-600">
                    Email already registered
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="mt-3">
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Password
            </label>

            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
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
            <div className="mt-3">
              {/* Progress Bar */}
              <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
                <div
                  className={`h-full transition-all duration-300 ${
                    passwordStrength.score <= 2
                      ? "w-2/5 bg-red-500"
                      : passwordStrength.score <= 4
                        ? "w-4/5 bg-yellow-500"
                        : "w-full bg-green-500"
                  }`}
                />
              </div>

              <p className="text-sm font-medium text-zinc-700">
                {passwordStrength.label} Password
              </p>

              <div className="mt-3 space-y-1 text-sm">
                <p
                  className={
                    passwordStrength.hasMinLength
                      ? "text-green-600"
                      : "text-zinc-500"
                  }
                >
                  {passwordStrength.hasMinLength ? "✓" : "○"} At least 8
                  characters
                </p>

                <p
                  className={
                    passwordStrength.hasUppercase
                      ? "text-green-600"
                      : "text-zinc-500"
                  }
                >
                  {passwordStrength.hasUppercase ? "✓" : "○"} One uppercase
                  letter
                </p>

                <p
                  className={
                    passwordStrength.hasLowercase
                      ? "text-green-600"
                      : "text-zinc-500"
                  }
                >
                  {passwordStrength.hasLowercase ? "✓" : "○"} One lowercase
                  letter
                </p>

                <p
                  className={
                    passwordStrength.hasNumber
                      ? "text-green-600"
                      : "text-zinc-500"
                  }
                >
                  {passwordStrength.hasNumber ? "✓" : "○"} One number
                </p>

                <p
                  className={
                    passwordStrength.hasSpecialCharacter
                      ? "text-green-600"
                      : "text-zinc-500"
                  }
                >
                  {passwordStrength.hasSpecialCharacter ? "✓" : "○"} One special
                  character
                </p>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Confirm Password
            </label>

            <div className="relative">
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-4 pr-14 text-base outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-blue-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {confirmPassword.length > 0 && (
              <div className="mt-2">
                {passwordsMatch ? (
                  <p className="text-sm font-medium text-green-600">
                    ✓ Passwords match
                  </p>
                ) : (
                  <p className="text-sm font-medium text-red-600">
                    ✗ Passwords do not match
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={handleRegister}
          disabled={register.isPending}
          className="mt-5 h-14 w-full rounded-2xl bg-blue-600 text-base font-semibold text-white transition hover:bg-blue-700"
        >
          {register.isPending ? "Creating Account..." : "Create Account"}
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
