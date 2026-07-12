export interface PasswordStrength {
  score: number;
  label: string;

  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialCharacter: boolean;
}

export const checkPasswordStrength = (
  password: string,
): PasswordStrength => {
  const hasMinLength = password.length >= 8;

  const hasUppercase = /[A-Z]/.test(password);

  const hasLowercase = /[a-z]/.test(password);

  const hasNumber = /\d/.test(password);

  const hasSpecialCharacter =
    /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const score = [
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialCharacter,
  ].filter(Boolean).length;

  const label =
    score <= 2
      ? "Weak"
      : score <= 4
      ? "Medium"
      : "Strong";

  return {
    score,
    label,
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialCharacter,
  };
};