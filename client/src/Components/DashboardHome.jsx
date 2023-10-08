import React, { useState, useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardHome = () => {
  const [studentsData, setStudentsData] = useState([]);
  const getStudents = () => {
    axios
      .get(`http://localhost:5000/students`)
      .then((res) => {
        console.log(res.data);
        setStudentsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let first = 0;
  let second = 0;
  let third = 0;
  let four = 0;
  let totalCount = 0;

  for (let i = 0; i < studentsData.length; i++) {
    if (studentsData[i].year == "First") {
      first++;
    } else if (studentsData[i].year == "Second") {
      second++;
    } else if (studentsData[i].year == "Third") {
      third++;
    } else if (studentsData[i].year == "Fourth") {
      four++;
    }
    totalCount++;
  }

  const data = {
    labels: ["First Year", "Second Year", "Third Year", "Fourth Year"],

    datasets: [
      {
        label: "Number of Students",
        data: [first, second, third, four],
        backgroundColor: [
          "rgba(255, 0, 55, 0.2)",
          "rgba(0, 153, 255, 0.2)",
          "rgba(255, 183, 0, 0.2)",
          "rgba(0, 255, 255, 0.2)",
          "rgba(85, 0, 255, 0.2)",
          "rgba(255, 128, 0, 0.2)",
        ],
        borderColor: ["#000", "#000", "#000", "#000", "#000", "#000"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    getStudents();
  }, []);
  return (
    <div className="mainContent">
      <Box m="auto" w={{ base: "90%", sm: "80%", md: "50%", lg: "40%" }}>
        <Doughnut data={data} />
        <Heading>Graphical Analysis</Heading>
      </Box>
      <Heading fontFamily="body" m="5">
        Total Registered Students = {totalCount}
      </Heading>
    </div>
  );
};

export default DashboardHome;
