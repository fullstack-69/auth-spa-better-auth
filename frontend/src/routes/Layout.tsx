import { type FC } from "react";
import { Outlet } from "react-router";
import Nav from "../components/Nav";
import useAuth from "../hooks/useAuth";
const Layout: FC = () => {
  useAuth();

  return (
    <div className="container">
      <header style={{ padding: "1rem 0" }}>
        <Nav />
      </header>
      <main style={{ padding: "1rem 0" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
