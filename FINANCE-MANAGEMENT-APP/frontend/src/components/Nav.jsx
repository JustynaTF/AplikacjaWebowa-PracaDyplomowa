// rrd imports
import { Form, NavLink } from "react-router-dom";
import "../styles/styles.css";

// library
import { TrashIcon } from "@heroicons/react/24/solid";

const Nav = ({ userName }) => {
  return (
    <nav className="navbar">
      <NavLink to="/" aria-label="Go to home">
        <span className="home">HOME</span>
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="logout"
          onSubmit={(event) => {
            if (!confirm("Czy na pewno chcesz się wylogować?")) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn1">
            <span>Wyloguj użytkownika</span>
            <TrashIcon width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
};
export default Nav;
