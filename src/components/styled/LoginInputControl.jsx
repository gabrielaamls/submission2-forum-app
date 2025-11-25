import styled from 'styled-components';
 
const LoginInputControl = styled.input`
  display: block;
  width: calc(100% - 8px);
  padding: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.5;
  color: #555;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:focus {
    border-color: #66afe9;
    outline: 0;
    box-shadow: 0 0 5px rgba(100, 149, 237, 0.5);
  }
`;
 
LoginInputControl.defaultProps = {}
 
export default LoginInputControl;