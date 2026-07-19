interface ValidateCategoryProps {
  name: string;
  icon: string;
}

export const validateCategory = ({ name, icon }: ValidateCategoryProps) => {
  if (!name.trim()) {
    return {
      valid: false,
      message: "Category name is required.",
    };
  }

  if (name.trim().length < 3) {
    return {
      valid: false,
      message: "Category name must be at least 3 characters.",
    };
  }

  if (!icon) {
    return {
      valid: false,
      message: "Please select a category icon.",
    };
  }

  return {
    valid: true,
    message: "",
  };
};
