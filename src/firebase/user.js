import { firestore, storage } from './config';

export const createUserDocument = async (user) => {
  const docRef = firestore.doc(`/users/${user.uid}`);

  const userProfile = {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    specialty: '',
    ip: ''
  }

  return docRef.set(userProfile);
}

export const updateUserDocument = async (user) => {
  const docRef = firestore.doc(`/users/${user.uid}`);
  return docRef.update(user);
}

export const uploadImage = (userId, file, progress) => {
  return new Promise((resolve, reject) => {
    // create file reference
    const filePath = `users/${userId}/profile-image`;
    const fileRef = storage.ref().child(filePath);

    // upload task
    const uploadTask = fileRef.put(file);

    uploadTask.on(
      'state_changed',
      (snapshot) => progress(snapshot),
      (error) => reject(error),
      () => {
        resolve(uploadTask.snapshot.ref);
      }
    );
  })
}

export const getDownloadURL = (userId) => {
  const filePath = `users/${userId}/profile-image`;
  return storage.ref().child(filePath).getDownloadURL();
};
