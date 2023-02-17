import { TodoType } from "types/TodoType";
import { SpringPage } from "types/vendor/spring";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "AuthContext";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";
import { Link } from "react-router-dom";
import { TodoFilterContent } from "types/TodoFilterContent";
import TodoFilterBar from "components/TodoFilterBar";
import Pagination from "components/Pagination";
import ContentLoader from "components/ContentLoader";
import Todo from "components/Todo";
import styled from "styled-components";
import * as theme from "util/theme";
import { log } from "console";

const TodoButton = styled.div`
  width: 90px;
  height: 40px;
  border-radius: 4px;
  background-color: ${theme.cardColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

type ControlComponentsData = {
  activePage: number;
  filterData: TodoFilterContent;
};

const List = () => {
  const [todos, setTodos] = useState<SpringPage<TodoType>>();
  const { authContextData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { title: "", priority: "" },
    });

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      const params: AxiosRequestConfig = {
        url: "/todos",
        withCredentials: true,
        method: "GET",
        signal: controller.signal,
        params: {
          size: 10,
          page: controlComponentsData.activePage,
          title: controlComponentsData.filterData.title,
          priority: controlComponentsData.filterData.priority,
        },
      };

      setTodos((await requestBackend(params)).data);
      setLoading(false);
    })();

    return () => controller.abort();
  }, [authContextData.authenticated, controlComponentsData]);

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };

  const handleSubmitFilter = (data: TodoFilterContent) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  return (
    <>
      {loading ? (
        <div className="d-flex flex-column justify-content-center align-items-center mt-2">
          <Link to="/to-dos/create">
            <TodoButton>Criar</TodoButton>
          </Link>
          <div style={{ margin: "10px 0" }}>
            <TodoFilterBar onSubmitFilter={handleSubmitFilter} />
          </div>
          <div className="mt-2">
            <ContentLoader />
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center mt-2">
          <Link to="/to-dos/create">
            <TodoButton>Criar</TodoButton>
          </Link>
          <div style={{ margin: "10px 0" }}>
            <TodoFilterBar onSubmitFilter={handleSubmitFilter} />
          </div>
          <div className="d-flex flex-column align-items-center">
            {authContextData.authenticated &&
              todos &&
              todos?.content.map((todo) => <Todo key={todo.id} item={todo} />)}
          </div>
          <Pagination
            forcePage={todos?.number}
            pageCount={todos ? todos.totalPages : 0}
            range={2}
            onChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default List;
