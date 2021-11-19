import { useState, useEffect } from "react";
import MonkeyAxios from "../MonkeyAxios";

function Exercises() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const axios = MonkeyAxios();

  useEffect(() => {
    axios
      .get("user")
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  if (loading) {
    return <div>exercises</div>;
  } else {
    return <div>exercises</div>;
  }
}

export default Exercises;
