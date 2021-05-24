import React from "react";
import axios from 'axios'
import "./ToDoList.scss";
import editorSvg from "../../assets/icons/editor.svg";
import AddTask from './AddTask';

function ToDoList({ list, editTitle, newTaskItem }) {
const selectEdit = () => {
  const newTitleName = window.prompt('Task name', list.name)
  if(newTitleName){
    editTitle(list.id, newTitleName)
  }
  axios.patch('http://localhost:3001/lists/' + list.id, {
    name: newTitleName
  }).catch(()=>{
    alert("Error")
  })
}

  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list.name}
        <img
        onClick={selectEdit} 
        src={editorSvg} alt="Edit" />
      </h2>
      <div className="tasks__list">
          {!list.tasks.length &&
          <h2> Tasks list is empty </h2>
          }
        { list.tasks.map((item) => (
          <div key={item.id} className="tasks__list-items">
            <div className="checkbox">
              <input id={`task-${item.id}`} type="checkbox"/>
              <label htmlFor={`task-${item.id}`}>   
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
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
            </div>
            <input readOnly value={item.text} />
          </div>
        )) }
        <AddTask list={list} newTaskItem={newTaskItem}/>
      </div>
    </div>
  );
}

export default ToDoList;
