import { useState, useEffect, useRef, useCallback } from 'react';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const reset = useCallback(() => {
    setUsers(previousUserList.current);
  }, [])

  const deleteUser = useCallback((email) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  }, [users])

  return { users, loading, error, reset, deleteUser };
}