import {
  faChalkboardUser,
  faSchool,
  faBug,
  faCircleExclamation,
  faTasks,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

function AdminGeneral() {
  const data = [
    {
      name: "Jan",
      ActiveMentors: 4000,
      ActiveStudents: 2400,
    },
    {
      name: "Feb",
      ActiveMentors: 3000,
      ActiveStudents: 1398,
    },
    {
      name: "Mar",
      ActiveMentors: 2000,
      ActiveStudents: 9800,
    },
    {
      name: "Apr",
      ActiveMentors: 2780,
      ActiveStudents: 3908,
    },
    {
      name: "May",
      ActiveMentors: 1890,
      ActiveStudents: 4800,
    },
    {
      name: "Jun",
      ActiveMentors: 2390,
      ActiveStudents: 3800,
    },
    {
      name: "Jul",
      ActiveMentors: 3490,
      ActiveStudents: 4300,
    },
  ];

  const data_bar = [
    {
      name: "Jan",
      Users: 10004,
    },
    {
      name: "Feb",
      Users: 5781,
    },
    {
      name: "Mar",
      Users: 19907,
    },
    {
      name: "Apr",
      Users: 15092,
    },
    {
      name: "May",
      Users: 40912,
    },
    {
      name: "Jun",
      Users: 70182,
    },
    {
      name: "Jul",
      Users: 98142,
    },
  ];

  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [reports1, setReports] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/getUsers")
      .then((res) => res.json())
      .then((data) => {
        const mentorList = data.filter((item) => item.Position === "mentor");
        const studentList = data.filter((item) => item.Position === "student");
        setMentors(mentorList);
        setStudents(studentList);
      });
    fetch("http://localhost:3000/api/Reports")
      .then((res) => res.json())
      .then((data) => {
        setReports(data.reports)
        console.log(data.reports);
      });
    fetch("http://localhost:3000/api/explorecourses")
      .then((res) => res.json())
      .then((data) => {
        setRoomData(data.courses);
        // console.log(data.courses);
      });
  }, []);
  return (
    <main className="main-container">
      <div className="main-title">
        <h3 style={{ color: "#112D4E" }}>ADMIN DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card" id="mentor-card">
          <div className="card-inner">
            <h3>Mentors</h3>
            <FontAwesomeIcon className="card_icon" icon={faChalkboardUser} />
          </div>
          <h1>{mentors.length}</h1>
        </div>
        <div className="card" id="student-card">
          <div className="card-inner">
            <h3>Students</h3>
            <FontAwesomeIcon className="card_icon" icon={faSchool} />
          </div>
          <h1>{students.length}</h1>
        </div>
        <div className="card" id="user-reports-card">
          <div className="card-inner">
            <h3>Course Rooms</h3>
            <FontAwesomeIcon className="card_icon" icon={faBuilding} />
          </div>
          <h1>{roomData.length}</h1>
        </div>
        <div className="card" id="bug-reports-card">
          <div className="card-inner">
            <h3>Reports</h3>
            <FontAwesomeIcon className="card_icon" icon={faBug} />
          </div>
          <h1>{reports1.length}</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data_bar}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Users" fill="#112D4E" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="ActiveStudents"
              stroke="#8884d8"
              activeDot={{ r: 10 }}
            />
            <Line type="monotone" dataKey="ActiveMentors" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default AdminGeneral;
