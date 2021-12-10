import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiActivity } from "react-icons/fi";
import { useLocation } from "react-router";
import datesToTimer from "../util/datesToTimer";
import MonkeyAxios from "../MonkeyAxios";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../store/actions";

function ActiveWorkoutCard() {
  const [timer, setTimer] = useState("");
  const active = useSelector((state) => state.active);
  const location = useLocation();
  const axios = MonkeyAxios();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("active")
      .then((res) => {
        const a = res.data.data;
        dispatch(action.setActiveDate(a.started_at));
      })
      .catch((err) => {});
  }, [axios, dispatch]);

  useEffect(() => {
    function toTimer() {
      const started = new Date(active);
      started.setTime(
        started.getTime() - started.getTimezoneOffset() * 60 * 1000
      );
      var end_str = datesToTimer(started, new Date());
      setTimer(end_str);
    }
    const intervalId = setInterval(() => {
      toTimer();
    }, 30); // in milliseconds
    return () => clearInterval(intervalId);
  }, [active]);

  return (
    <div className="py-8 w-full">
      <Link
        className={
          "absolute flex items-center left-1/2 -translate-x-1/2 bottom-2  w-1/2 " +
          "text-white rounded-full drop-shadow-2xl filter bg-blue-500 justify-center gap-2 px-5 py-2 " +
          ((location.pathname === "/dashboard/active" || active === null) &&
            "invisible")
        }
        to="/dashboard/active"
      >
        <FiActivity className=" flex-shrink-0" />
        {timer}
      </Link>
    </div>
  );
}

export default ActiveWorkoutCard;
