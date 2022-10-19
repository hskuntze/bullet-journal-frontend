import styled from "styled-components";
import * as themes from "util/theme";
import { useContext } from "react";
import { AuthContext } from "AuthContext";
import { useForm } from "react-hook-form";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { requestBackendLogin } from "util/requests";
import { saveAuthData } from "util/storage";
import { getTokenData } from "util/auth";
import { toast } from "react-toastify";

const LoginCard = styled.div`
  background-color: ${themes.cardColor};
  color: ${themes.textColor};
  margin: 15px 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
  padding-bottom: 10px;
`;

const LoginBtn = styled.button.attrs(() => ({
  type: "submit",
}))`
  width: 90px;
  height: 40px;
  border-radius: 8px;
  background-color: ${themes.buttonBackgroundColor};
`;

const RegisterBtn = styled(LoginBtn)`
  background-color: #067760;
`;

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const { setAuthContextData } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((res) => {
        saveAuthData(res.data);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        navigate("/");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <LoginCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-3">
          <input
            type="text"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            placeholder="Username"
            {...register("username", {
              required: "Obrigatório",
            })}
          />
          <div className="invalid-feedback d-block">
            {errors.username?.message}
          </div>
        </div>
        <div className="my-3">
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Password"
            {...register("password", {
              required: "Obrigatório",
            })}
          />
          <div className="invalid-feedback d-block">
            {errors.password?.message}
          </div>
        </div>
        <div className="d-flex flex-row-reverse justify-content-around">
          <LoginBtn>Login</LoginBtn>
          <Link to="/auth/register">
            <RegisterBtn>Registrar</RegisterBtn>
          </Link>
        </div>
      </form>
    </LoginCard>
  );
};

export default Login;
