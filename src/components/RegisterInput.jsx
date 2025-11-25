import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import LoginInputGroup from "./styled/LoginInputGroup";
import LoginInputLabel from "./styled/LoginInputLabel";
import LoginInputControl from "./styled/LoginInputControl";
import LoginButton from "./styled/LoginButton";
import { Fragment } from "react";

function RegisterInput({
  $labelName,
  $placeholderName,
  $labelEmail,
  $placeholderEmail,
  $labelPassword,
  $placeholderPassword,
  $buttonAlign,
  register,
}) {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  return (
    <Fragment>
      <LoginInputGroup>
        <LoginInputLabel htmlFor="inputName">{$labelName}</LoginInputLabel>
        <LoginInputControl
          type="text"
          id="inputName"
          placeholder={$placeholderName}
          value={name}
          onChange={onNameChange}
        />
      </LoginInputGroup>
      <LoginInputGroup>
        <LoginInputLabel htmlFor="inputEmail">{$labelEmail}</LoginInputLabel>
        <LoginInputControl
          type="email"
          id="inputEmail"
          value={email}
          placeholder={$placeholderEmail}
          onChange={onEmailChange}
        />
      </LoginInputGroup>
      <LoginInputGroup>
        <LoginInputLabel htmlFor="inputPassword">
          {$labelPassword}
        </LoginInputLabel>
        <LoginInputControl
          type="password"
          id="inputPassword"
          value={password}
          placeholder={$placeholderPassword}
          onChange={onPasswordChange}
        />
      </LoginInputGroup>
      <LoginInputGroup $textAlign={$buttonAlign}>
        <LoginButton
          type="button"
          onClick={() => register({ name, email, password })}
        >
          Register
        </LoginButton>
      </LoginInputGroup>
    </Fragment>
  );
}

RegisterInput.propTypes = {
  /**
   * Mengubah label name
   */
  $labelName: PropTypes.string,
  /**
   * Mengubah placeholder name
   */
  $placeholderName: PropTypes.string,
  /**
   * Mengubah label email
   */
  $labelEmail: PropTypes.string,
  /**
   * Mengubah placeholder email
   */
  $placeholderEmail: PropTypes.string,
  /**
   * Mengubah label password
   */
  $labelPassword: PropTypes.string,
  /**
   * Mengubah placeholder password
   */
  $placeholderPassword: PropTypes.string,
  /**
   * Mengubah posisi tombol
   */
  $buttonAlign: PropTypes.oneOf(["left", "center", "right"]),
  /**
   * Fungsi untuk register
   */
  register: PropTypes.func.isRequired,
};

RegisterInput.defaultProps = {
  $labelName: "Full Name",
  $placeholderName: "enter your full name",
  $labelEmail: "Email",
  $placeholderEmail: "email@example.com",
  $labelPassword: "Password",
  $placeholderPassword: "enter your password",
  $buttonAlign: "right",
};

export default RegisterInput;
