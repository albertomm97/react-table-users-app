import { useState, useEffect, useRef, useCallback } from 'react';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const previousUserList = useRef(users);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://randomuser.me/api/?results=10&seed=app&page=${currentPage}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      return response.json();
    })
    .then((data) => {
      setUsers((prevUsers) => {
        const newUsers = [...prevUsers, ...data.results];
        previousUserList.current = newUsers;
        return newUsers;
      })
    })
    .catch((error) => {
      setError(error.message);
    })
    .finally(() => {
      setLoading(false);
    })
  }, [currentPage])

  const reset = useCallback(() => {
    setUsers(previousUserList.current);
  }, [previousUserList])

  const deleteUser = useCallback((email) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  }, [users])

  const updatePage = () => {
    setCurrentPage(currentPage + 1);
  };

  return { users, loading, error, reset, deleteUser, updatePage };
}