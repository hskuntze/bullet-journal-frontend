import { AxiosRequestConfig } from "axios";
import styled, { keyframes } from "styled-components";
import { TodoType } from "types/TodoType";
import { requestBackend } from "util/requests";
import { useState } from "react";
import { toast } from "react-toastify";
import { Howl } from "howler";
import CheckSound from "assets/audios/todo-done.mp3";
import * as themes from "util/theme";
import "./styles.css";

const enter = keyframes`
    0% {
      opactity: 1;
    }
    25% {
      opacity: 0.75;
    }
    50% {
      opacity: 0.5;
    }
    75% {
      opacity: 0.25;
    }
    100% {
      opacity: 0;
      display: none;
    }
`;

const TodoComponent = styled.div<AnimateProps>`
  width: 250px;
  min-height: 50px !important;
  background-color: ${themes.cardColor};
  margin: 10px 0;
  padding: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 2px;
  animation: ${(props) => (props.animate ? enter : "")} 1.3s linear forwards;
  position: relative;

  &:hover {
    height: auto;
  }

  @media (min-width: 576px) {
    width: 400px;
    padding: 5px 15px;
  }

  @media (min-width: 768px) {
    width: 700px;
    padding: 5px 25px;
  }

  & .date-span {
    font-weight: 300;
    font-size: 13px;
  }
`;

type Props = {
  item: TodoType;
};

interface AnimateProps {
  animate: boolean;
}

const Todo = ({ item }: Props) => {
  const [toggle, setToggle] = useState(false);

  const player = () => {
    const sound = new Howl({
      src: [CheckSound],
      volume: 0.25,
    });
    sound.play();
  };

  const handleCheck = (item: TodoType) => {
    item.done = item.done ? false : true;
    player();

    if (item.streak !== null) {
      const updateStreakParams: AxiosRequestConfig = {
        method: "PUT",
        withCredentials: true,
        url: `/streaks/updateCount/${item.streak.id}`,
      };

      requestBackend(updateStreakParams)
        .then(() => {})
        .catch(() => {});
    }

    const params: AxiosRequestConfig = {
      method: "DELETE",
      withCredentials: true,
      url: `/todos/${item.id}`,
      data: {
        ...item,
      },
    };

    requestBackend(params)
      .then(() => {
        setToggle(true);
        setTimeout(() => {
          window.location.reload();
        }, 1400);
      })
      .catch(() => {
        toast.error("Erro!");
      });
  };

  const formatDate = (todo: TodoType): string => {
    if (todo.createdAt !== null) {
      let aux = todo.createdAt;
      let ix = aux.indexOf("T");
      let date = aux.substring(0, ix);
      let fields = date.split("-");
      return fields[2] + "/" + fields[1] + "/" + fields[0];
    }
    return "null";
  };

  return (
    <TodoComponent animate={toggle}>
      <div className="form-check">
        <div className="ribbon ribbon-top-right">
          <span className={item.priority + "-ribbon"}>&nbsp;</span>
        </div>
        <div className="form-info">
          <label htmlFor={item.id.toString()}>
            {item.title}
            <span className="date-span"> - {formatDate(item)}</span>
          </label>
          {item.streak !== null ? (
            <span className="text-muted">{item.streak.title}</span>
          ) : (
            <></>
          )}
        </div>
        <input
          type="checkbox"
          className="form-check-input"
          id={item.id.toString()}
          value={item.title}
          onChange={() => handleCheck(item)}
        />
      </div>
    </TodoComponent>
  );
};

export default Todo;
