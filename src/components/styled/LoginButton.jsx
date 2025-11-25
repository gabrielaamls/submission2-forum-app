import styled from "styled-components";

const LoginButton = styled.button`
  margin-right: 8px;
  display: inline-block;
  padding: 8px 16px;
  font-size: ${(props) => props.$fontSize};
  text-decoration: none;
  cursor: pointer;
  border: 1px solid ${(props) => props.$backgroundColor};
  color: ${(props) => props.$color};
  background-color: ${(props) => props.$backgroundColor};
  border-radius: ${(props) => props.$borderRadius};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.$backgroundColorHover};
  }
`;

LoginButton.defaultProps = {
  $fontSize: "14px",
  $backgroundColor: "#0D6EFD",
  $color: "#fff",
  $backgroundColorHover: "#0849A8",
  $borderRadius: "4px",
};

export default LoginButton;
