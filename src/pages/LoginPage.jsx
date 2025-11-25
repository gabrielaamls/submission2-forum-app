import { useDispatch } from "react-redux";
import LoginInput from "../components/LoginInput";
import { asyncSetAuthUser } from "../states/authUser/action";

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return <LoginInput login={onLogin} />;
}

export default LoginPage;
