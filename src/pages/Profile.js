import React, { useEffect, useState } from 'react';
import { useSession } from '../firebase/UserProvider';
import { firestore } from '../firebase/config';

const Profile = () => {
  const { user } = useSession();
  const [userDocument, setUserDocument] = useState(null);

  useEffect(() => {
    const docRef = firestore.collection('users').doc(user.uid);
    console.log(docRef)
    docRef.get().then((document) => {
      console.log(document)
      if (document.exists) {
        setUserDocument(document.data())
      }
    })
  }, [user.uid]);

  if (!userDocument) {
    return null;
  }

  return (
    <div>
      <p>{JSON.stringify(userDocument)}</p>
    </div>
  )
}

export default Profile;