import React from "react";
import { Button, Image } from "react-bootstrap";

const UserAvatar =()=>{

  return(
    <div>
      <h5 className="mb-0">UPLOADS</h5>
      <div className="d-lg-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center mb-4 mb-lg-0">
          <Image
            src={""}
            id="img-uploaded"
            className="avatar-xl rounded-circle"
            alt=""
          />
          <div className="ms-3">
            <h4 className="mb-0">Upload Image</h4>
            <p className="mb-0">
              Maximum Size 5MB
            </p>
          </div>
        </div>
        <div>
          <Button size="sm">
            Edit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UserAvatar;