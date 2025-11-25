import styled from 'styled-components';
 
const LoginInputLabel = styled.label`
  display: block;
  font-size: ${(props) => props.$fontSize};
  margin-bottom: ${(props) => props.$marginBottom};
`;
 
LoginInputLabel.defaultProps = {
  $fontSize: '14px',
  $marginBottom: '0px',
}
 
export default LoginInputLabel;