import React from "react";
import "./ImgContainer.css";
import userDefault from "../../assets/images/user.png";

const ImgContainer = props => {

  const defaultImg = (event) => {
    event.target.setAttribute("src", userDefault);
  }

  return(<div
    className="ImgContainer"
    style={{ height: props.height || "100%", width: props.width || "100%" }}
  >
    <div className="Envolved">
      <img className="Img" onError={defaultImg} {...props} alt="prfile_pic"/>
    </div>
  </div>
  );
}
export default ImgContainer;
