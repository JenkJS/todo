import React, { useState } from "react";
import axios from 'axios'
import addTaskSvg from "../../assets/icons/addTask.svg"
function AddTask({list, newTaskItem}) {

    const [visableForm, setVisableForm] = useState(false)
  const [inputValue, setInputValue] = useState("");

    
    const viewForm = () => {
        setVisableForm(!visableForm)
    }


    const newTasks = (value) => {
        const newTaskItems = 
        {
            "listId": list.id,
            "text": value,
            "completed": false
        }
        axios.post('http://localhost:3001/tasks', newTaskItems).then(({data})=>{
            newTaskItem(data)
        })
        setVisableForm(false)
        }

  return (
    <div className="tasks__form">
      {!visableForm ? <div onClick={viewForm} 
      className="tasks__form-new">
        <img src={addTaskSvg} alt="Add icon" />
        <span>New task</span>
      </div>
      : <div className="tasks__form-field">
      <input
            value={inputValue}
            onChange={e=>setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Task name"
         />
          <button onClick={()=>(newTasks(inputValue))} className="button">Add Task</button>
          <button onClick={viewForm} className="button button--grey">Cancel</button>

      </div>}
    </div>
  );
}

export default AddTask;
