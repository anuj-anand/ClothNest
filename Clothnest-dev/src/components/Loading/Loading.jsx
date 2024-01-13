import React from "react";
import "./Loading.css";
import { Rings } from "react-loader-spinner";

export const Loading = () => {
  return (
    <div className="loading-div">
      <Rings color="#60d4e4cc" height={200} width={250} />
    </div>
  );
};
