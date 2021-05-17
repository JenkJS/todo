/* eslint-disable no-undef */

import classNames from 'classnames'
import './List.scss'
import removeIcon from '../../assets/icons/remove.svg'


const List = ({items, addList, isRemovable, remove, selectTask}) => {
  
    return (
<div>
<ul onClick={addList} className="list">
           {items.map((item, index) => (
        <li onClick={()=>(selectTask(item))} key={index} className={classNames(item.className, {active: item.active})}>
          <i> {item.icon ? item.icon : <i className={`badge badge--${item.color}`}></i>}</i>
          <span>{item.name}</span>
          {isRemovable && <img onClick={()=>remove(item)} className="list__remove-icon" src={removeIcon} alt="Remove icon"/>}
        </li>
      ))}
        </ul>
</div> 
    )
}
export default List
