import { AuthProvider } from "../Provider/AuthProvider";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Page from "./Page";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <Page />
      </AuthProvider>
    </>
  );
}

export default App;
