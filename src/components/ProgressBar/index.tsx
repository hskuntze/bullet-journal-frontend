import { AxiosRequestConfig } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StreakType } from "types/StreakType";
import { requestBackend } from "util/requests";
import styled from "styled-components";
import * as theme from "util/theme";

type Props = {
  streak: StreakType;
};

const ProgressCard = styled.div`
  width: 280px;
  min-height: 135px;
  background-color: ${theme.cardColor};
  border-radius: 4px;

  & progress[value] {
    width: 250px;
    height: 20px;
    border: unset;
    -webkit-appearance: none;
    appearance: none;
    border-radius: 5px;
    background-color: ${theme.progressBarBackgroundColor};
  }

  & progress[value]::-webkit-progress-bar {
    border: unset;
    border-radius: 5px;
    background-color: ${theme.progressBarColor};
  }

  & progress[value]::-webkit-progress-value {
    border: unset;
    border-radius: 5px;
  }

  & progress[value]::-moz-progress-bar {
    border: unset;
    border-radius: 5px;
    background-color: ${theme.progressBarColor};
  }

  & progress[value]::-moz-progress-value {
    border: unset;
    border-radius: 5px;
  }

  & .streak-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & .date-span {
    font-weight: 300;
    font-size: 13px;
  }
`;

const ProgressBar = ({ streak }: Props) => {
  const navigate = useNavigate();

  const handleDeletion = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let ok = window.confirm("Você tem certeza que quer deletar este streak?");
    if (ok) {
      const params: AxiosRequestConfig = {
        url: `streaks/${streak.id}`,
        withCredentials: true,
        method: "DELETE",
      };

      requestBackend(params)
        .then(() => {
          toast.success("Deletado com sucesso.");
          navigate(0);
        })
        .catch(() => {
          toast.error("Erro ao deletar, tente novamente.");
        });
    }
  };

  const formatDate = (streak: StreakType): string => {
    if (streak.createdAt !== null) {
      let aux = streak.createdAt;
      let ix = aux.indexOf("T");
      let date = aux.substring(0, ix);
      let fields = date.split("-");
      return fields[2]+"/"+fields[1]+"/"+fields[0];
    }
    return "";
  };

  return (
    <ProgressCard>
      <div className="d-flex flex-row-reverse align-items-center justify-content-between up-title">
        <button onClick={handleDeletion} className="up-title-button">
          <i className="bi bi-trash3" style={{ color: "indianred" }} />
        </button>
        <label htmlFor={"progress-streak-" + streak.id}>
          {streak.createdAt && <span className="date-span">{formatDate(streak)}</span>}
        </label>
        <Link to={`/streaks/${streak.id}`} className="up-title-button">
          <i className="bi bi-pencil-fill" style={{ color: "gold" }} />
        </Link>
      </div>
      <div className="streak-div">
        <label htmlFor={"progress-streak-" + streak.id} className="mb-1">
          {streak.title}
        </label>
        <progress
          id={"progress-streak-" + streak.id}
          value={streak.count}
          max={streak.totalPerLabel}
        />
        <div className="mt-2 d-flex justify-content-center">
          <span>{((streak.count / streak.totalPerLabel) * 100).toFixed(2)}%</span>
          <span className="ms-1">
            ({streak.count}/{streak.totalPerLabel}) 
          </span>
        </div>
        <span>{streak.total} {streak.label}</span>
      </div>
    </ProgressCard>
  );
};

export default ProgressBar;
