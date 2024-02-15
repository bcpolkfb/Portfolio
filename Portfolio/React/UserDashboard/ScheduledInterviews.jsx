import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ScheduledInterviews = () =>{
  
  const [interviewsData, setInterviewsData] = useState({upcomingInterviews: []});
  
  useEffect(()=>{
    setInterviewsData((prevState)=>{
      const ad = {...prevState};
      ad.upcomingInterviews = [
        {
          id: 1,
          interviewStart: "12:00:00 11/16/2023",
          healthWorker: "Anna Chess",
          notes: "Dialysis",
          location: "Renal Clinic"
        },
        {
          id: 2,
          interviewStart: "12:00:00 11/24/2023",
          healthWorker: "Kevin O'Reilly",
          notes: "Annual Physical",
          location: "123 Fake Street"
        },
        {
          id: 3,
          interviewStart: "12:00:00 11/30/2023",
          healthWorker: "Anna Chess",
          notes: "Dialysis",
          location: "Renal Clinic"
        },
        {
          id:4,
          interviewStart: "12:00:00 12/09/2023",
          healthWorker: "Sean Mallory",
          notes: "Eye Exam",
          location: "321 Madeup Road"
        }
      ];
      return ad;
    });
  },[]);

  function interviewsMapper(singleInterview){
    var mappedInterview = null;

    if (singleInterview !== undefined) {
      mappedInterview = 
            <li className="list-group-item" key={"Appo" + singleInterview.id}>
              <div className="row">
                <div className="col">
                  <h5>{singleInterview.interviewStart}</h5>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <span>{singleInterview.notes}</span>
                </div>
                <div className="col">
                  <span>{singleInterview.healthWorker}</span>
                </div>
                <div className="col">
                  <span>{singleInterview.location}</span>
                </div>
              </div>
            </li>
    };

    return mappedInterview;
  };

  return (
    <Col xl={4} lg={6} md={12} className="mb-4">
      <Card>
        <Card.Header className="d-flex align-items-center justify-content-between card-header-height">
          <h4 className="mb-0">Upcoming Interviews</h4>
          <Link to="#" className="btn btn-outline-white btn-sm">
            View All
          </Link>
        </Card.Header>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {interviewsData.upcomingInterviews.map(interviewsMapper)}
          </ul>
        </div>
      </Card>
    </Col>
  )
};

ScheduledInterviews.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    id: PropTypes.number,
    isLoggedIn: PropTypes.bool,
    lastName: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
    tenantId: PropTypes.string
  }),
};

export default ScheduledInterviews;