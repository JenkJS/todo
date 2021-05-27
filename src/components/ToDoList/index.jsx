import React from "react";
import axios from 'axios'
import "./ToDoList.scss";
import editorSvg from "../../assets/icons/editor.svg";
import AddTask from './AddTask';
import Tasks from './Tasks';
import { Link } from 'react-router-dom'

function ToDoList({ list, editTitle, newTaskItem, isEmpty, removeTask, editTask, onCheckedTask }) {
const selectEdit = () => {
  const newTitleName = window.prompt('Title task name', list.name)
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
      <Link to={`/lists/${list.id}`}>
      <h2 style={{color: list.color.hex}} className="tasks__title">
        {list.name}
        <img
        onClick={selectEdit} 
        src={editorSvg} alt="Edit" />
      </h2></Link>
      <div className="tasks__list">
          {!isEmpty && list.tasks && !list.tasks.length &&
          <h2> Tasks list is empty </h2>
          }
        { list.tasks && list.tasks.map((item) => (
         <Tasks onChecked={onCheckedTask} list={list} onEdit={editTask} onRemove={removeTask} key={item.id} item={item} />
         )) }
        <AddTask key={list.id} list={list} newTaskItem={newTaskItem}/>
      </div>
    </div>
  );
}

export default ToDoList;
