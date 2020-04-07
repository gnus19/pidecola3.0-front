import React from "react";

function CardButton({ className, title, text, onClick }) {
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
