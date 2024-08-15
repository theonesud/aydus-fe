import { Bounce, ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "react-toastify/dist/ReactToastify.css";
import Notify from "./Notify";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar component */}
      {/* <Navbar/> */}

      <div className="w-64">
        <Sidebar />
      </div>

      {/* Main content area where children components are rendered */}
      <div className="flex flex-1 flex-col overflow-y-auto px-16">
        <Notify />

        {children}
      </div>
    </div>
  );
}
