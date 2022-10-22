import { AxiosRequestConfig } from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { requestBackend } from "util/requests";
import { CardType } from "types/CardType";
import { useEffect } from "react";
import styled from "styled-components";
import navigate from "util/navigate";
import * as theme from "util/theme";

type UrlParams = {
  cardId: string;
};

const FormCard = styled.div`
  width: 280px;
  height: auto;
  background-color: ${theme.cardColor};
  border-radius: 5px;
  padding: 10px;
  margin: 15px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 576px){
    width: 430px;
    height: 250px;
    margin: 25px auto;
  }

  @media (min-width: 768px){
    width: 630px;
    height: 350px;
    margin: 25px auto;
  }
`;

const Form = () => {
  const { cardId } = useParams<UrlParams>();
  const editing = cardId !== "create";
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CardType>();

  const onSubmit = (card: CardType) => {
    const params: AxiosRequestConfig = {
      method: editing ? "PUT" : "POST",
      url: editing ? `/cards/${cardId}` : "/cards",
      data: {
        ...card,
      },
      withCredentials: true,
    };

    requestBackend(params)
      .then(() => {
        toast.success("Sucesso.");
        navigate.replace("/cards");
      })
      .catch((err) => {
        toast.error("Erro: " + err);
      });
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate.replace("/cards");
  };

  useEffect(() => {
    if (editing) {
      const controller = new AbortController();
      (async () => {
        const params: AxiosRequestConfig = {
          url: `/cards/${cardId}`,
          withCredentials: true,
          signal: controller.signal,
          method: "GET",
        };

        const data = (await requestBackend(params)).data as CardType;
        setValue("title", data.title);
        setValue("description", data.description);
      })();
    }
  }, [editing, cardId, setValue]);

  const dataAtual = (): string => {
    var data = new Date();
    var mes = (data.getMonth() + 1).toString();
    var dia = data.getDate().toString();
    if (data.getMonth() + 1 <= 9) {
      mes = "0" + data.getMonth();
    }
    return dia + "/" + mes;
  };

  return (
    <FormCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center mb-3">
          {editing ? <h3>Editar Card</h3> : <h3>Criar Card</h3>}
        </div>
        <div className="mt-2 mb-3">
          <input
            type="text"
            placeholder={"Dia " + dataAtual()}
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            {...register("title", {
              required: "Campo obrigatório",
            })}
          />
          <div className="invalid-feedback d-block">
            {errors.title?.message}
          </div>
        </div>
        <div className="mt-2 mb-3">
          <textarea
            rows={3}
            placeholder="Descrição"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            {...register("description", {
              required: "Campo obrigatório",
            })}
          />
          <div className="invalid-feedback d-block">
            {errors.description?.message}
          </div>
        </div>
        <div className="mt-2 d-flex justify-content-around">
          <button
            className="btn btn-danger"
            type="submit"
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button className="btn btn-dark" type="submit">
            Salvar
          </button>
        </div>
      </form>
    </FormCard>
  );
};

export default Form;
