import { CardType } from "types/CardType";
import { useState } from "react";
import { AxiosRequestConfig } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { requestBackend } from "util/requests";
import { toast } from "react-toastify";
import * as themeConf from "util/theme";
import styled from "styled-components";
import "./styles.css";

type Props = {
  cd: CardType;
};

const MainCard = styled.div`
  background-color: transparent;
  width: 300px;
  height: 250px;
  perspective: 1000px;
  margin: 15px 0px;

  &:hover .inner-card {
    transform: rotateY(180deg);
  }
`;

const InnerCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.34s;
  transform-style: preserve-3d;
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 5px;
  transition: height 0s;

  &.front {
    background-color: ${themeConf.cardColor};
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &.back {
    background-color: ${themeConf.cardColor};
    color: white;
    transform: rotateY(180deg);
    padding: 20px 50px;
  }

  .overflow {
    text-align: justify;
    font-size: 15px;
    letter-spacing: -0.025rem;
    height: 180px;
    width: 200px;
    overflow-y: hidden;
    mask-image: linear-gradient(180deg, #000 55%, transparent);
  }

  &.show .overflow {
    overflow-y: auto;
    mask-image: none;
    width: 208px;
    scrollbar-width: thin;
    scrollbar-color: ${themeConf.cardColor} ${themeConf.cardColor};
  }
`;

const Card2 = ({ cd }: Props) => {
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
      return fields[2] + "/" + fields[1] + "/" + fields[0];
    }
    return "null";
  };

  return (
    <MainCard className="main-card">
      <InnerCard className="inner-card">
        <CardFront className="front">
          {cd.createdAt && <span className="date-span">{formatDate(cd)}</span>}
          <span className="mt-2">{cd.title}</span>
        </CardFront>
        <CardFront className={`back ${show ? "show" : ""}`}>
          <div className="d-flex flex-row-reverse align-items-center justify-content-between up-title mb-1">
            <button onClick={handleDeletion} className="up-title-button">
              <i className="bi bi-trash3" style={{ color: "indianred" }} />
            </button>
            <button onClick={handleToggle} className="up-title-button">
              {show ? (
                <i className="bi bi-eye-slash" />
              ) : (
                <i className="bi bi-eye" />
              )}
            </button>
            <Link to={`/cards/${cd.id}`} className="up-title-button">
              <i className="bi bi-pencil-fill" style={{ color: "gold" }} />
            </Link>
          </div>
          <button onClick={handleToggle}>
            <div className="overflow">{cd.description}</div>
          </button>
        </CardFront>
      </InnerCard>
    </MainCard>
  );
};

export default Card2;
