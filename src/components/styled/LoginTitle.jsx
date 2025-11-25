import styled from 'styled-components';
 
const LoginTitle = styled.h1`
  font-size: ${(props) => props.$fontSize};
  padding-top: ${(props) => props.$paddingTop};
  text-align: ${(props) => props.$textAlign};
`;
 
LoginTitle.defaultProps = {
  $fontSize: '28px',
  $paddingTop: '20px',
  $textAlign: 'center'
}
 
export default LoginTitle;