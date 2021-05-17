import React, { useEffect } from "react";
import "./ToDoList.scss";
import editorSvg from "../../assets/icons/editor.svg";

function ToDoList({ name }) {
  useEffect(() => {
    document.title = `${name}`;
  });
  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {name}
        <img src={editorSvg} alt="Edit" />
      </h2>
      <div className="tasks__list">
        <div className="tasks__list-items">
          <div className="checkbox">
            <input id="check" type="checkbox" />
            <label htmlFor="check">
              <svg
                width="11"
                height="8"
                viewBox="0 0 11 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </label>
          </div>
          <input value="ReactJS Hooks (useState, useReducer, useEffect и т.д.)" />
        </div>
      </div>
      
    </div>
  );
}

export default ToDoList;
