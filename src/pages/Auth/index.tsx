import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import "./styles.css";

const Auth = () => {
    return(
        <div>
            <Routes>
                <Route path="" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default Auth;