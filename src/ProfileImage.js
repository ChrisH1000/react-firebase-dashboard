import React, { useRef, useState, useEffect } from 'react';
import { getDownloadURL, uploadImage } from './firebase/user';

export const ProfileImage = ({id}) => {
  const fileInput = useRef(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    getDownloadURL(id)
      .then(url => !!url && setImageUrl(url))
  }, [id]);

  const fileChange = async (files) => {
    const ref = await uploadImage(id, files[0], updateProgress);
    const downloadUrl = await ref.getDownloadURL();
    console.log(downloadUrl)
    setImageUrl(downloadUrl);
  }

  const updateProgress = snapshot => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setUploadProgress(progress);
  }

  return (
    <div className="four wide column profile-image">
      <img
       className="ui image"
       src={imageUrl || "/profile-placeholder.png"}
       alt="Profile"
      />
      <input
        className="file-input"
        type="file"
        accept=".png,.jpg"
        ref={fileInput}
        onChange={(e) => fileChange(e.target.files)}
      />
      <progress style={{width: "100%"}} value={uploadProgress} max="100" />
      <button
        className="ui grey button upload-button"
        onClick={() => fileInput.current.click()}
      >
        Upload Photo
      </button>
    </div>
  )
}