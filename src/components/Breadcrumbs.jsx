import React from "react";
import { useLocation } from "react-router-dom";
import "./breadcrumbs.css";

const Breadcrumbs = () => {
  const location = useLocation();

  const crumb = location.pathname.split("/")[1];
  return (
    <>
      <div className="bread-crumb">{crumb}</div>
    </>
  );
};

export default Breadcrumbs;
