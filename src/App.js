import React, {useState} from 'react';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import './App.css';
import _ from "lodash";
import {v4} from "uuid";

const item = {
  id: v4(),
  name: "Clean the house"

}

const item2 = {
  id: v4(),
  name: "Wash the Car"

}

function App() {
  const [text, setText] = useState("")
  const [state, setState] = useState({
    "todo": {
      title: "Todo",
      items: [item,item2]
    },
    "in-progress": {
      title: "In Progress",
      items: []
    },
    "done": {
      title: "Completed",
      items: []
    }
  })

  const handleDragEnd = ({destination, source}) => {
    console.log("from", source)
    console.log("to", destination)

    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    const itemCopy = {...state[source.droppableId].items[source.index]}
    
    
    setState(prev => {
      console.log(prev)
      prev = {...prev}

      console.log(source)

      prev[source.droppableId].items.splice(source.index, 1)

      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
    })
    console.log(itemCopy)

  }

  const removeTask = (data, key, taskId) => {
    console.log(taskId)
    console.log(data)
    console.log(key)

    /*
    setState(prev => {
      if prev.d
    })
    */
  
  }
  
  const addItem = () => {
    setState(prev => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: [
            {
              id: v4(),
              name: text
            },
            ...prev.todo.items
          ]
        }
      }
    })

    setText("")
  }


  return (
    <div className="App">
      <div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        <button onClick={addItem}>Add</button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return (
            <div key={key} className={"column"}>
              <h3>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided, snapshot) =>{
                  return(
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                    
                    >
                      {data.items.map((el, index) => {
                        return(
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided, snapshot) => {
                              console.log(snapshot)
                              return(
                                <div
                                  className={"item"}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  
                                >
                                  <div>{el.name}</div>
                                  <div onClick={() => removeTask(data, key, el.id)}><img src="/assets/images/closeIcon.png" width="10px"/></div>
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                    {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
