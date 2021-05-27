import React, { useState, useEffect } from "react";
import axios from 'axios'

import List from "../List";
import "./AddListPopup.scss";
import Badge from "../Badge";

import closeImg from "../../assets/icons/close.svg";

function AddListButton({ colors, addItem }) {
  const [visible, setVisible] = useState(false);
  const [selectedColor, selectColor] = useState(3);
  const [inputValue, setInputValue] = useState("");

  useEffect(()=>{
    if(Array.isArray(colors)){
      selectColor(colors[0].id)
    }
  },[colors])

  const addItemTask = () => {
   
    axios.post('http://localhost:3001/lists',{
      name: inputValue,
      colorId: selectedColor
    }).then(({data})=>{
      const color =  colors.filter(c => c.id === selectedColor)[0]
      const objList = {
        ...data, color, tasks: []
      }
      addItem(objList)
      setVisible(false)
    })

    
   
  } 

  const click = () => {
    setVisible(!visible);
    selectColor(colors[0].id);
    setInputValue('')
  };
  return (
    <div className="add-list">
      <List
        addList={click}
        items={[
          {
            className: "list__add-button",
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 1V11"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 6H11"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: "Add task",
          },
        ]}
      />
      {visible && (
        <div className="add-list__popup">
          <img
            onClick={() => setVisible(false)}
            className="closeBtn"
            src={closeImg}
            alt="Close"
          />
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Task name"
          />
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                key={color.id}
                color={color.name}
                setColor={() => selectColor(color.id)}
                className={selectedColor === color.id && "active"}
              />
            ))}
          </div>
          <button onClick={addItemTask} className="button">Add Task</button>
        </div>
      )}
    </div>
  );
}

export default AddListButton;
