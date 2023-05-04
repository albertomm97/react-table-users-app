import './App.css'

import { useEffect, useState, useRef, useMemo } from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [color, setColor] = useState(false);
  const [sort, setSort] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const previousUserList = useRef(users);

  useEffect(() => {
    setLoading(true);
    fetch(`https://randomuser.me/api/?results=100`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      return response.json()
    })
    .then((data) => {
      setUsers(data.results)
      previousUserList.current = data.results;
      setError(null);
    })
    .catch((error) => {
      console.log(error.message);
      setError(error.message);
    })
    .finally(() => {
      setLoading(false);
    })
  }, [])

  const handleDelete = ({ email }) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  }

  const handleReset = () => {
    setUsers(previousUserList.current);
  }

  const handleChangeColor = () => {
    setColor(prev => !prev);
  }

  const handleInputChange = (event) => {
    setFilterValue(event.target.value);
  }

  const handleSortParameter = (param) => {
    setSort(param);
  }

  const sortedUsers = useMemo(() => {
    console.log('sorting users');
    const parameters = {
      'firstName': user => user.name.first,
      'lastName': user => user.name.last,
      'country': user => user.location.country,
    }

    const func = parameters[sort];

    return sort ? [...users].sort((a, b) => func(a).localeCompare(func(b))) : users;
  }, [users, sort])

  const filtererdUsers = useMemo(() => {
    console.log('filtering');
    return sortedUsers.filter((user) => user.location.country.toLowerCase().includes(filterValue.toLowerCase()));
  }, [filterValue, sortedUsers])

  return (
    <div className='app'>
      <header>
        <div className='actions'>
          <button onClick={handleChangeColor}>Change color</button>
          <button onClick={() => handleSortParameter('country')}>{sort ? 'Remove sorting' : 'Sort by country'}</button>
          <button onClick={handleReset}>Reset</button>
          <input placeholder='Australia..' value={filterValue} onChange={handleInputChange} />
        </div>
        <div>
        {error && <p>Error</p>}
        {!error && loading && <p>Loading...</p>}
        </div>
      </header>
      <main className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th onClick={() => handleSortParameter('firstName')}>Name</th>
              <th onClick={() => handleSortParameter('lastName')}>Last Name</th>
              <th onClick={() => handleSortParameter('country')} >Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className={color ? 'colorized' : ''}>
            {filtererdUsers.map((user) => {
              return (
              <tr key={user.email}>
                <td><img className='user-photo' src={user.picture.thumbnail} /></td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={() => handleDelete(user)}>Delete</button>
                </td>
              </tr>)
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App
