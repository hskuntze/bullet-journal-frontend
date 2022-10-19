import { TodoType } from "types/TodoType";
import { SpringPage } from "types/vendor/spring";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "AuthContext";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";
import Todo from "components/Todo";
import styled from "styled-components";
import * as theme from "util/theme";
import { Link } from "react-router-dom";

const TodoButton = styled.div`
  width: 90px;
  height: 40px;
  border-radius: 4px;
  background-color: ${theme.cardColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const List = () => {
  const [todos, setTodos] = useState<SpringPage<TodoType>>();
  const { authContextData } = useContext(AuthContext);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      const params: AxiosRequestConfig = {
        url: "/todos",
        withCredentials: true,
        method: "GET",
        signal: controller.signal,
      };

      setTodos((await requestBackend(params)).data);
    })();

    return () => controller.abort();
  }, [authContextData.authenticated]);

  return (
    <div className="d-flex flex-column align-items-center mt-2">
      <Link to="/to-dos/create">
        <TodoButton>Criar</TodoButton>
      </Link>
      <div className="d-flex flex-column align-items-center">
        {authContextData.authenticated &&
          todos &&
          todos?.content.map((todo) => <Todo key={todo.id} item={todo} />)}
      </div>
    </div>
  );
};

export default List;
