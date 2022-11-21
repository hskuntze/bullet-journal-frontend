import FadeSection from "components/FadeSection";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as themeConf from "util/theme";
import "./styles.css";

const HomeContent = styled.div`
  background-color: ${themeConf.backgroundColor};
  display: flex;
  flex-direction: column;
  height: 2800px;
  align-items: center;
  color: ${themeConf.buttonBackgroundColor};
`;

const Home = () => {
  return (
    <HomeContent>
      <div className="home-container">
        <div className="fc fade-container-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-journals home-img"
            viewBox="0 0 19 19"
          >
            <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2z" />
            <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0z" />
          </svg>
          <div className="d-flex flex-column text-center">
            <p>
              Seja bem-vindo(a) ao <b>The Bullet Journal</b>
            </p>
            <p>
              Aqui você ganha um espaço para organizar seus pensamentos,
              planejar as tarefas do dia e acompanhar objetivos diários.{" "}
              <b>
                <Link to="/auth/register">Cadastre-se</Link>
              </b>{" "}
              e garanta já seu <u>bullet journal</u>!
            </p>
          </div>
        </div>
      </div>
      <div className="home-container">
        <FadeSection>
          <div className="fc fade-container-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-journal-text home-img"
              viewBox="0 0 19 19"
            >
              <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
            </svg>
            <p>
              A função de "Cards" cria pequenos cartões com notas, ideias,
              listas, pensamentos, um espaço livre para escrever. Edite ou
              exclua quando quiser.
            </p>
          </div>
        </FadeSection>
      </div>
      <div className="home-container">
        <FadeSection>
          <div className="fc fade-container-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-check2-square home-img"
              viewBox="0 0 19 19"
            >
              <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
              <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
            </svg>
            <p>
              Com os "To-dos" você pode definir suas metas de acordo com a
              importância delas. Com três níveis de prioridade você pode criar
              objetivos concretos e visualizar o que precisa fazer primeiro.
            </p>
          </div>
        </FadeSection>
      </div>
      <div className="home-container">
        <FadeSection>
          <div className="fc fade-container-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-calendar3 home-img"
              viewBox="0 0 19 19"
            >
              <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
              <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg>
            <p>
              Através dos "Streaks" é possível definir objetivos a curto ou
              longo prazo e acompanhar visualmente sua evolução ao completá-los
              diariamente.
            </p>
          </div>
        </FadeSection>
      </div>
    </HomeContent>
  );
};

export default Home;
