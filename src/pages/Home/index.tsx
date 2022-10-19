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

const spin = keyframes`
  100% {
    transform: scale(2,2);
    box-shadow: 0px 0px 6px 2px rgb(67,63,251);
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
  color: #e6e6e6;
  background: rgb(67,63,251);
  background: linear-gradient(45deg, rgba(67,63,251,1) 0%, rgba(252,70,70,1) 100%);
  animation: ${spin} 1.5s ease-in-out forwards;
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
