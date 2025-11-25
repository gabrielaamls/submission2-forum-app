import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import LoginInputGroup from "./styled/LoginInputGroup";
import LoginInputLabel from "./styled/LoginInputLabel";
import LoginInputControl from "./styled/LoginInputControl";
import LoginButton from "./styled/LoginButton";
import { Fragment } from "react";

function LoginInput({
  login,
  $labelEmail,
  $placeholderEmail,
  $labelPassword,
  $placeholderPassword,
  $buttonAlign,
}) {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  return (
    <Fragment>
      <LoginInputGroup>
        <LoginInputLabel htmlFor="inputEmail">{$labelEmail}</LoginInputLabel>
        <LoginInputControl
          type="email"
          id="inputEmail"
          value={email}
          onChange={onEmailChange}
          placeholder={$placeholderEmail}
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
          onChange={onPasswordChange}
          placeholder={$placeholderPassword}
        />
      </LoginInputGroup>

      <LoginInputGroup $textAlign={$buttonAlign}>
        <LoginButton type="button" onClick={() => login({ email, password })}>
          Login
        </LoginButton>
      </LoginInputGroup>
    </Fragment>
  );
}

LoginInput.propTypes = {
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
   * Fungsi untuk login
   */
  login: PropTypes.func.isRequired,
};

LoginInput.defaultProps = {
  $labelEmail: "Email",
  $placeholderEmail: "email@example.com",
  $labelPassword: "Password",
  $placeholderPassword: "enter your password",
  $buttonAlign: "right",
};

export default LoginInput;
