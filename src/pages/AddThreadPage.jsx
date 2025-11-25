import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import { asyncAddThread } from "../states/threads/action";
import ThreadInput from "../components/ThreadInput";
import { useNavigate } from "react-router-dom";

function AddThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
    navigate("/");
  };

  return <ThreadInput onAddThread={onAddThread} />;
}

export default AddThreadPage;
