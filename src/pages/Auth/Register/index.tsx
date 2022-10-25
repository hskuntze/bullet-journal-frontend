import { AxiosRequestConfig } from "axios";
import BtnLoader from "components/BtnLoader";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import navigate from "util/navigate";
import { requestBackend } from "util/requests";
import * as themes from "util/theme";
import "./styles.css";

type FormData = {
  username: string;
  email: string;
  password: string;
};

const Card = styled.div`
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

const Btn = styled.button.attrs(() => ({
  type: "submit",
}))`
  width: 90px;
  height: 40px;
  border-radius: 8px;
  background-color: ${themes.buttonBackgroundColor};
`;

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    const controller = new AbortController();
    const params: AxiosRequestConfig = {
      url: "/users",
      method: "POST",
      signal: controller.signal,
      data: {
        ...formData,
        roles: [{ id: 1 }],
      },
    };
    setIsLoading(true);
    requestBackend(params)
      .then(() => {
        toast.success("Cadastro criado com sucesso.");
        navigate.replace("/auth");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate.replace("/auth");
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-3">
          <input
            type="text"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            placeholder="Nome de usuário"
            {...register("username", {
              required: "Campo obrigatório",
            })}
          />
          <div className="invalid-feedback d-block">
            {errors.username?.message}
          </div>
        </div>
        <div className="my-3">
          <input
            type="text"
            className={`form-control base-input ${
              errors.email ? "is-invalid" : ""
            }`}
            placeholder="Email"
            {...register("email", {
              required: "Campo obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
          />
          <div className="invalid-feedback d-block">
            {errors.email?.message}
          </div>
        </div>
        <div className="my-3">
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Senha"
            {...register("password", {
              required: "Obrigatório",
            })}
          />
          <div className="invalid-feedback d-block">
            {errors.password?.message}
          </div>
        </div>
        {isLoading ? (
          <div className="d-flex flex-row-reverse">
            <BtnLoader />
          </div>
        ) : (
          <div className="d-flex flex-row-reverse justify-content-around">
            <Btn>Cadastrar</Btn>
            <button className="btn btn-danger" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        )}
      </form>
    </Card>
  );
};

export default Register;
