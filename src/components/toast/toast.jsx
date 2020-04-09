import React, { useEffect } from "react";
import "./toast.css";

function Toast({ text }) {
  useEffect(() => {
    var x = document.getElementById("snackbar");

    if (x) {
      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 3000);
    }
  }, []);

  return <div id="snackbar">{text}</div>;
}

export default Toast;
