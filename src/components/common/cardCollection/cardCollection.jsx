import React from "react";
import MyCard from "../myCard/myCard";
import "./cardCollection.sass";

const CardCollection = ({ cardList, className, cardItems, onTagAdd, ...rest }) => {
  return (
    <div className={className ? className + " cards" : "cards"}>
      {cardList.map((card) => (
        <MyCard
          key={card._id}
          buttonText={"View Material"}
          cardData={card}
          className="card-obj"
          items={cardItems}
          onTagAdd={onTagAdd}
        />
      ))}
    </div>
  );
};

export default CardCollection;
