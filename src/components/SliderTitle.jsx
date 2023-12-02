import React from "react";

const SliderTitle = ({ head, title }) => {
  return (
    <div className="slider-title relative w-100 mb-1 flex justify-center">
      <h2 style={{ background: "white",fontWeight:"200" }}>
        <span className="rubik" style={{fontWeight:"bold",marginRight:"10px"}}>{head}</span>
        {title}
      </h2>
    </div>
  );
};

export default SliderTitle;
