import React, {useEffect, useRef, useState} from 'react';
import {v4 as uuidv4} from "uuid";
import './App.css';
import Flex from "./components/flex/flex"
 

function App() {
  const [newTodo, setNewTodo] =useState("");
  // const [editTodo, setEditTodo] =useState("");

  const [todos] = useState(
    [
      {
        title: "Marz",
        id: uuidv4().substring(0,5),
        isDone: true,
      },
      {
        title: "Agil",
        id: uuidv4().substring(0,5),
        isDone: false,
      },
      {
        title: "Code",
        id: uuidv4().substring(0,5),
        isDone: true,
      }
    ]
  );
  
  const [selectTodos, setSelectTodos] = useState(
    todos.map(todo => {
      return {...todo, isSelected: false }
    })
  );

  const checkboxRef = useRef(null);

  useEffect(()=>{
    let selectedCount = 0;

    selectTodos.forEach((todo)=>{
      if(todo.isSelected){
        selectedCount++;
      }
    })
    if(selectedCount === 0){
      checkboxRef.current.indeterminate = false;
      checkboxRef.current.checked = false;
    }
    else if(selectedCount === selectTodos.length){
      checkboxRef.current.indeterminate = false;
      checkboxRef.current.checked = true;

    }
    else{
      checkboxRef.current.indeterminate = true;
      checkboxRef.current.checked = false;
    }
  },[selectTodos]);

  // const handleEdit = (title) => {
  //   return () => {
  //     setSelectTodos((prevTodos) => {
  //       prevTodos.forEach(todo => {
  //         setEditTodo(newTodo);
  //         if(todo.title === title){
  //           return [
  //             ...prevTodos,
  //             {
  //               title: editTodo,
  //               id: uuidv4().substring(0,5),
  //               isDone: false,
  //             }
  //           ];
  //         }
  //       })
  //     })}};

  const handleDelete = (id) => {
    return () => {
      setSelectTodos((prevTodos) => {
        return prevTodos.filter(todo => {
          if(todo.id === id)
          {
            return false;
          }
          else{
            return todo;
          }
        });
      });
    };
  };
  

  const handleClick = (id) => () => { 
    setSelectTodos(
      selectTodos.map(todo => {
      if(todo.id === id ){
        return { ...todo, isDone: !todo.isDone};
      }
      return todo;
    })
    );
  };

  const handleCreate =() => {
    if(!newTodo){
      alert("you should enter your todo title first");
      return;
    }
    setSelectTodos((prevTodos)=>{
      return [
        ...prevTodos,
        {
          title: newTodo,
          id: uuidv4().substring(0,5),
          isDone: false,
        }
      ];
    });
    setNewTodo("");
  };


  const handleCheckboxChange = (state,id) => {
    return () => {
        setSelectTodos(
          (prevTodos) => {
          return prevTodos.map((todo)=>{
            if(todo.id === id){
              return {...todo, isSelected: !todo.isSelected}
            }
            return todo;
          })
        })
    }
  }

  const handleRootCheckboxChange = () => {
    if(selectTodos.every(selectTodo=> selectTodo.isSelected)){
      setSelectTodos(
        (prevTodos) => {
        return prevTodos.map((todo)=>{
            return {...todo, isSelected: false}
        })
      })
    }
    else if(selectTodos.some((selectTodo) => selectTodo.isSelected)){
      setSelectTodos(
        (prevTodos) => {
        return prevTodos.map((todo)=>{
            return {...todo, isSelected: false}
        })
      })
    }
    else{
      setSelectTodos(
        (prevTodos) => {
        return prevTodos.map((todo)=>{
            return {...todo, isSelected: true}
        })
      })
    }
  }

  const handleDeleteSelected = () =>{
      setSelectTodos((prevTodos)=> {
       return prevTodos.filter(todo => ! todo.isSelected)
      }) 
  }

  return (
    <div style={{width: "50%", margin: "50px auto"}}>
      <h1>TODO list</h1>
      <Flex>
          <input type="text" placeholder={"Enter your todo"} value={newTodo} onChange={(e) =>{
            setNewTodo(e.target.value);
          }}
          onKeyUp={(e) =>{
            if(e.key === "Enter")
            {
              handleCreate();
            }
          }}
          style={{width: "50%", padding:"10px", outline:"none",}}
          />

          <button 
          onClick={
            handleCreate
          } 
          style={{padding:"7.5px 10px 10px 10px",width:"120px"}}>
            📌
          </button>
      </Flex>

        <Flex>
        <input type="checkbox" 
          style={{
            display: "inline-block",
            width: '17px',
            height: '17px',
            marginTop:'10px'}}

            onChange={handleRootCheckboxChange}
            ref={checkboxRef}
        /> 
          {selectTodos.some((selectTodo) => selectTodo.isSelected) 
            ? <button onClick={handleDeleteSelected} style={{padding:'3px',marginTop:'4px',color:'#d00'}}>Delete selects</button>
            : null }          
        </Flex>
      
      <ul style={{
        paddingLeft: "0",
        listStyle: "none",
      }}>
        {selectTodos.map((todo) => {
          return(
            <li style={{
              transition: ".5s",
              background : todo.isDone 
              ? "linear-gradient(to right, #3df87c, #90c2c1 )" 
              : "linear-gradient(to right, #eee, #ede )",
              color : todo.isDone ? "#fff" : "initial",
              padding: "10px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              }}
              key={todo.id}
              >
              <div>
              <input type={'checkbox'} style={{  
                display: "inline-block",
                width: '20px',
                height: '20px',
                margin:"0 10px 0 0", 
                }}
                onChange={handleCheckboxChange('single',todo.id)}
                checked={todo.isSelected}/>

              <span style={{
                color: "black", 
                textDecoration : todo.isDone ? "line-through" : "initial",
                }}>
                  # {todo.id} | {todo.title}
              </span>
              </div>
              <div>
                <button onClick={handleDelete(todo.id)}>✖</button>
                <button style={{width:"25px",marginLeft:"5px",border: "0.1px solid #777", padding: "2px", background: todo.isDone ? "linear-gradient(to right, #eee, #ede )" : "linear-gradient(to right, #3df87c, #90c2c1 )" , color: "black" }} type="button" onClick={
                  handleClick(todo.id)
                }>
                  {todo.isDone ? "➖" : "✔"}
                </button>
                <button style={{marginLeft:"5px", height:'24px' }}>
                  📝
                </button>
              </div>
            </li>
      );
      })}</ul>
    </div>
  );
}

export default App;
