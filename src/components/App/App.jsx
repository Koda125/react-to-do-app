import { useState, useEffect } from 'react';
import TableUpdate from '../TableUpdate/TableUpdate';
import Axios from 'axios';

function App () {

  const [ newToDo, setNewToDo ] = useState( '' );
  const [ toDos, setToDos ] = useState( [] );

useEffect(() => {
  onRender()
}, []);
function onRender( ) {
  Axios({
    method: "GET",
    url: '/api/todos'
  })
  .then((response) => {
      console.log('getting our list!')
      //render function will initiate here:
        setToDos(response.data)
  })
      .catch((error) => {
          console.log('There has been an error, please send this to the FBI for further analysis')
      //     app.sendStatus(500)
      })
  
  };
  
function addToDo(  ) {
  
  console.log('new To Do: ', newToDo)
  setToDos( [...toDos, newToDo] )
  console.log('The list so far: ', newToDo)
  Axios({
    method: 'POST',
    url: '/api/todos',
    data: {
      text: newToDo,
      isComplete: false
    }
})
.then((response) => {
    console.log('POST new To Do', toDos)
    onRender()
})
.catch((error) =>{
    console.log('Error has occured', error)
    // alert('Warning, crital meltdown near. Please refer to your end of times handbook under your desk.')
    // app.sendStatus(500)
})
}

function deleteToDo( id ) {
  // console.log('In the delete function')
  // const removedItem = [...toDos]
  // removedItem.pop(todo.id)
  // setToDos(removedItem)

  Axios ({
    method: "DELETE",
    url: "/api/todos",
    data: {id: id }
  })
  .then((response) => {
    console.log('Deleting requested ToDo: ', response.data)
    onRender()
  })
  .catch((error) => {
    console.log('An error has occured in your delete request: ', error)
  })
}

  return (
    <div>
      <h1>Your TO DO List</h1>
      <input type='text' placeholder='Add To Do' size={40} onChange={(e)=>{setNewToDo(e.target.value)}}/>
      <br />
      <p>{newToDo}</p>
      <br />
      <button onClick={ addToDo }>Add</button>
      <hr />
      <table>
        <thead>
          <tr>
            <th>To Do Item</th>
            <th>Completed?</th>
            <th>Delete?</th>
          </tr>
        </thead>
        <tbody>
          
            {toDos.map( ( toDo, index )=> (
            <tr key={index}> 
              <td>{toDo.text}</td>
              <td>{toDo.isComplete}</td>
              <td>
                <button onClick={ () => deleteToDo( toDo.id ) }>Remove</button>
              </td>
            </tr>
            ))}
          
          
          {/* <TableUpdate toDos={ toDos } setToDos= { setToDos } newToDo={ newToDo } deleteToDo={ deleteToDo }/> */}
          
        </tbody>
      </table>

    </div>
  );

}

export default App
