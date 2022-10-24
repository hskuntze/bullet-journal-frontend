import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { StreakType } from "types/StreakType";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "util/requests";
import ProgressBar from "components/ProgressBar";
import BtnLoader from "../BtnLoader";
import styled from "styled-components";
import * as theme from "util/theme";
import "./styles.css";
import { Link } from "react-router-dom";
import StreakContentLoader from "../StreakContentLoader";

const StreakButton = styled.button.attrs(() => ({
  type: "button",
}))`
  width: 70px;
  height: 45px;
  background-color: ${theme.buttonBackgroundColor};
  border-radius: 5px;
  margin: 5px 0;

  &:disabled {
    background-color: #ccc;
  }
`;

const CreateStreakButton = styled.div`
  width: 90px;
  height: 40px;
  border-radius: 4px;
  background-color: ${theme.cardColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const List = () => {
  const [streaks, setStreaks] = useState<SpringPage<StreakType>>();
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      const params: AxiosRequestConfig = {
        url: "/streaks",
        withCredentials: true,
        method: "GET",
        signal: controller.signal,
      };

      setStreaks((await requestBackend(params)).data);
      setLoading(false);
    })();
  }, []);

  const handleProgress = (streak: StreakType) => {
    streak.count++;
    streak.doneToday = true;
    setBtnLoading(true);
    (streak.count / streak.total) * 100 >= 100
      ? (streak.disabled = true)
      : (streak.disabled = false);

    const params: AxiosRequestConfig = {
      url: `/streaks/${streak.id}`,
      withCredentials: true,
      method: "PUT",
      data: {
        ...streak,
      },
    };

    requestBackend(params)
      .then(() => {
        (async () => {
          const controller = new AbortController();
          const params: AxiosRequestConfig = {
            url: "/streaks",
            withCredentials: true,
            method: "GET",
            signal: controller.signal,
          };
          setStreaks((await requestBackend(params)).data);
        })();
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setBtnLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <div className="d-flex flex-column justify-content-center align-items-center mt-2">
          <Link to="/streaks/create">
            <CreateStreakButton>Criar</CreateStreakButton>
          </Link>
          <div className="mt-2">
            <StreakContentLoader />
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center my-3">
          <Link to="/streaks/create">
            <CreateStreakButton>Criar</CreateStreakButton>
          </Link>
          {streaks &&
            streaks.content.map((streak) => (
              <div className="streak-item">
                <ProgressBar streak={streak} key={streak.id} />
                {btnLoading ? (
                  <div style={{ margin: "5px 0" }}>
                    <BtnLoader />
                  </div>
                ) : (
                  <StreakButton
                    key={"btn" + streak.id}
                    onClick={() => handleProgress(streak)}
                    disabled={streak.disabled}
                  >
                    Feito
                  </StreakButton>
                )}
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default List;