import { useState, useEffect } from 'react';
import TableUpdate from '../TableUpdate/TableUpdate';

function App () {

  const [ newToDo, setNewToDo ] = useState( '' );
  const [ toDos, setToDos ] = useState( [] );
  
function addToDo(  ) {
  
  console.log('new To Do: ', newToDo)
  setToDos( [...toDos, newToDo] )
  console.log('The list so far: ', toDos)

}

function deleteToDo( todo ) {
  console.log('In the delete function')
  const removedItem = [...toDos]
  removedItem.pop()
  setToDos(removedItem)
}

  return (
    <div>
      <h1>Your TO DO List</h1>
      <input type='text' placeholder='Add To Do' size={40} onChange={()=>{setNewToDo(event.target.value)}}/>
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
          <tr>
            <td>Walk the dog</td>
            <td>No</td>
            <td>
              <button onClick={ deleteToDo }>Remove</button>
            </td>
          </tr>
          
          {/* <TableUpdate toDos={ toDos } setToDos= { setToDos } newToDo={ newToDo } deleteToDo={ deleteToDo }/> */}
          
        </tbody>
      </table>

    </div>
  );

}

export default App
