import RegisterInput from "../components/RegisterInput";

export default {
  title: "Components/RegisterInput",
  component: RegisterInput,
  tags: ["autodocs"],
};

export const Default = {
  args: {
    $labelName: "Full Name",
    $placeholderName: "enter your full name",
    $labelEmail: "Email",
    $placeholderEmail: "email@example.com",
    $labelPassword: "Password",
    $placeholderPassword: "enter your password",
  },
};
