// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

// components
import Nav from "../components/Nav";

//  helper functions
import { fetchData } from "../helpers";
import Footer from "../components/Footer";

// loader
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Main = () => {
  const { userName } = useLoaderData();

  return (
    <div className="layout">
      <main>
        <Nav userName={userName} />
        <Outlet />
      </main>
    </div>
  );
};
export default Main;
