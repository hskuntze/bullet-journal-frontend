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
            espaço pessoal.
          </p>
        </div>
      </AboutCard>
    </div>
  );
};

export default About;
