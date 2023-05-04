import './App.css'

import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([]);
  const [color, setColor] = useState(false);

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=100`)
    .then((response) => response.json())
    .then((data) => setUsers(data.results));
  }, [])

  const handleDelete = () => {

  }

  const handleChangeColor = () => {
    setColor(prev => !prev);
  }

  return (
    <div className='app'>
      <div className='actions'>
        <button onClick={handleChangeColor}>Change color</button>
      </div>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className={color ? 'colorized' : ''}>
            {users.map((user) => {
              return (
              <tr key={user.email}>
                <td><img className='user-photo' src={user.picture.thumbnail} /></td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={handleDelete}>Delete</button>
                </td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App
