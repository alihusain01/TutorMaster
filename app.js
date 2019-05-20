
const config ={
    apiKey: "AIzaSyC_9dB1fg6S0Tg_YV3ca8CKiavOUzpCrh4",
    authDomain: "tutoring-website-2c061.firebaseapp.com",
    databaseURL: "https://tutoring-website-2c061.firebaseio.com",
    projectId: "tutoring-website-2c061",
    storageBucket: "tutoring-website-2c061.appspot.com",
    kmessagingSenderId: "57751270088"
};
firebase.initializeApp(config);

let database=firebase.database();
let general=database.ref('general');
let currentUser="";

// FirebaseUI config.
const uiConfig = {
    signInSuccessUrl: 'homePage.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
        window.location.assign('<your-privacy-policy-url>');
    }
};
console.log("UI works");
// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

////////////////////////////LOG IN Page
let path=window.location.pathname;
let page=path.split("/").pop();
console.log(page);
if(page===("homePage.html")) {
/// cookie stuff


    console.log("got to function");
    let initApp;
    initApp = function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                const displayName = user.displayName;
                const email = user.email;
                const emailVerified = user.emailVerified;
                const photoURL = user.photoURL;
                const uid = user.uid;
                const phoneNumber = user.phoneNumber;
                const providerData = user.providerData;
                currentUser= user.displayName;
                user.getIdToken().then(function (accessToken) {

                    document.getElementById('sign-in-status').textContent = 'Signed in';
                    document.getElementById('sign-in').textContent = 'Sign out';
                    document.getElementById('account-details').textContent = JSON.stringify({
                        displayName: displayName,
                        email: email,
                        emailVerified: emailVerified,
                        phoneNumber: phoneNumber,
                        photoURL: photoURL,
                        uid: uid,
                        accessToken: accessToken,
                        providerData: providerData
                    }, null, '  ');
                    console.log('got to sign in text');
                    // stuff that displays on webpage
                    document.getElementById('log-in').textContent = 'Congrats ' + user.displayName + ' you logged in';
                    document.body.insertAdjacentHTML = '<h1> Congrats ' + user.displayName + ' you logged in </h1>';
                    console.log('signed in');

                    let data={

                        emailVerified : user.emailVerified,
                        photoURL : user.photoURL,
                        uid : user.uid,
                        phoneNumber: user.phoneNumber,
                        providerData : user.providerData
                    };
                    /*if(user=tutor){
                        database.ref('tutors').push(data);
                    }
                    else if(user=student){
                        database.ref('tutors').push(data);
                    }
                    else{*/
                    database.ref('general').push(data);
                    //  }

                });

            } else {
                // User is signed out.
                document.getElementById('sign-in-status').textContent = 'Signed out';
                document.getElementById('sign-in').textContent = 'Sign in';
                document.getElementById('account-details').textContent = 'null';
            }
        }, function (error) {
            console.log(error);
            console.log("not signed in");
        });
    };

    window.addEventListener('load', function () {
        initApp()
    });
}
function signOut(){
    console.log("got to sign out function");
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("signed out");
    }).catch(function(error) {
        // An error happened.
        console.log("bad code");
    });

    window.location.assign('index.html');
}

///fonts: Segoe UI Semibold
///Bickham Script Pro Bold
let surveyPath=window.location.pathname;
let surveyPage=surveyPath.split("/").pop();
console.log(page);
if(surveyPage===("survey.html")) {
    function submitSurvey() {
//add info to object in database
        /*
        let englishCourses=document.querySelector(".checkbox:checked").value;
       // let gradeLevel=document.getElementById('grade').value;
        var e = document.getElementById("grade");
        var strUser = e.options[e.selectedIndex].text;
    console.log(englishCourses);
        let surveyData={
        ///data pulled from survey form
        //gradeLevel:strUser,
            englishCourses: englishCourses
    };
        database.ref('general').push(surveyData);
        console.log(surveyData);
    */

        let checkedValue = null;
        let inputElements = document.querySelector('.messageCheckbox').checked;//document.getElementsByClassName("checkboxE");
        console.log(inputElements);
        for (let i = 0; inputElements[i]; ++i) {
            if (inputElements[i].checked) {
                checkedValue = inputElements[i].value;
                break;
            }
        }
        let surveyData = {
            englishClasses: inputElements
        }
        console.log(surveyData);
        database.ref('general').push(surveyData);


    }

}