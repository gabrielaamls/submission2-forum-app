import styled from 'styled-components';
 
const LoginMenu = styled.div`
  width: ${(props) => props.$width};
  margin: 20px auto;
  margin-top: ${(props) => props.$marginTop};
  text-align: ${(props) => props.$textAlign};
`;
 
LoginMenu.defaultProps = {
  $width: '80%',
  $marginTop: '0px',
  $textAlign: 'left'
}
 
export default LoginMenu;