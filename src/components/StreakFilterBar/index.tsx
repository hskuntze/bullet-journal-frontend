import { useForm } from "react-hook-form";
import { StreakFilterContent } from "types/StreakFilterContent";

type Props = {
  onSubmitFilter: (data: StreakFilterContent) => void;
};

const StreakFilterBar = ({ onSubmitFilter }: Props) => {
  const { register, handleSubmit, setValue } =
    useForm<StreakFilterContent>();

  const onSubmit = (filter: StreakFilterContent) => {
    onSubmitFilter(filter);
  };

  const handleClear = () => {
    setValue("title", "");
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
      <button onClick={handleClear} className="clear-button">
        Limpar
      </button>
    </form>
  );
};

export default StreakFilterBar;
