import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import MyCarousel from "../global/Slider2";
import Navigation from "../Nav/Navigation";
import TopSection from "./TopSection";
import Notifications from "./Notifications";
import Profile from "../Nav/Profile";


const Dashboard = () => {
  const [data1, setData1] = useState([]);
  const [latestDataDate, setLatestDataDate] = useState(null);

  const fetchData1 = async () => {
    const url = "http://localhost:3001/getSingleData";

    try {
      const response = await axios.get(url);
      const sortedData = response.data.sort(
        (a, b) => new Date(b.Date) - new Date(a.Date)
      );
      setData1(sortedData);

      // Get the latest date from the fetched data and set it to the state
      if (sortedData.length > 0) {
        setLatestDataDate(sortedData[0].Date);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData1();
  }, []);

  const formatCustomDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString)
      .toLocaleString(undefined, options)
      .replace(/(\d+:\d+)(\s\w+)/, "$1$2");
  };
  const handleLogout = () => {
    console.log("Logout");
  };

  const handleChangePassword = () => {

    console.log("Change Password");
  };
  return (
    <div className="w-full bg-white">
      <div className="col main pt-5 mt-3 container px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <p className="lead mb-2 sm:mb-0">Welcome to your Dashboard</p>
          <Profile onLogout={handleLogout} onChangePassword={handleChangePassword} />
          <Navigation />
        </div>

        <p className="text-2xl mt-2 sm:mt-0 mb-4 md:text-3xl lg:text-4xl xl:text-5xl text-right">
          {formatCustomDate(latestDataDate)}
        </p>

        <TopSection data1={data1} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="w-full mb-6">
            <div className="card w-full">
              <div className="card-header">
                <h2>
                  <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>{" "}
                  Test Information
                </h2>
              </div>
              <div className="card-body">
                <div className="carousel-wrapper">
                  <MyCarousel />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <Notifications />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
