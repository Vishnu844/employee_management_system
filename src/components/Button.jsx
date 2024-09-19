import React from "react";

const Button = ({ name, styles }) => {
  return (
    <>
      <button className="button" type="submit" style={styles}>
        {name}
      </button>
    </>
  );
};

export default Button;
