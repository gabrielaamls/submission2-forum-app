import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import RegisterInput from "../components/RegisterInput";
import { asyncRegisterUser } from "../states/users/action";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate("/");
  };

  return <RegisterInput register={onRegister} />;
}

export default RegisterPage;
