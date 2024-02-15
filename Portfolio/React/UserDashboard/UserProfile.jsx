import React, { Fragment } from "react";
import { Card, Col, Image } from "react-bootstrap";

const UserProfile = (user) =>{

  return (
    <Fragment>
      <Col xl={3} lg={6} md={12}>
        <Card>
          <div className="d-flex align-items-end justify-content-between px-4 pt-2 pb-4 rounded-none rounded-bottom-md">
            <div className="d-flex align-items-center">
              <div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
                <Image 
                  src={user.user.avatarUrl} 
                  alt="avatar" 
                  className="avatar-xl rounded-circle border border-4 border-white position-relative" />
              </div>
              <div className="lh-1">
                <h2 className="mb-0">{user.user.firstName} {user.user.lastName}</h2>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <span>Email: {user.user.email}</span>
            </div>
            <div className="row">
              <span></span>
            </div>
          </div>
        </Card>
      </Col>
    </Fragment>
  )
};

export default UserProfile