import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext";
import useLoadMessages from "./useLoadMessages";

export default function DisplayMessages() {
    const { display,setDisplay } = useContext(UserContext);
    useLoadMessages();
    const newDisplay = [...Object.values(display)].reverse();
    console.log(newDisplay);
  return (
    <>
    {display.map((i,index) => {
        return (
        <React.Fragment key={index}>
<div className="flex items-center justify-center  bg-base-100">
  <div className="card bg-primary text-primary-content w-150">
    <div className="card-body">
      <h2 className="card-title">{i.author.charAt(0).toUpperCase() + i.author.slice(1)} - {new Date(i.date).toISOString().split("T")[0]}</h2>
       <textarea value={i.input} disabled></textarea>
    </div>
  </div>
</div>
<div className="flex items-center justify-center">
  <div className="divider divider-info w-175"></div>
</div>


      </React.Fragment>
        )
    })}
       </>
  )
}