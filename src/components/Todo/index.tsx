import { AxiosRequestConfig } from "axios";
import styled, { keyframes } from "styled-components";
import { TodoType } from "types/TodoType";
import { requestBackend } from "util/requests";
import { useState } from "react";
import { toast } from "react-toastify";
import * as themes from "util/theme";
import "./styles.css";

interface AnimateProps {
  animate: boolean;
}

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
`;

type Props = {
  item: TodoType;
};

const Todo = ({ item }: Props) => {
  const [toggle, setToggle] = useState(false);

  const handleCheck = (item: TodoType) => {
    item.done = item.done ? false : true;

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

  return (
    <TodoComponent animate={toggle}>
      <div className="form-check">
        <div className="ribbon ribbon-top-right">
          <span className={item.priority + "-ribbon"}>&nbsp;</span>
        </div>
        <label htmlFor={item.id.toString()}>{item.title}</label>
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
