import React from "react";
import { useAuth, useData } from "../../contexts";

export const ProfileDetails = () => {
  const { logoutHandler } = useAuth();
  const { activeUser } = useData();

  return (
    <div className="profile-details-container">
      <div className="profile-details-heading">
        <h4 className="account-details-heading">Account Details</h4>
      </div>
      <div className="profile-details">
        <div className="profile-row">
          <span className="profile-content-field">Name: </span>
          <span className="profile-content-value">
            {activeUser?.firstName + " " + activeUser?.lastName}
          </span>
        </div>

        <div className="profile-row">
          <span className="profile-content-field">Email: </span>
          <span className="profile-content-value">{activeUser?.email}</span>
        </div>
      </div>

      <button onClick={logoutHandler} className="profile-btn-logout">
        Logout
      </button>
    </div>
  );
};
