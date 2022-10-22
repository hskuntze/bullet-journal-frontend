import styled from "styled-components";
import * as theme from "util/theme";
import "./styles.css";

const AboutCard = styled.div`
  width: 280px;
  border-radius: 4px;
  font-size: 14px;
  margin: 25px 0;
  color: ${theme.textColor};
  background: ${theme.homeAnimationBackground};
  padding: 15px 8px;

  @media (min-width: 576px) {
    width: 500px;
  }
`;

const About = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <AboutCard>
        <div className="about-info">
          <h5>The Bullet Journal by Hassan Kuntze</h5>
          <p>
            O Bullet Journal é uma iniciativa pessoal que nasce com a
            perspectiva da importância de um controle da rotina, bem como um
            espaço pessoal. A aplicação inicialmente conta com apenas duas
            funcionalidades: tarefas (todos) & cartões (cards), onde o primeiro
            tem o intuito de ajudar o usuário com tarefas corriqueiras, e o
            segundo com o propósito de ser um espaço para lembretes, para
            anotações, entradas diárias etc.
          </p>
          <small className="fw-light fst-italic mt-3">v1.2.0</small>
        </div>
      </AboutCard>
    </div>
  );
};

export default About;
