import React from "react";
import RatingComponent from "./RatingComponent";

import img1 from "../assets/college project-pana.png";
import img2 from "../assets/college project-amico.png";
import img3 from "../assets/college project-bro.png";
import img4 from "../assets/college project-rafiki.png";
import { useNavigate } from "react-router-dom";

function CourseCard(course) {
  const staticRating = 3;
  const navigate = useNavigate();

  const handleCardClick = () => {
    localStorage.setItem("selectedCourseId", JSON.stringify(course.courseId));
    navigate("/courseRoom");
  };


  return (
    <>
      <div className="CourseCard-wrapper" onClick={handleCardClick}>
        <div className="CourseCard-content">
          <p className="CourseCard-content-course">{course.courseName}</p>
          <p className="CourseCard-content-mentor">
            Mentor: {course.mentorName}
          </p>
          <p className="CourseCard-content-skills">
            Skills: {course.skills}
          </p>
          <p className="CourseCard-content-duration">
            price: {course.Price}
          </p>
          <RatingComponent
            className="CourseCard-rating"
            staticRating={5 - course.rating}
          />
        </div>
        <div className="CourseCard-image">
          <img className="CourseCard-img" src={img3} alt="Course" />
        </div>
      </div>
    </>
  );
}

export default CourseCard;
