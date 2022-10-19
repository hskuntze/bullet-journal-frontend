import "./assets/styles/custom.scss";
import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Routes from "Routes";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { AuthContext, AuthContextData } from "AuthContext";

function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    <AuthContext.Provider value={{authContextData, setAuthContextData}}>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}

export default App;
