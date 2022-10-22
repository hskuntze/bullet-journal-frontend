import Emoji from "components/Emoji";
import styled, { keyframes } from "styled-components";
import * as themeConf from "util/theme";
import "./styles.css";

const HomeContent = styled.main`
  background-color: ${themeConf.backgroundColor};
  display: flex;
  height: 500px;
  justify-content: center;
  align-items: center;
`;

const grow = keyframes`
  100% {
    transform: scale(2,2);
  }
`;

const SquareToCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11.5px;
  color: ${themeConf.textColor};
  background: ${themeConf.homeAnimationBackground};
  animation: ${grow} 1.5s ease-in-out forwards;
`;

const Home = () => {
  return (
    <HomeContent>
      <SquareToCircle>
        Bem vindo! <Emoji symbol="😀"/>
      </SquareToCircle>
    </HomeContent>
  );
};

export default Home;
