import React from "react";
import "./AuthModal.css";

export const Authmodal = ({ setShowAuthModal, path, navigate }) => {
  return (
    <div
      className="auth-modal-container"
      onClick={() => setShowAuthModal(false)}
    >
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <span className="auth-modal-heading">Wish to save this product ?</span>
        <span className="auth-modal-sub-heading">Sign in to Continue !</span>
        <span className="auth-modal-hr"></span>
        <div className="auth-modal-action-container">
          <div
            className="auth-redirection-link"
            onClick={() =>
              navigate("/login", { replace: true, state: { path: path } })
            }
          >
            Log In
          </div>
          <div
            className="auth-redirection-link"
            onClick={() => setShowAuthModal(false)}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};
