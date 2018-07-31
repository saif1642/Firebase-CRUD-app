 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBw78hkijEC9D9DpBkqP1iGRrHSUq2yb_A",
    authDomain: "url-holder.firebaseapp.com",
    databaseURL: "https://url-holder.firebaseio.com",
    projectId: "url-holder",
    storageBucket: "url-holder.appspot.com",
    messagingSenderId: "193427858763"
  };
  firebase.initializeApp(config);
  const dbRef = firebase.database().ref();
  const usersRef = dbRef.child('users');
  const userListUI = document.getElementById("userList");
  const addUserBtnUI = document.getElementById("add-user-btn");
  addUserBtnUI.addEventListener("click", addUserBtnClicked);
  const addUserInputsUI = document.getElementsByClassName("user-input");
  function addUserBtnClicked(){
    let newUser = {};
    // loop through View to get the data for the model 
    for (let i = 0, len = addUserInputsUI.length; i < len; i++) {
 
     let key = addUserInputsUI[i].getAttribute('data-key');
     let value = addUserInputsUI[i].value;
     newUser[key] = value;
     }
 
     usersRef.push(newUser, function(){
         console.log("data has been inserted");
       }) 

  }

  // edit icon
 let editIconUI = document.createElement("span");
 editIconUI.class = "edit-user";
 editIconUI.innerHTML = " ✎";
 editIconUI.setAttribute("userid", key);
 editIconUI.addEventListener("click", editButtonClicked)
 // Append after li.innerHTML = value.name
 $li.append(editIconUI);

 // show the Edit User Form
 document.getElementById('edit-user-module').style.display = "block";
 //set user id to the hidden input field
 document.querySelector(".edit-userid").value = e.target.getAttribute("userid");
 const userRef = dbRef.child('users/' + e.target.getAttribute("userid"));
 // set data to the user field
 const editUserInputsUI = document.querySelectorAll(".edit-user-input");
 userRef.on("value", snap => {
    for(var i = 0, len = editUserInputsUI.length; i < len; i++) {
     var key = editUserInputsUI[i].getAttribute("data-key");
      editUserInputsUI[i].value = snap.val()[key];
    }
});

const saveBtn = document.querySelector("#edit-user-btn");
saveBtn.addEventListener("click", saveUserBtnClicked);

function saveUserBtnClicked(){
    const userID = document.querySelector(".edit-userid").value;
    const userRef = dbRef.child('users/' + userID);
    let editedUserObject = {};
    const editUserInputsUI = document.querySelectorAll(".edit-user-input");
    editUserInputsUI.forEach(function(textField) {
        let key = textField.getAttribute("data-key");
        let value = textField.value;
        editedUserObject[textField.getAttribute("data-key")] = textField.value
    });
    userRef.update(editUser, function(){
        console.log("user has been updated"); 
    });
    document.getElementById('edit-user-module').style.display = "none";

}


  
 