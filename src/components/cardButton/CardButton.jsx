import React from "react";
import { NavLink } from "react-router-dom";

function CardButton({ className, path, pideCola, title, text, onClick }) {
  return (
    <>
      <div
        onClick={onClick}
        className={className}
      >
        <div className="TopButton">
          <span className="TopComment">{title}</span>
        </div>
        <div
          className={
            className === "RequestButton"
              ? "ImageRequestButton"
              : "ImageOfferButton"
          }
        >
          <div className="OverButton">
            <span className="Comment">{text}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardButton;
