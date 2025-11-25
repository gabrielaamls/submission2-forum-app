import styled from 'styled-components';
 
const LoginMenu = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  margin-bottom: ${(props) => props.$marginBottom};
`;
 
LoginMenu.defaultProps = {
  $marginBottom: '30px'
}
 
export default LoginMenu;