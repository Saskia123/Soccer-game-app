//var audio = new Audio('stop1.mp3');
//$(".advice").hide();
//$("#posts").hide();



//firebase.auth().onAuthStateChanged(function (user) {
//  if (user) {
//    // User is signed in.
//    $(".advice").hide();
//    $("#posts").show();
//
//  } else {
//    $(".advice").show();
//    $("#posts").hide();
//    // No user is signed in.
//  }
//});
//

var app = new Vue({
    el: '#vue',
    data: {
        schedule: [],
        teams: [],
        locations: [],
        filter: "",
        allGames: [],
        allLocations: [],
        pageLocation: 'teams',
        message:""
    },
    created() {
        fetch('https://api.myjson.com/bins/bzom0')
            .then(response => response.json())
            .then(json => {
                console.log(json)
                app.allGames = json.schedule;
                app.allLocations = json.locations;
                app.teams = json.teams
                //                app.locations = json.locations
            })
    },
    methods: {
        getTeamName: function (id) {
            for (let i = 0; i < this.teams.length; i++) {
                if (this.teams[i].id == id) {
                    return this.teams[i].name;
                }
            }
        },
        getTeamShield: function (id) {
            for (let i = 0; i < this.teams.length; i++) {
                if (this.teams[i].id == id) {
                    return this.teams[i].shield;
                }
            }
        },
        getTeamMembers: function (id) {
            for (let i = 0; this.teams.length; i++) {
                if (this.teams[i].id == id) {
                    return this.teams[i].players;
                }
            }
        },
        getLocationName: function (id) {
            for (let i = 0; this.allLocations.length; i++) {
                if (this.allLocations[i].id == id) {
                    return this.allLocations[i].name;
                }
            }
        },
        goToSchedule: function (id) {
            this.pageLocation = 'schedule';
            this.filterSchedule(id);
        },
        goToTeams: function () {
            this.pageLocation = 'teams';
        },
        goToLocations: function (id) {
            this.pageLocation = 'locations';
            this.filterLocation(id);
        },
        goToChat: function () {
            this.pageLocation = 'chat';
        },
        goToMembers: function (id) {
            this.pageLocation = 'members';
            this.pagePosition(id);
        },
        goToPhotos: function () {
            this.pageLocation = 'photos';
        },
        goToResults: function () {
            this.pageLocation = 'results';
        },
        goToEvents: function () {
            this.pageLocation = 'events';
        },
        filterSchedule: function (id) {
            if (id == "all") {
                this.schedule = this.allGames;
            } else {
                const allGames = this.allGames;
                let filteredSchedule = [];
                for (let i = 0; i < allGames.length; i++) {
                    let game = allGames[i];
                    console.log(game.host, game.visitor, id)
                    if (game.host == id || game.visitor == id) {
                        filteredSchedule.push(game);
                    }
                }
                this.schedule = filteredSchedule;
            }
        },
        filterLocation: function (id) {
            if (id == "all") {
                this.locations = this.allLocations;
            } else {
                const allLocations = this.allLocations;
                let filteredLocation = [];
                for (let i = 0; i < allLocations.length; i++) {
                    let location = allLocations[i];
                    console.log(location.id, id)
                    if (location.id == id) {
                        filteredLocation.push(location);
                    }
                }
                this.locations = filteredLocation;
            }
        },
        pagePosition: function (id) {
            setTimeout(function () {
                window.location = 'index.html#' + id;
                		})
    },
//    login: function () {
//        var provider = new firebase.auth.GoogleAuthProvider();
//        firebase.auth().signInWithPopup(provider)
//            .then(function () {
//                getPosts();
//            })
//            .catch(function () {
//                alert("Something went wrong");
//            });
//    },
        
login: function () {
           var provider = new firebase.auth.GoogleAuthProvider();
           firebase.auth().signInWithPopup(provider).then(function (result) {
               var token = result.credential.accessToken;

               var user = result.user;
               console.log(user)
               app.getPosts()
               app.chat_post = false
               app.transition = true

           }).catch(function (error) {

               var errorCode = error.code;
               console.log(errorCode)
               var errorMessage = error.message;
               console.log(errorMessage)
               var email = error.email;

               var credential = error.credential;

           });
       },        
        
 writeNewPost: function() {

  
  var text = document.getElementById("textInput").value;
  var userName = firebase.auth().currentUser.displayName;

  // A post entry.
  var postData = {
    name: userName,
    body: this.message
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('myMatch').push().key;
  
  var updates = {};
  updates[newPostKey] = postData;

  

  

  return firebase.database().ref().child('myMatch').update(updates);
},
getPosts(){

  firebase.database().ref('myMatch').on('value', function (data) {

    var logs = document.getElementById("posts");
    logs.innerHTML = "";

    var posts = data.val();

    var templ = "";

    for (var key in posts) {
      if (posts[key].name == firebase.auth().currentUser.displayName) {
        templ += `
          <div class="notification is-info">
            <p class="name">${posts[key].name} says:</p>
            <p>${posts[key].body}</p>
          </div>
        `;
      } else {
        templ += `
          <div class="notification is-primary">
            <p class="name">${posts[key].name} says:</p>
            <p>${posts[key].body}</p>
          </div>
        `;
      }
    }

    logs.innerHTML = templ;

    $(".box").animate({ scrollTop: $(".box").prop("scrollHeight") }, 500);
  });
}        
        
    }
})


//login: function () {
//           var provider = new firebase.auth.GoogleAuthProvider();
//           firebase.auth().signInWithPopup(provider).then(function (result) {
//               var token = result.credential.accessToken;
//
//               var user = result.user;
//               console.log(user)
//               app.getPosts()
//               app.chat_post = false
//               app.transition = true
//
//           }).catch(function (error) {
//
//               var errorCode = error.code;
//               console.log(errorCode)
//               var errorMessage = error.message;
//               console.log(errorMessage)
//               var email = error.email;
//
//               var credential = error.credential;
//
//           });
//       },
//
//
//
//
//       writeNewPost: function () {
//
//           // https://firebase.google.com/docs/database/web/read-and-write
//
//           // Values
//           var text = document.getElementById("textInput").value;
//           var userName = firebase.auth().currentUser.displayName;
//
//
//           // A post entry
//
//           var post = {
//               name: userName,
//               body: this.mesaj
//           };
//
//           // Get a key for a new Post.
//           var newPostKey = firebase.database().ref().child('chat').push().key;
//
//           //Write data
//           var updates = {};
//           updates[newPostKey] = post;
//           this.mesaj=""
//           return firebase.database().ref('chat').update(updates);
//       },
//
//
//
//       getPosts: function () {
//
//           firebase.database().ref('chat').on('value', function (data) {
//
//
//               var posts = document.getElementById("posts");
//
//               posts.innerHTML = "";
//
//               var messages = data.val();
//
//               for (var key in messages) {
//                   var text = document.createElement("div");
//                   var element = messages[key];
//
//                   text.append(element.body);
//                   posts.append(text);
//               }
//
//           })
//
//           console.log("getting posts");
//
//       },
//
//   },
//
//})
//
//
//
////toggle the bool to set display
//		toggleDisplay: function(bttn){
//            
//			this.bttn = !this.bttn;
//            console.log(this.toggleTeams)
