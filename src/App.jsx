import { useEffect, Fragment } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./components/Loading";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { asyncPreloadProcess } from "./states/isPreload/action";
import Navigation from "./components/Navigation";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import HomePage from "./pages/HomePage";
import AddThreadPage from "./pages/AddThreadPage";
import DetailPage from "./pages/DetailPage.jsx";
import LoginContainer from "./components/styled/LoginContainer";
import LoginCard from "./components/styled/LoginCard";
import LoginTitle from "./components/styled/LoginTitle";
import LoginMenu from "./components/styled/LoginMenu";
import LoginMenuItem from "./components/styled/LoginMenuItem";
import LoginMenuLink from "./components/styled/LoginMenuLink";

function App() {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states
  );

  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    const activeRegister = location.pathname === "/register";
    const activeLogin = location.pathname !== "/register";

    return (
      <Fragment>
        <Loading />
        <LoginContainer>
          <LoginCard>
            <LoginTitle>Forum App</LoginTitle>
            <LoginMenu>
              <LoginMenuItem>
                <LoginMenuLink $active={activeLogin} to="/">
                  Login
                </LoginMenuLink>
              </LoginMenuItem>
              <LoginMenuItem>
                <LoginMenuLink $active={activeRegister} to="/register">
                  Register
                </LoginMenuLink>
              </LoginMenuItem>
            </LoginMenu>

            <Routes>
              <Route path="/*" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </LoginCard>
        </LoginContainer>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div>
        <header className="fixed-top">
          <Navigation authUser={authUser} signOut={onSignOut} />
          <Loading />
        </header>
        <main className="margin-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/category/:category" element={<HomePage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/threads/add" element={<AddThreadPage />} />
          </Routes>
        </main>
      </div>
    </Fragment>
  );
}

export default App;
