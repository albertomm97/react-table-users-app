import './App.css'

import { useState, useMemo } from 'react';
import { UsersTable }  from './components/UsersTable';
import { useUsers } from './hooks/useUsers';

function App() {
  const { users, loading, error, reset, deleteUser, updatePage } = useUsers();
  const [color, setColor] = useState(false);
  const [sort, setSort] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleDelete = ({ email }) => {
    deleteUser(email);
  }

  const handleReset = () => {
    reset();
  }

  const handleChangeColor = () => {
    setColor(prev => !prev);
  }

  const handleInputChange = (event) => {
    setFilterValue(event.target.value);
  }

  const handleSortParameter = (param) => {
    const newParam = param === sort ? '' : param;
    setSort(newParam);
  }

  const sortedUsers = useMemo(() => {
    if (!sort || sort === '') {
      return users;
    }
    const parameters = {
      'firstName': user => user.name.first,
      'lastName': user => user.name.last,
      'country': user => user.location.country,
    }

    const func = parameters[sort];
    return sort ? [...users].sort((a, b) => func(a).localeCompare(func(b))) : users;
  }, [users, sort])

  const filtererdUsers = useMemo(() => {
    return sortedUsers.filter((user) => user.location.country.toLowerCase().includes(filterValue.toLowerCase()));
  }, [filterValue, sortedUsers])

  return (
    <div className='app'>
      <header>
        <div className='actions'>
          <button onClick={handleChangeColor}>Change color</button>
          <button onClick={() => handleSortParameter('country')}>{sort === 'country' ? 'Remove sorting' : 'Sort by country'}</button>
          <button onClick={handleReset}>Reset</button>
          <input placeholder='Australia..' value={filterValue} onChange={handleInputChange} />
        </div>
      </header>
      <main className='table-container'>
        {users.length > 0 && <UsersTable users={filtererdUsers} handleSortParameter={handleSortParameter} handleDelete={handleDelete} color={color} />}
        {error && !loading && <p>Error</p>}
        {!error && loading && <p>Loading...</p>}
        {!error && !loading && users.length === 0 && <p>There is no users</p>}
        {!error && !loading && <button onClick={() => updatePage()}>Load more results</button>}
      </main>
    </div>
  );
}

export default App
