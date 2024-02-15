import React, { useEffect, useState } from "react";
// import debug from "sabio-debug";

// const _logger = debug.extend("UserHealthRec")

const UserHealthRecords = () =>{

  const [recordsData, setRecordsData] = useState({healthRecords: []});

  useEffect(()=>{
    setRecordsData((prevState)=>{
      const rd = {...prevState};
      rd.healthRecords = [
        {
          id: 3,
          appointmentDate: "09/28/2023",
          healthWorker: "Alan DeMarco",
          reason: "Admitted for fatigue and shortness of breath. EKG revealed atrial fibrillation.",
          plan: "Metoprolol prescribed. Continue to monitor."
        },
        {
          id: 2,
          appointmentDate: "12/03/2022",
          healthWorker: "Rhea Brown",
          reason: "High blood pressure",
          plan: "Lisinopril prescribed. Continue to monitor."
        },
        {
          id: 1,
          appointmentDate: "11/20/2022",
          healthWorker: "Kevin O'Reilly",
          reason: "Annual Physical",
          plan: "Blood Pressure elevated. Scheduled appointment with heart specialist."
        }
      ];
      return rd;
    })
  },[]);

  function recordsMapper(singleRecord){
    var mappedRecord = null;

    if (singleRecord !== undefined) {
      mappedRecord = 
        <li className="list-group-item" key={"Record" + singleRecord.id}>
          <div className="row">
            <div className="col">
              <h5>{singleRecord.appointmentDate}</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <span>{singleRecord.healthWorker}</span>
            </div>
            <div className="col-5">
              <span>{singleRecord.reason}</span>
            </div>
            <div className="col-5">
              <span>{singleRecord.plan}</span>
            </div>
          </div>
        </li>
    };

    return mappedRecord;
  };

  return (
    <div className="mb-4 col-xl-8 col-lg-12">
      <div className="card">
        <div className="align-items-center card-header-height d-flex justify-content-between align-items-center card-header">
          <div>
            <h4 className="mb-0">Health Records</h4>
          </div>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {recordsData.healthRecords.map(recordsMapper)}
          </ul>
        </div>
      </div>
    </div>
  )
};

export default UserHealthRecords;