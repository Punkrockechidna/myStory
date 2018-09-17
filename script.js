//Adds event listener to the login form
window.onload = function () {

    if (location.pathname.includes("sign")) {  //If signup page

        const signSub = window.document.getElementById("signUpForm");
        signSub.addEventListener("submit", function (e) {
            e.preventDefault();
            signUp();
        })

    } else if (location.pathname.includes("login")) {  //If login page

        const loginSub = window.document.getElementById("loginForm");
        loginSub.addEventListener("submit", function (e) {
            e.preventDefault();
            if (!localStorage.profiles) {
                login();
            }else{
                alert("No user accounts exist!")
                window.location.href = "sign-up.html";
            }
            
        })

    } else if (location.pathname.includes("profile")) { //If profile page

        profiles = JSON.parse(window.localStorage.getItem("profiles"));
        let profileIndex = findProfile(profiles);
        loadProfile(profiles[profileIndex]);

    } else if (location.pathname.includes("edit")) {     //If profile edit page

        profiles = JSON.parse(window.localStorage.getItem("profiles"));
        let profileIndex = findProfile(profiles);
        loadEditProfile(profiles, profileIndex);
        const editSub = window.document.getElementById("editProfileForm");
        editSub.addEventListener("submit", function (e) {
            e.preventDefault();
            updateProfile(profiles, profileIndex);

        });
    } else if (this.location.pathname.includes("index")) {
        displayStories();
    }
}
function displayStories() {
    // debugger;

    if (typeof window.sessionStorage.loggedIn === "undefined" || window.sessionStorage.loggedIn === null || window.sessionStorage.loggedIn === "") {
        alert("You need to be logged in first.");
        window.location.href = "login.3.html";
    }

    // Get list of stories
    let stories = window.localStorage.stories ? JSON.parse(window.localStorage.stories) : [];

    // Loop through list of stories
    for (let index = 0; index < stories.length; index++) {
        const story = stories[index];

        // Display each story that belongs the logged in user
        if (story.createdBy == window.sessionStorage.loggedIn) {
            console.log("It's me!");
            var para = document.createElement("div");
            // var node = document.createTextNode(stories[index].title.value);
            // para.appendChild(node);
            para.className = "story";
            var element = document.getElementById("my-stories");
            element.insertBefore(para, child);
        } else {  // Display other stories as well
            console.log("It's not me!");
        }
    }
//     var para = document.createElement("div");
//     var node = document.createTextNode("This is new.");
//     para.appendChild(node);

//     var element = document.getElementById("my-stories");
//     var child = document.getElementById("p1");
//     element.insertBefore(para, child);


//  <div class="story">
// <a href="story-details.html">
//     <span class="story-title">Fast Track Class</span>
// </a> |
// <a href="upsert-story.html">
//     <span class="edit-button">
//         <i>Edit</i>
//     </span>
// </a> |
// <span class="delete-button">
//     <em>Delete</em>
// </span>
// </div>
};




var login = function () {
    const user = {
        email: document.forms["loginForm"]["email"].value,
        password: document.forms["loginForm"]["password"].value
    }

    console.log(JSON.stringify(user));

    // Validate user
    const profiles = JSON.parse(localStorage.getItem("profiles"));

    for (let index = 0; index < profiles.length; index++) {
        const profile = profiles[index];

        if (profile.email == user.email && profile.password == user.password) {
            window.sessionStorage.loggedIn = true;
            window.sessionStorage.email = user.email;
            alert("Valid User");
            window.location.href = "index.html";
        } else {
            // alert("Invalid User");
        }
    }

    // return false;
}

function findProfile(profiles) { //finds index of logged in profile

    for (let i = 0; i < profiles.length; i++) {
        if (profiles[i].email === window.sessionStorage.email) {
            return i;
        }
    }
}
var loadProfile = function (profiles) { //load profile currently logged in

    const profile = {
        firstName: profiles.firstName,
        lastName: profiles.lastName,
        alias: profiles.alias,
        email: profiles.email,
        gender: profiles.gender,
        dob: profiles.dob,
        password: profiles.password
    };

    document.getElementById("firstName").innerHTML = profile.firstName;
    document.getElementById("lastName").innerHTML = profile.lastName;
    document.getElementById("alias").innerHTML = profile.alias;
    document.getElementById("email").innerHTML = profile.email;
    document.getElementById("gender").innerHTML = profile.gender;
    document.getElementById("dob").innerHTML = profile.dob;
}

var loadEditProfile = function (profiles, profileIndex) { //Load fields in edit profile page

    const profile = {
        firstName: profiles[profileIndex].firstName,
        lastName: profiles[profileIndex].lastName,
        alias: profiles[profileIndex].alias,
        email: profiles[profileIndex].email,
        gender: profiles[profileIndex].gender,
        dob: profiles[profileIndex].dob,
        password: profiles[profileIndex].password
    };
    if (profile.firstName) {
        document.getElementById("firstName").value = profile.firstName;
    }
    if (profile.lastName) {
        document.getElementById("lastName").value = profile.lastName;
    }


    document.getElementById("alias").value = profile.alias;
    document.getElementById("email").value = profile.email;
    document.getElementById("gender").value = profile.gender;
    document.getElementById("dob").value = profile.dob;
}
//updates the profile in local storage
function updateProfile(profiles, profileIndex) {

    const profile = {
        firstName: document.forms["editProfileForm"]["firstName"].value,
        lastName: document.forms["editProfileForm"]["lastName"].value,
        alias: document.forms["editProfileForm"]["alias"].value,
        email: document.forms["editProfileForm"]["email"].value,
        gender: document.forms["editProfileForm"]["gender"].value,
        dob: document.forms["editProfileForm"]["dob"].value,
        password: document.forms["editProfileForm"]["password"].value,
        confPass: document.forms["editProfileForm"]["confPass"].value
    };
    if (profile.password === profile.confPass) {

        profiles[profileIndex].firstName = profile.firstName;
        profiles[profileIndex].lastName = profile.lastName;
        profiles[profileIndex].alias = profile.alias;
        profiles[profileIndex].email = profile.email;
        profiles[profileIndex].gender = profile.gender;
        profiles[profileIndex].dob = profile.dob;
        profiles[profileIndex].password = profile.password;
        localStorage.setItem("profiles", JSON.stringify(profiles));
        window.location.href = "profile.html";
    } else {
        alert("Passwords must match");
        return false;
    }
}

//Sign Up page functions
function signUp() {
    const profile = {
        alias: document.forms["signUpForm"]["alias"].value,
        email: document.forms["signUpForm"]["email"].value,
        gender: document.forms["signUpForm"]["gender"].value,
        dob: document.forms["signUpForm"]["dob"].value,
        password: document.forms["signUpForm"]["password"].value,
        firstName: "",
        lastName: ""
    };
    const confirmPassword = document.forms["signUpForm"]["confirm-password"].value

    // Check password
    if (profile.password != confirmPassword) {
        alert("Password must be the same as Confirmation Password.");
    } else {
        // Store profile
        var profiles = JSON.parse(window.localStorage.getItem("profiles"));

        if (!profiles) {
            profiles = [];
        }

        profiles.push(profile);
        localStorage.setItem("profiles", JSON.stringify(profiles));
        // window.localStorage.profiles = profiles;
        window.sessionStorage.loggedIn = true;
        window.location.href = "index.html";
    }
    return false;
}