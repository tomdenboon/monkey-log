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
      const started = new Date(active.replace(/-/g, "/"));
      started.setTime(
        started.getTime() - started.getTimezoneOffset() * 60 * 1000
      );
      var end_str = datesToTimer(started, new Date());
      setTimer(end_str);
    }
    var intervalId = null;
    if (active) {
      intervalId = setInterval(() => {
        toTimer();
      }, 30); // in milliseconds
    }
    return () => clearInterval(intervalId);
  }, [active]);

  return (
    <div
      className={
        "w-full " +
        (location.pathname.startsWith("/dashboard/workout/active") ||
        active === null
          ? "py-1"
          : "py-7")
      }
    >
      <Link
        className={
          "fixed flex items-center bottom-16 z-30 md:bottom-2 w-1/2 left-1/2 -translate-x-1/2 md:ml-36 " +
          "text-white rounded-t md:rounded bg-blue-500 justify-center gap-2 py-2 " +
          ((location.pathname.startsWith("/dashboard/workout/active") ||
            active === null) &&
            "invisible")
        }
        to="/dashboard/workout/active/edit"
      >
        <FiActivity className=" flex-shrink-0" />
        {timer}
      </Link>
    </div>
  );
}

export default ActiveWorkoutCard;
