import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom"; 

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />  {/* This will render the child page component */}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
