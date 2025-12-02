import React from 'react';


export default function UserCard({T,X1,Y1,X2,Y2,X3,Y3}) {
  return (
    <div className="users-box">
      <h3 className="title"> {T}</h3>
      <div className="row-item"><span>{X1}</span><span className="num blue">{Y1}</span></div>
      <div className="row-item"><span>{X2}</span><span className="num purple">{Y2}</span></div>
      <div className="row-item"><span>{X3}</span><span className="num red">{Y3}</span></div>
    </div>
  );
}
