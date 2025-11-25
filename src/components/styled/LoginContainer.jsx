import styled from 'styled-components';
 
const LoginContainer = styled.div`
  margin-top: ${(props) => props.$marginTop};
`;
 
LoginContainer.defaultProps = {
  $marginTop: '50px',
}
 
export default LoginContainer;