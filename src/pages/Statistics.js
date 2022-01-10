import React, { useEffect, useState } from "react";
import { FirstHeader } from "../components/headers";
import ShadowyContainer from "../components/styled/ShadowyContainer";
import NormalContainer from "../components/styled/NormalContainer";
import MonkeyAxios from "../MonkeyAxios";
import { milliToTimer } from "../util/datesToTimer";
import Section from "../components/styled/Section";

function GeneralStatisticCard({ title, statistic }) {
  return (
    <div className="flex flex-col w-full bg-primary-light rounded p-4">
      <h3 className="text-text-light inline">{title}</h3>
      <p className="text-xl sm:text-3xl whitespace-nowrap">{statistic}</p>
    </div>
  );
}
function Statistics() {
  const [loading, setLoading] = useState(true);
  const [generalStatistics, setGeneralStatistics] = useState({
    totalTime: 0,
    totalWorkouts: 0,
    totalReps: 0,
    totalVolume: 0,
  });
  const axios = MonkeyAxios();

  useEffect(() => {
    axios
      .get("statistic/general")
      .then((res) => {
        setGeneralStatistics({
          totalReps: res.data.total_reps,
          totalVolume: res.data.total_volume,
          totalTime: res.data.total_time,
          totalWorkouts: res.data.total_workouts,
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [axios]);

  const Header = () => <FirstHeader title="Statistics" />;

  return (
    <ShadowyContainer header={Header} loading={loading}>
      <NormalContainer>
        <Section title="general">
          <div className="grid  w-full gap-2 auto-cols-min grid-cols-2">
            <GeneralStatisticCard
              title={"workouts"}
              statistic={generalStatistics.totalWorkouts}
            />
            <GeneralStatisticCard
              title={"time lifting"}
              statistic={milliToTimer(generalStatistics.totalTime)}
            />
            <GeneralStatisticCard
              title={"volume (KG)"}
              statistic={generalStatistics.totalVolume}
            />
            <GeneralStatisticCard
              title={"reps"}
              statistic={generalStatistics.totalReps}
            />
          </div>
        </Section>
        <Section title="graphs"></Section>
      </NormalContainer>
    </ShadowyContainer>
  );
}

export default Statistics;
