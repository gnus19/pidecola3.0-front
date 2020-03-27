import React from "react";
import "./ImgContainer.css";

const ImgContainer = props => (
  <div
    className="ImgContainer"
    style={{ height: props.height || "100%", width: props.width || "100%" }}
  >
    <div className="Envolved">
      <img className="Img" alt="imageEnv" {...props} />
    </div>
  </div>
);

export default ImgContainer;
