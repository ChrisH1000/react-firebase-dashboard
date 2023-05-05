var admin = require("firebase-admin");

var serviceAccount = require("./react-grid-dashboard-b32e6-firebase-adminsdk-vmxwv-c97a6d2b46.json");

var uid = process.argv[2];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log('custom claims set for user', uid);
    process.exit();
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  })