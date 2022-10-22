import { Controller, useForm } from "react-hook-form";
import { TodoFilterContent } from "types/TodoFilterContent";
import { useState } from "react";
import { PriorityType } from "types/PriorityType";
import Select from "react-select";
import "./styles.css";

type Props = {
  onSubmitFilter: (data: TodoFilterContent) => void;
};

const TodoFilterBar = ({ onSubmitFilter }: Props) => {
  const { register, handleSubmit, control, setValue, getValues } =
    useForm<TodoFilterContent>();

  const onSubmit = (filter: TodoFilterContent) => {
    onSubmitFilter(filter);
  };

  const handleClear = () => {
    setValue("title", "");
    setValue("priority", "");
  };

  const handlePriorityChange = (value: PriorityType) => {
    setValue("priority", value.priority);
    const obj = {
      title: getValues("title"),
      priority: getValues("priority"),
    };
    onSubmitFilter(obj);
  };

  const [selectOptions] = useState<PriorityType[]>([
    { priority: "high" },
    { priority: "medium" },
    { priority: "low" },
  ]);

  const formatPriority = (priority: string): string => {
    if (priority === "high") {
      return "Alta";
    } else if (priority === "medium") {
      return "Média";
    } else {
      return "Baixa";
    }
  };

  const selectStyles = {
    option: () => ({
      color: "black",
      margin: "10px",
      padding: "5px",
    }),
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="filter-bar-form">
      <div className="filter-input-div">
        <input
          type="text"
          placeholder="Título"
          className="filter-input"
          {...register("title")}
        />
        <button type="submit" className="search-button">
          <i className="bi bi-search" />
        </button>
      </div>
      <div className="priority-filter-input">
        <Controller
          name="priorityAux"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Nível de prioridade"
              options={selectOptions}
              styles={selectStyles}
              onChange={(value) => handlePriorityChange(value as PriorityType)}
              getOptionLabel={(val: PriorityType) =>
                formatPriority(val.priority)
              }
              getOptionValue={(val: PriorityType) => val.priority}
            />
          )}
        />
      </div>
      <button onClick={handleClear} className="clear-button">
        Limpar
      </button>
    </form>
  );
};

export default TodoFilterBar;
