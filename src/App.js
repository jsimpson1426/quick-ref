import React from "react";
import "./App.css";
import Card from "./components/common/card/card";

function App() {
  return (
    <div className="App">
      <Card
        buttonText="View Material"
        title="Title One"
        description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget"
        buttonLink="#"
        className="m-2 card-obj"
      />
    </div>
  );
}

export default App;
