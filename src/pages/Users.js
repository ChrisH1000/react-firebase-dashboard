import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = firestore.collection('users');
    const unsubscribe = usersRef.onSnapshot(querySnapshot => {
      const users = querySnapshot.docs.map(doc => doc.data());
      setUsers(users);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <table className="ui selectable celled table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Specialty</td>
            <td>Secret Address</td>
            <td>Phone</td>
            <td>IP Address</td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.specialty}</td>
              <td>
                {user.address} {user.city}, {user.state} {user.zip}
              </td>
              <td>{user.phone}</td>
              <td>{user.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;