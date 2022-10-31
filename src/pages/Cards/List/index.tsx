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
import CardFilterBar from "components/CardFilterBar";
import { CardFilterContent } from "types/CardFilterContent";
import Pagination from "components/Pagination";
import ContentLoader from "components/ContentLoader";

const CardButton = styled.div`
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
  filterData: CardFilterContent;
};

const List = () => {
  const [cards, setCards] = useState<SpringPage<CardType>>();
  const { authContextData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { title: "" },
    });

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      const params: AxiosRequestConfig = {
        url: "/cards",
        withCredentials: true,
        method: "GET",
        signal: controller.signal,
        params: {
          size: 10,
          page: controlComponentsData.activePage,
          title: controlComponentsData.filterData.title,
        },
      };

      setCards((await requestBackend(params)).data);
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

  const handleSubmitFilter = (data: CardFilterContent) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  return (
    <>
      {loading ? (
        <div className="d-flex flex-column justify-content-center align-items-center mt-2">
          <Link to="/cards/create">
            <CardButton>Criar</CardButton>
          </Link>
          <div style={{ margin: "10px 0" }}>
            <CardFilterBar onSubmitFilter={handleSubmitFilter} />
          </div>
          <div className="mt-2">
            <ContentLoader />
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center mt-2">
          <Link to="/cards/create">
            <CardButton>Criar</CardButton>
          </Link>
          <div style={{ margin: "10px 0" }}>
            <CardFilterBar onSubmitFilter={handleSubmitFilter} />
          </div>
          <div className="d-flex flex-column align-items-center">
            {authContextData.authenticated &&
              cards &&
              cards?.content.map((card) => <Card key={card.id} cd={card} />)}
          </div>
          <Pagination
            forcePage={cards?.number}
            pageCount={cards ? cards.totalPages : 0}
            range={2}
            onChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default List;
