import React from "react";
import AppContext from "../context";

type Props = {
  title: string;
  image: string;
  description: string;
};

const Info = ({ title, image, description }: Props) => {

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width="120px" src={image} alt="Empty" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => {}} className="greenButton">
        <img src="img/arrow.svg" alt="Arrow" />
        Повернутися назад
      </button>
    </div>
  );
};

export default Info;
