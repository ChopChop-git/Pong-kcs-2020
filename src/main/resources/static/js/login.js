
window.onload = function() {
    //setTimeout(showWrap, 2000);

    let
        loginMenu = document.getElementById('loginMenu'),
        loginBtn = document.getElementById('loginBtn'),
        nickLoginInput = document.getElementById('nicknameLogin'),
        passLoginInput = document.getElementById('passwordLogin');


    loginBtn.addEventListener('click', login);


    welcomeMenu.className = 'active';
    loginMenu.className = 'active';


    function login() {
        const body = {
            nickname: nickLoginInput.value,
            password: passLoginInput.value
        }
        const url =  getCurrentHostname() + "/api/login";

        $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json",
            data: JSON.stringify(body),
        })
            .done((data) => {
                console.log("Successfully logged in")
                changeActiveDiv(loginMenu, startMenu);
            })
            .fail((error) => {
                switch (error.status) {
                    case 418 :
                        alert("User isn't not registered.");
                        break;
                    case 401:
                        alert("Wrong password.");
                        break;
                    default:
                        alert(JSON.stringify(error));
                        break;
                }
            });


    }
}
