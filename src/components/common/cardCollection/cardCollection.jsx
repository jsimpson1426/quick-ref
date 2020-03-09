import React from "react";
import MyCard from "../myCard/myCard";
import "./cardCollection.sass";

const CardCollection = ({ cardList, className, ...rest }) => {
  return (
    <div className={className ? className + " cards" : "cards"}>
      {cardList.map(cardRow => (
        <MyCard
          key={cardRow.title}
          buttonText={cardRow.buttonText}
          title={cardRow.title}
          description={cardRow.description}
          buttonLink={cardRow.buttonLink}
          className="card-obj"
        />
      ))}
    </div>
  );
};

export default CardCollection;
