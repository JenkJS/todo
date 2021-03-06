import "./index.scss";
import List from "./components/List";
import AddListButton from "./components/AddListButton";
import { useState, useEffect } from "react";
import ToDoList from "./components/ToDoList";
import axios from "axios";
import { Route, useHistory, useLocation } from "react-router-dom";

function App() {
  const [selectedTask, setSelectTask] = useState(null);
  const [listItem, setListItem] = useState(null);
  const [colorItem, setColorItem] = useState(null);
  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setListItem(data);
      })
      .catch(() => {
        alert("Errr");
      });
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColorItem(data);
    });
  }, []);

  const addTask = (obj) => {
    const updateList = [...listItem, obj];
    setListItem(updateList);
  };
  const del = (idx) => {
    const newList = listItem.filter((item) => item.id !== idx);
    setListItem(newList);
  };
  const editedTitle = (idx, title) => {
    const updateList = listItem.map((item) => {
      if (item.id === idx) {
        item.name = title;
      }
      return item;
    });
    setListItem(updateList);
  };
  const removeTask = (listId, taskId) => {
    if (window.confirm("Are you you want to delete the selected task?")) {
      const updateList = listItem.map((item) => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter((task) => task.id !== taskId);
        }
        return item;
      });
      setListItem(updateList);
      axios
        .delete("http://localhost:3001/tasks/" + taskId)
        .catch(() => alert("Err"));
    }
  };

  const editTask = (listId, taskId, titleTask) => {
    const updateList = listItem.map((item) => {
      if (item.id === listId) {
        item.tasks.map((task) => {
          if (task.id === taskId) {
            task.text = titleTask;
          }
          return task
        });
      }
      return item;
    });
    setListItem(updateList);
  };
  const onCheckedTask = (listId, taskId, completed) => {
    const updateList = listItem.map((item) => {
      if (item.id === listId) {
        item.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed;
            console.log(task.completed);
          }
          return task;
        });
      }
      return item;
    });
    setListItem(updateList);
    axios
      .patch("http://localhost:3001/tasks/" + taskId, {
        completed,
      })
      .catch(() => {
        alert("Error");
      });
  };

  const newTaskItem = (obj) => {
    const newListItem = listItem.map((item) => {
      if (item.id === obj.listId) {
        item.tasks = [...item.tasks, obj];
      }
      return item;
    });
    setListItem(newListItem);
  };

  useEffect(() => {
    const listId = location.pathname.split("lists/")[1];
    if (listItem) {
      const list = listItem.find((list) => list.id === Number(listId));
      setSelectTask(list);
    }
  }, [listItem, location.pathname]);

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          selectTask={(itm) => {
            history.push(`/`);
          }}
          items={[
            {
              active: !selectedTask,
              icon: (
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.96 5.10001H5.74001C5.24321 5.10001 5.20001 5.50231 5.20001 6.00001C5.20001 6.49771 5.24321 6.90001 5.74001 6.90001H10.96C11.4568 6.90001 11.5 6.49771 11.5 6.00001C11.5 5.50231 11.4568 5.10001 10.96 5.10001ZM12.76 9.60001H5.74001C5.24321 9.60001 5.20001 10.0023 5.20001 10.5C5.20001 10.9977 5.24321 11.4 5.74001 11.4H12.76C13.2568 11.4 13.3 10.9977 13.3 10.5C13.3 10.0023 13.2568 9.60001 12.76 9.60001ZM5.74001 2.40001H12.76C13.2568 2.40001 13.3 1.99771 13.3 1.50001C13.3 1.00231 13.2568 0.600006 12.76 0.600006H5.74001C5.24321 0.600006 5.20001 1.00231 5.20001 1.50001C5.20001 1.99771 5.24321 2.40001 5.74001 2.40001ZM2.86001 5.10001H1.24001C0.743212 5.10001 0.700012 5.50231 0.700012 6.00001C0.700012 6.49771 0.743212 6.90001 1.24001 6.90001H2.86001C3.35681 6.90001 3.40001 6.49771 3.40001 6.00001C3.40001 5.50231 3.35681 5.10001 2.86001 5.10001ZM2.86001 9.60001H1.24001C0.743212 9.60001 0.700012 10.0023 0.700012 10.5C0.700012 10.9977 0.743212 11.4 1.24001 11.4H2.86001C3.35681 11.4 3.40001 10.9977 3.40001 10.5C3.40001 10.0023 3.35681 9.60001 2.86001 9.60001ZM2.86001 0.600006H1.24001C0.743212 0.600006 0.700012 1.00231 0.700012 1.50001C0.700012 1.99771 0.743212 2.40001 1.24001 2.40001H2.86001C3.35681 2.40001 3.40001 1.99771 3.40001 1.50001C3.40001 1.00231 3.35681 0.600006 2.86001 0.600006Z"
                    fill="#7C7C7C"
                  />
                </svg>
              ),
              name: "All Task",
              // active: true,
            },
          ]}
        />
        {listItem ? (
          <List
            selectTask={(itm) => {
              history.push(`/lists/${itm.id}`);
              // console.log(itm)
            }}
            selectedTask={selectedTask}
            remove={del}
            items={listItem}
            isRemovable
          />
        ) : (
          "...loading"
        )}
        <AddListButton addItem={addTask} list={listItem} colors={colorItem} />
      </div>
      <div className="todo__tasks">
        <Route exact path="/">
          {listItem &&
            listItem.map((items) => (
              <ToDoList
                editTask={editTask}
                key={items.id}
                removeTask={removeTask}
                newTaskItem={newTaskItem}
                list={items}
                editTitle={editedTitle}
                isEmpty
                onCheckedTask={onCheckedTask}
              />
            ))}
        </Route>
        <Route path="/lists/:id">
          {selectedTask && (
            <ToDoList
              editTask={editTask}
              removeTask={removeTask}
              newTaskItem={newTaskItem}
              list={selectedTask}
              editTitle={editedTitle}
              onCheckedTask={onCheckedTask}
            />
          )}
        </Route>
      </div>
    </div>
  );
}

export default App;
