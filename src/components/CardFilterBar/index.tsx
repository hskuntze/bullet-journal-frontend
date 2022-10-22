import { useForm } from "react-hook-form";
import { CardFilterContent } from "types/CardFilterContent";

type Props = {
  onSubmitFilter: (data: CardFilterContent) => void;
};

const CardFilterBar = ({ onSubmitFilter }: Props) => {
  const { register, handleSubmit, setValue } =
    useForm<CardFilterContent>();

  const onSubmit = (filter: CardFilterContent) => {
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

export default CardFilterBar;
