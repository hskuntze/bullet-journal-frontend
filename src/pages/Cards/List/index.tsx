import { SpringPage } from "types/vendor/spring";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "AuthContext";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";
import { CardType } from "types/CardType";
import { Link } from "react-router-dom";
import Card from "components/Card";
import styled from "styled-components";
import * as theme from "util/theme";

const CardButton = styled.div`
  width: 90px;
  height: 40px;
  border-radius: 4px;
  background-color: ${theme.cardColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const List = () => {
  const [cards, setCards] = useState<SpringPage<CardType>>();
  const { authContextData } = useContext(AuthContext);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      const params: AxiosRequestConfig = {
        url: "/cards",
        withCredentials: true,
        method: "GET",
        signal: controller.signal,
      };

      setCards((await requestBackend(params)).data);
    })();

    return () => controller.abort();
  }, [authContextData.authenticated]);

  return (
    <div className="d-flex flex-column align-items-center mt-2">
      <Link to="/cards/create">
        <CardButton>Criar</CardButton>
      </Link>
      <div className="d-flex flex-column align-items-center">
        {authContextData.authenticated &&
          cards &&
          cards?.content.map((card) => <Card key={card.id} cd={card} />)}
      </div>
    </div>
  );
};

export default List;
