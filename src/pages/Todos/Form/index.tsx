import { AxiosRequestConfig } from "axios";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { requestBackend } from "util/requests";
import { TodoType } from "types/TodoType";
import { useEffect, useState } from "react";
import { PriorityType } from "types/PriorityType";
import styled from "styled-components";
import navigate from "util/navigate";
import * as theme from "util/theme";
import Select from "react-select";
import { StreakType } from "types/StreakType";

type UrlParams = {
  todoId: string;
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

const selectStyles = {
  option: () => ({
    color: "black",
    margin: "10px",
    padding: "5px",
  }),
};

const Form = () => {
  const { todoId } = useParams<UrlParams>();
  const editing = todoId !== "create";
  const [selectOptions] = useState<PriorityType[]>([
    { priority: "high" },
    { priority: "medium" },
    { priority: "low" }
  ]);
  const [streaks, setStreaks] = useState<StreakType[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<TodoType>();

  const onSubmit = (todo: TodoType) => {
    let json = JSON.stringify(todo.priorityAux);
    let priority = json.split(":")[1].split('"')[1];
    todo.priority = priority;
    const params: AxiosRequestConfig = {
      method: editing ? "PUT" : "POST",
      url: editing ? `/todos/${todoId}` : "/todos",
      data: {
        ...todo,
      },
      withCredentials: true,
    };

    requestBackend(params)
      .then(() => {
        toast.success("Criado com sucesso.");
        navigate.replace("/to-dos");
      })
      .catch((err) => {
        toast.error("Erro ao criar um novo to-do.");
        console.log(err);
      });
  };

  useEffect(() => {
    if (editing) {
      (async () => {
        const controller = new AbortController();
        const params: AxiosRequestConfig = {
          url: `/todos/${todoId}`,
          method: "GET",
          withCredentials: true,
          signal: controller.signal,
        };

        let data = (await requestBackend(params)).data as TodoType;
        setValue("title", data.title);
        setValue("priority", data.priority);
        setValue("streak", data.streak);
      })();
    }

    if(streaks.length === 0) {
      (async () => {
        const params: AxiosRequestConfig = {
          url: "/streaks",
          method: "GET",
          withCredentials: true
        };

        let data = (await requestBackend(params)).data.content;
        setStreaks(data);
      })();
    }
  }, [todoId, editing, setValue, streaks]);

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate.replace("/to-dos");
  };

  console.log(streaks);

  const formatPriority = (priority: string): string => {
    if (priority === "high") {
      return "Alta";
    } else if (priority === "medium") {
      return "Média";
    } else {
      return "Baixa";
    }
  };

  return (
    <FormCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center mb-3">
          {editing ? <h3>Editar To-do</h3> : <h3>Criar To-do</h3>}
        </div>
        <div className="mt-2 mb-3 my-sm-4">
          <input
            type="text"
            maxLength={60}
            placeholder="Estudar, praticar exercícios, etc."
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            {...register("title", {
              required: "Campo obrigatório",
            })}
          />
          <div className="invalid-feedback d-block">
            {errors.title?.message}
          </div>
        </div>
        <div className="mt-2 mb-3 my-sm-4">
          <Controller
            name="priorityAux"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Nível de prioridade"
                options={selectOptions}
                classNamePrefix="todo-select"
                styles={selectStyles}
                getOptionLabel={(val: PriorityType) =>
                  formatPriority(val.priority)
                }
                getOptionValue={(val: PriorityType) => val.priority}
              />
            )}
          />
        </div>
        <div className="mt-2 mb-3 my-sm-4">
          <Controller
            name="streak"
            rules={{ required: false }}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Streak"
                options={streaks}
                classNamePrefix="todo-select"
                styles={selectStyles}
                getOptionLabel={(val: StreakType) => val.title}
                getOptionValue={(val: StreakType) => val.id.toString()}
              />
            )}
          />
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
