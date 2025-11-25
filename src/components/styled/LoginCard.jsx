import styled from 'styled-components';
 
const LoginCard = styled.div`
  background-color: ${(props) => props.$backgroundColor};
  max-width: ${(props) => props.$maxWidth};
  margin: 0 auto;
  padding-bottom: ${(props) => props.$paddingBottom};
`;
 
LoginCard.defaultProps = {
  $backgroundColor: '#fff',
  $maxWidth: '400px',
  $paddingBottom: '15px'
}
 
export default LoginCard;