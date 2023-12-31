import React, { useEffect, useState } from "react";
import SidebarHeader from "../Components/Sidebar_Header";
import { Box, Text, Heading } from "@chakra-ui/react";
import { TbPointFilled } from "react-icons/tb";
import axios from "axios";

const Records = () => {
  const [firstYear, setFirstYear] = useState({});
  const [secondYear, setSecondYear] = useState({});
  const [thirdYear, setThirdYear] = useState({});
  const [fourthYear, setFourthYear] = useState({});
  const [subject, setSubject] = useState([]);
  const [subAvg, setSubAvg] = useState({});
  const [subName, setSubName] = useState("");

  const getByYearOne = () => {
    axios
      .get(`http://localhost:5000/attendance/records/year?year=First`)
      .then((res) => {
        console.log(res.data);
        setFirstYear(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getByYearTwo = () => {
    axios
      .get(`http://localhost:5000/attendance/records/year?year=Second`)
      .then((res) => {
        console.log(res.data);
        setSecondYear(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getByYearThree = () => {
    axios
      .get(`http://localhost:5000/attendance/records/year?year=Third`)
      .then((res) => {
        console.log(res.data);
        setThirdYear(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getByYearFour = () => {
    axios
      .get(`http://localhost:5000/attendance/records/year?year=Fourth`)
      .then((res) => {
        console.log(res.data);
        setFourthYear(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSubjects = async () => {
    try {
      let res = await axios.get("http://localhost:5000/subjects");
      setSubject(res.data);
    } catch (err) {
      throw err;
    }
  };
  const handleSubjectChange = (e) => {
    setSubName(e.target.value);
    axios
      .get(
        `http://localhost:5000/attendance/records/subject?sub=${e.target.value}`
      )
      .then((res) => {  
        console.log("averageeeee", res.data);
        setSubAvg(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getByYearOne();
    getByYearTwo();
    getByYearThree();
    getByYearFour();
    getSubjects();
  }, []);
  return (
    <div>
      <SidebarHeader />
      <div className="mainContent">
        <Box>
          <Heading m="2" as="h2" size="xl">
            Average Attendance
          </Heading>
          <Box mt="5" border="solid #ccc 1px" p="2">
            <Text
              fontSize="1.7rem"
              color="black"
              fontWeight="bold"
              textAlign="left"
            >
              Average Attendance By Year
            </Text>
            <Box m="3" border="solid #ccc 1px" p="3" borderRadius="5">
              <Text m="2" fontSize="1.5rem" fontWeight="bold">
                First Year
              </Text>
              <Box mt="2" display="flex" justifyContent={"space-between"}>
                <Text fontWeight="bold">
                  Enrolled Students : {firstYear.enrolledStudents}{" "}
                </Text>
                <Text fontWeight="bold">
                  Total Lectures : {firstYear.lectures_count}
                </Text>
                <Text fontWeight="bold">
                  Average Attendance : {firstYear.average_attendence}
                </Text>
              </Box>
            </Box>
            <Box m="3" border="solid #ccc 1px" p="3" borderRadius="5">
              <Text m="2" fontSize="1.5rem" fontWeight="bold">
                Second Year
              </Text>
              <Box mt="2" display="flex" justifyContent={"space-between"}>
                <Text fontWeight="bold">
                  Enrolled Students : {secondYear.enrolledStudents}{" "}
                </Text>
                <Text fontWeight="bold">
                  Total Lectures : {secondYear.lectures_count}
                </Text>
                <Text fontWeight="bold">
                  Average Attendance : {secondYear.average_attendence}
                </Text>
              </Box>
            </Box>
            <Box m="3" border="solid #ccc 1px" p="3" borderRadius="5">
              <Text m="2" fontSize="1.5rem" fontWeight="bold">
                Third Year
              </Text>
              <Box mt="2" display="flex" justifyContent={"space-between"}>
                <Text fontWeight="bold">
                  Enrolled Students : {thirdYear.enrolledStudents}{" "}
                </Text>
                <Text fontWeight="bold">
                  Total Lectures : {thirdYear.lectures_count}
                </Text>
                <Text fontWeight="bold">
                  Average Attendance : {thirdYear.average_attendence}
                </Text>
              </Box>
            </Box>
            <Box m="3" border="solid #ccc 1px" p="3" borderRadius="5">
              <Text m="2" fontSize="1.5rem" fontWeight="bold">
                Fourth Year
              </Text>
              <Box mt="2" display="flex" justifyContent={"space-between"}>
                <Text fontWeight="bold">
                  Enrolled Students : {fourthYear.enrolledStudents}{" "}
                </Text>
                <Text fontWeight="bold">
                  Total Lectures : {fourthYear.lectures_count}
                </Text>
                <Text fontWeight="bold">
                  Average Attendance : {fourthYear.average_attendence}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box mt="5" border="solid #ccc 1px" p="2">
            <Text
              fontSize="1.7rem"
              color="black"
              fontWeight="bold"
              textAlign="left"
            >
              Average Attendance By Subjects
            </Text>
            <Box m="5" border="solid #ccc 2px" h="4rem">
              <Text>Select Lecture Subject :</Text>
              <select name="subject" onChange={handleSubjectChange}>
                <option value="">--select Subject--</option>
                {subject?.map((el, id) => (
                  <option key={id} value={el._id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </Box>
            <Box m="3" border="solid #ccc 1px" p="3" borderRadius="5">
              {/* <Text m="2" fontSize="1.5rem" fontWeight="bold">
                {subName} Average Attendance
              </Text> */}
              <Box mt="2" display="flex" justifyContent={"space-between"}>
                <Text fontWeight="bold">
                  Enrolled Students : {subAvg.enrolledStudents}{" "}
                </Text>
                <Text fontWeight="bold">
                  Total Lectures : {subAvg.lectures_count}
                </Text>
                <Text fontWeight="bold">
                  Average Attendance : {subAvg.average_attendence}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Records;
