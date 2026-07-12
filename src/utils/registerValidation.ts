import { checkPasswordStrength } from "./passwordStrength";

interface RegisterValidationProps {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  usernameAvailable: boolean;
  emailAvailable: boolean;
}

export const validateRegister = ({
  fullName,
  username,
  email,
  password,
  confirmPassword,
  usernameAvailable,
  emailAvailable,
}: RegisterValidationProps) => {
  const passwordStrength = checkPasswordStrength(password);

  if (fullName.trim().length < 3) {
    return {
      valid: false,
      message: "Please enter your full name.",
    };
  }

  if (username.trim().length < 3) {
    return {
      valid: false,
      message: "Username must be at least 3 characters.",
    };
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      valid: false,
      message: "Please enter a valid email address.",
    };
  }

  if (!usernameAvailable) {
    return {
      valid: false,
      message: "Username is already taken.",
    };
  }

  if (!emailAvailable) {
    return {
      valid: false,
      message: "Email is already registered.",
    };
  }

  if (passwordStrength.score < 5) {
    return {
      valid: false,
      message:
        "Please choose a stronger password.",
    };
  }

  if (password !== confirmPassword) {
    return {
      valid: false,
      message: "Passwords do not match.",
    };
  }

  return {
    valid: true,
    message: "",
  };
};