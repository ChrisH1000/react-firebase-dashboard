import React
import { UseSession } from '../firebase/UserProvider';

const profile = () => {
  const { user } = useSession();

  if (!user) {
    return null;
  }

  return (
    <div>
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
      <p>ID: {user.uid}</p>
    </div>
  )
}

export default Profile