import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

function Navigation({ authUser, signOut }) {
  const { id, avatar, name } = authUser;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Forum App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navApp"
            aria-controls="navApp"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navApp">
            <ul className="navbar-nav ms-auto ">
              <li className="mt-2">
                <Link
                  className="btn btn-light btn-sm text-dark"
                  to="/threads/add"
                >
                  <FaPlus /> Buat Thread
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link mx-2 dropdown-toggle"
                  href="#"
                  id="navUser"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    className="nav-profile"
                    src={avatar}
                    alt={id}
                    title={name}
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navUser"
                >
                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={signOut}
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
