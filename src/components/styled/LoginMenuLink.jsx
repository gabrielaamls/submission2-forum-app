import { Link } from 'react-router-dom';
import styled from 'styled-components';
 
const LoginMenuLink = styled(Link)`
  padding: 8px 0;
  display: block;
  color: ${(props) => (props.$active) ? '#FFFFFF' : '#0D6EFD'}!important;
  background-color: ${(props) => (props.$active) ? '#0D6EFD' : '#D3E5FF'}!important;
`;
 
LoginMenuLink.defaultProps = {
  $active: false
}
 
export default LoginMenuLink;