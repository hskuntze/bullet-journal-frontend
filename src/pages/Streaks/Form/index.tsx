import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { StreakType } from "types/StreakType";
import navigate from "util/navigate";
import { requestBackend } from "util/requests";
import * as theme from "util/theme";

type UrlParams = {
  streakId: string;
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

  @media (min-width: 576px) {
    width: 430px;
    height: 250px;
    margin: 25px auto;
  }

  @media (min-width: 768px) {
    width: 630px;
    height: 350px;
    margin: 25px auto;
  }
`;

const Form = () => {
  const { streakId } = useParams<UrlParams>();
  const editing = streakId !== "create";
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<StreakType>();

  const onSubmit = (streak: StreakType) => {
    const controller = new AbortController();
    if (!editing) {
      streak.count = 0;
      streak.disabled = false;
      streak.doneToday = false;
    }

    const params: AxiosRequestConfig = {
      url: editing ? `/streaks/${streakId}` : "/streaks",
      method: editing ? "PUT" : "POST",
      withCredentials: true,
      signal: controller.signal,
      data: {
        ...streak,
      },
    };

    requestBackend(params)
      .then(() => {
        toast.success("Sucesso.");
        navigate.replace("/streaks");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  useEffect(() => {
    if (editing) {
      const controller = new AbortController();
      (async () => {
        const params: AxiosRequestConfig = {
          url: `/streaks/${streakId}`,
          method: "GET",
          withCredentials: true,
          signal: controller.signal,
        };

        const data = (await requestBackend(params)).data as StreakType;
        setValue("title", data.title);
        setValue("total", data.total);
        setValue("disabled", data.disabled);
        setValue("doneToday", data.doneToday);
        setValue("count", data.count);
      })();
    }
  }, [editing, setValue, streakId]);

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate.replace("/streaks");
  };

  return (
    <FormCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center mb-3">
          {editing ? <h3>Editar Streak</h3> : <h3>Criar Streak</h3>}
        </div>
        <div className="mt-2 mb-3">
          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            {...register("title", {
              required: "Campo obrigatório",
            })}
            placeholder="Título"
          />
          <div className="invalid-feedback d-block">
            {errors.title?.message}
          </div>
        </div>
        <div className="mt-2 mb-3">
          <input
            type="text"
            className={`form-control ${errors.total ? "is-invalid" : ""}`}
            {...register("total", {
              required: "Campo obrigatório",
            })}
            placeholder="Objetivo (ex.: 40, 70, 100...)"
          />
          <div className="invalid-feedback d-block">
            {errors.total?.message}
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
