import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import Hcom from './Hcom';
import { useReducer, useState } from 'react';
let value=0
const reducer=(state,action)=>{
  switch(action){
    case 'add': state=state+1
    break;
    case 'sub': state=state-1
    break;
    case 'mul': state=state*2
  }
}
function App() {
  const [data,setdata]=useState(1)
  const [state, dispatch] = useReducer(reducer,value);
  return (
    <div className="App">
     <h1>{data}</h1>
     <button onClick={()=>setdata(per=>per+1)}>add</button>
     <h1>{state}</h1>
    <button onClick={()=>dispatch('add')}>add</button>
    <button onClick={()=>dispatch('sub')}>sub</button>
    <button onClick={()=>dispatch('mul')}>mul</button>
    </div>
  );
}

export default App;
