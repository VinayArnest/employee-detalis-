var admin = require("firebase-admin");

var serviceAccount = require("C:/Users/Admin/projects/employee_desk/src/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://practise-b37c8-default-rtdb.firebaseio.com"
});
let uid = ''
function deleteUser(uid) {
    admin.auth().deleteUser(uid)
        .then(function() {
            console.log('Successfully deleted user', uid);
        })
        .catch(function(error) {
            console.log('Error deleting user:', error);
        });
}

function getAllUsers(nextPageToken) {
    admin.auth().listUsers(100, nextPageToken)
        .then(function(listUsersResult) {
            listUsersResult.users.forEach(function(userRecord) {
                uid = userRecord.toJSON().uid;
                deleteUser(uid);
            });
            if (listUsersResult.pageToken) {
                getAllUsers(listUsersResult.pageToken);
            }
        })
        .catch(function(error) {
            console.log('Error listing users:', error);
        });
}

getAllUsers();