import React from "react";
import MyCard from "../myCard/myCard";
import "./cardCollection.sass";

const CardCollection = ({ cardList, className, cardItems, ...rest }) => {
  return (
    <div className={className ? className + " cards" : "cards"}>
      {cardList.map((card) => (
        <MyCard
          key={card._id}
          buttonText={"View Material"}
          cardData={card}
          // title={card.title}
          // description={card.description}
          // buttonLink={`/viewResource/${card._id}`}
          className="card-obj"
          items={cardItems}
        />
      ))}
    </div>
  );
};

export default CardCollection;
