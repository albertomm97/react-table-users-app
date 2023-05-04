export function UsersTable ({ users, handleSortParameter, handleDelete, color }) {
  return (
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
        {users.map((user) => {
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
  )
}