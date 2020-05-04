import React from "react";
import MyCard from "../myCard/myCard";
import "./cardCollection.sass";

const CardCollection = ({ cardList, className, cardItems, ...rest }) => {
  return (
    <div className={className ? className + " cards" : "cards"}>
      {cardList.map((cardRow) => (
        <MyCard
          key={cardRow.title}
          buttonText={cardRow.buttonText}
          title={cardRow.title}
          description={cardRow.description}
          buttonLink={cardRow.buttonLink}
          className="card-obj"
          items={cardItems}
        />
      ))}
    </div>
  );
};

export default CardCollection;
