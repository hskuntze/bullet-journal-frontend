import { StreakFilterContent } from "types/StreakFilterContent";
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { StreakType } from "types/StreakType";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "util/requests";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Howl } from "howler";
import SuccessSound from "assets/audios/success.mp3";
import TadaSound from "assets/audios/tada.mp3";
import StreakFilterBar from "components/StreakFilterBar";
import ContentLoader from "components/ContentLoader";
import ProgressBar from "components/ProgressBar";
import Pagination from "components/Pagination";
import BtnLoader from "../BtnLoader";
import styled from "styled-components";
import * as theme from "util/theme";
import "./styles.css";

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

type ControlComponentsData = {
  activePage: number;
  filterData: StreakFilterContent;
};

const List = () => {
  const [streaks, setStreaks] = useState<SpringPage<StreakType>>();
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { title: "" },
    });

  const player = () => {
    const sound = new Howl({
      src: [SuccessSound],
      volume: 0.6,
    });
    sound.play();
  };

  const player2 = () => {
    const sound = new Howl({
      src: [TadaSound],
      volume: 0.45,
    });
    sound.play();
  }

  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      const params: AxiosRequestConfig = {
        url: "/streaks",
        withCredentials: true,
        method: "GET",
        signal: controller.signal,
        params: {
          size: 3,
          page: controlComponentsData.activePage,
          title: controlComponentsData.filterData.title,
        },
      };

      setStreaks((await requestBackend(params)).data);
      setLoading(false);
    })();
  }, [controlComponentsData]);

  const handleProgress = (streak: StreakType) => {
    player();
    streak.count++;
    streak.last = new Date().toISOString();
    setBtnLoading(true);
    (streak.count / streak.totalPerLabel) * 100 >= 100
      ? (streak.disabled = true)
      : (streak.disabled = false);

    if((streak.count / streak.totalPerLabel) * 100 >= 100){
      player2();
    }

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
            params: {
              size: 3,
              page: controlComponentsData.activePage,
              title: controlComponentsData.filterData.title,
            },
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

  const handleSubmitFilter = (data: StreakFilterContent) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };

  const formatDate = (streak: StreakType): string => {
    if (streak.last !== null) {
      let aux = streak.last;
      let ix = aux.indexOf("T");
      let date = aux.substring(0, ix);
      let fields = date.split("-");
      return fields[2] + "/" + fields[1] + "/" + fields[0];
    }
    return "null";
  };

  const formatHour = (streak: StreakType): string => {
    if(streak.last != null) {
      let aux = streak.last;
      let ix = aux.indexOf("T");
      let ix2 = aux.indexOf("Z");
      let hour = aux.substring(ix+1, ix2);
      let fields = hour.split(":");
      return (Number(fields[0])-3)+":"+fields[1];
    }
    return "null";
  };

  return (
    <>
      {loading ? (
        <div className="d-flex flex-column justify-content-center align-items-center mt-2">
          <Link to="/streaks/create">
            <CreateStreakButton>Criar</CreateStreakButton>
          </Link>
          <div style={{ margin: "10px 0" }}>
            <StreakFilterBar onSubmitFilter={handleSubmitFilter} />
          </div>
          <div className="mt-2">
            <ContentLoader />
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center mt-2">
          <Link to="/streaks/create">
            <CreateStreakButton>Criar</CreateStreakButton>
          </Link>
          <div style={{ margin: "10px 0" }}>
            <StreakFilterBar onSubmitFilter={handleSubmitFilter} />
          </div>
          {streaks &&
            streaks.content.map((streak) => (
              <div className="streak-item" key={"div" + streak.id}>
                <ProgressBar streak={streak} key={streak.id} />
                <div className="streak-under-div">
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
                  {streak.last && (<div className="last-update"><i className="bi bi-arrow-repeat me-2" style={{color: 'coral'}}/> {formatDate(streak)} - {formatHour(streak)}</div>)}
                </div>
              </div>
            ))}
          <Pagination
            forcePage={streaks?.number}
            pageCount={streaks ? streaks.totalPages : 0}
            range={2}
            onChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default List;
