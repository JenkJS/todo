/* eslint-disable no-undef */

import classNames from "classnames";
import axios from "axios"
import "./List.scss";
import removeIcon from "../../assets/icons/remove.svg";

const List = ({ items, addList, isRemovable, remove, selectTask, selectedTask }) => {
const removeItem = (item)=>{
  axios.delete('http://localhost:3001/lists/'+ item.id).then(()=>{
    remove(item.id)
  })
}
  return (
    <div>
      <ul onClick={addList} className="list">
        {items.map((item, index) => (
          <li
            onClick={ selectTask ? () => (selectTask(item)) : null}
            key={index}
            className={classNames(item.className, { active: item.active ? item.active : selectedTask && selectedTask.id === item.id })}
          >
            <i>
              {" "}
              {item.icon ? (
                item.icon
              ) : (
                <i className={`badge badge--${item.color.name}`}></i>
              )}
            </i>
            <span>{item.name}{item.tasks && item.tasks.length > 0 ? ` (${item.tasks.length})` : ''}</span>
            {isRemovable && (
              <img
                onClick={() => removeItem(item)}
                className="list__remove-icon"
                src={removeIcon}
                alt="Remove icon"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default List;
