import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="navbar navbar-dark bg-dark">

      <div className="container">

        <Link
          className="navbar-brand"
          to="/"
        >
          Task Manager
        </Link>

        <div>

          <Link
            className="btn btn-outline-light me-2"
            to="/"
          >
            Home
          </Link>

          <Link
            className="btn btn-outline-light"
            to="/tasks"
          >
            Task List
          </Link>

        </div>

      </div>

    </nav>

  );
}

export default Navbar;