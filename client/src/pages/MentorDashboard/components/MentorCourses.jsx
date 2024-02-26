import React, { useEffect , useState } from "react";
import CourseCard from "./CourseCard";
import {useSelector} from 'react-redux';


function MentorCourses() {
  const [courses,setCourses] = useState([]);
  const user = JSON.parse(localStorage.getItem("loginUser"));

  const getCreatedCourses = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/getcreatedcourses/', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user._id }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch created courses');
        }

        const data = await response.json();
        // console.log(data)
        return data.courses;
    } catch (error) {
        console.error(error);
    }
};
  
useEffect(() => {
  const fetchCourses = async () => {
    const coursesData = await getCreatedCourses();
    setCourses(coursesData);
    // console.log(courses);
  };

  fetchCourses();
}, [user._id]);
  return (
    <>
      <div className="MentorCourses-wrapper">
        <p className="MentorCourses-header">Courses</p>
        <div className="MentorCourses">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              courseId={course._id}
              courseName={course.title}
              mentorName={user.userName}
              skills={course.skills}
              Price={course.price}
              rating={course.rating}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MentorCourses;
