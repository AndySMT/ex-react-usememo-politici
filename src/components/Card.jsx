import React from "react";

const Card = React.memo(({ politician }) => {
  console.log("render", politician.name);
  return (
    <div className="max-w-sm bg-white rounded-lg overflow-hidden">
      <div className="p-2 flex justify-center items-center">
        <img
          src={politician.image}
          alt={politician.name}
          className="w-auto h-100"
        />
      </div>
      <div className="flex justify-between font-bold m-4">
        <p>{politician.name}</p>
        <p className="italic">{politician.position}</p>
      </div>
      <p className="p-1 m-2">{politician.biography}</p>
    </div>
  );
});

export default Card;
