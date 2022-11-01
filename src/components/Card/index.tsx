import { CardType } from "types/CardType";
import { useState } from "react";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";
import { toast } from "react-toastify";
import * as themeConf from "util/theme";
import styled from "styled-components";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  cd: CardType;
};

const MainCard = styled.div`
  background-color: ${themeConf.cardColor};
  color: ${themeConf.textColor};
  margin: 15px 10px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: auto;
  min-height: 80px;

  @media (min-width: 576px) {
    width: 450px;
  }

  @media (min-width: 768px) {
    width: 650px;
  }

  & .date-span {
    font-weight: 300;
    font-size: 13px;
  }
`;

const CardTitulo = styled.div`
  font-size: 20px;
  width: 230px;
  height: 50px;
`;

const CardContent = styled.div`
  width: 280px;
  font-size: 15px;
  margin: 5px 0 15px 0;
  text-align: justify;

  @media (min-width: 576px) {
    width: 400px;
    margin: 5px 0 35px 0;
  }

  @media (min-width: 768px) {
    width: 600px;
  }
`;

const Card = ({ cd }: Props) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShow(show ? false : true);
  };

  const handleDeletion = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let ok = window.confirm("Você tem certeza que quer deletar este card?");
    if (ok) {
      const params: AxiosRequestConfig = {
        url: `cards/${cd.id}`,
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

  const formatDate = (card: CardType): string => {
    if (card.createdAt !== null) {
      let aux = card.createdAt;
      let ix = aux.indexOf("T");
      let date = aux.substring(0, ix);
      let fields = date.split("-");
      return fields[2]+"/"+fields[1]+"/"+fields[0];
    }
    return "null";
  };

  return (
    <MainCard>
      <div className="d-flex flex-row-reverse align-items-center justify-content-between up-title mb-1">
        <button onClick={handleDeletion} className="up-title-button">
          <i className="bi bi-trash3" style={{color: "indianred"}} />
        </button>
        <label htmlFor={"card-" + cd.id}>
          {cd.createdAt && <span className="date-span">{formatDate(cd)}</span>}
        </label>
        <Link to={`/cards/${cd.id}`} className="up-title-button">
          <i className="bi bi-pencil-fill" style={{color: "gold"}} />
        </Link>
      </div>

      <button onClick={handleToggle}>
        <CardTitulo>{cd.title}</CardTitulo>
      </button>
      {show && <CardContent>{cd.description}</CardContent>}
    </MainCard>
  );
};

export default Card;
