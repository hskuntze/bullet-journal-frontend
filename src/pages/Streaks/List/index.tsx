import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { StreakType } from "types/StreakType";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "util/requests";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { StreakFilterContent } from "types/StreakFilterContent";
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
