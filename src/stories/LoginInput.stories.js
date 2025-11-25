import LoginInput from "../components/LoginInput";

export default {
  title: "Components/LoginInput",
  component: LoginInput,
  tags: ["autodocs"],
};

export const Default = {
  args: {
    $labelEmail: "Email",
    $placeholderEmail: "email@example.com",
    $labelPassword: "Password",
    $placeholderPassword: "enter your password",
    $buttonAlign: "left",
  },
};
