import React from "react";
import "./ImgContainer.css";
import userDefault from "../../assets/images/user.png";

const ImgContainer = props => {
  const defaultImg = event => {
    console.log("img error");
    
    event.target.setAttribute("src", userDefault);
  };

  return (
    <div
      className={`ImgContainer ${props.size}`}
    >
      <div className="Envolved">
        <img className="Img" onError={defaultImg} {...props} alt="prfile_pic"/>
      </div>
    </div>
  );
};
export default ImgContainer;
