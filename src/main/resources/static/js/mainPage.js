
window.onload = function() {
    setTimeout(showWrap, 2000);

    let welcomeMenu = document.getElementById('welcomeMenu'),
        welcomeRegisterBtn = document.getElementById('welcomeRegisterBtn'),
        welcomeLoginBtn = document.getElementById('welcomeLoginBtn'),

        registerMenu = document.getElementById('registerMenu'),
        registerBtn = document.getElementById('registerBtn'),
        nickRegisterInput = document.getElementById('nicknameRegister'),
        passRegisterInput = document.getElementById('passwordRegister'),

        loginMenu = document.getElementById('loginMenu'),
        loginBtn = document.getElementById('loginBtn'),
        nickLoginInput = document.getElementById('nicknameLogin'),
        passLoginInput = document.getElementById('passwordLogin');

    welcomeLoginBtn.addEventListener('click', function() {
        changeActiveDiv(welcomeMenu, loginMenu);
    });
    welcomeRegisterBtn.addEventListener('click', function () {
        changeActiveDiv(welcomeMenu, registerMenu);
    })
    loginBtn.addEventListener('click', login);
    registerBtn.addEventListener('click', register);




    welcomeMenu.className = 'active';
    loginMenu.className = '';
    registerMenu.className = '';


    validateLogin()


    function login() {
        const body = {
            nickname: nickLoginInput.value,
            password: passLoginInput.value
        }
        if (body.password === "" || body.nickname === "") {
            alert("Field is blank")
            return
        }
        const url =  getCurrentHostname() + "/api/login";

        $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json",
            data: JSON.stringify(body),
        })
            .done((data) => {
                console.log("Successfully logged in");
                proceedToPage("/start");
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

    function register() {
        const body = {
            nickname: nickRegisterInput.value,
            password: passRegisterInput.value
        }
        const url =  getCurrentHostname() + "/api/register";

        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(body),
            contentType: "application/json",
        })
            .done((data) => {
                console.log("Successfully registered")
                proceedToPage("/start");
            })
            .fail((error) => {
                switch (error.status) {
                    case 418 :
                        alert("User with this nickname has been already registered.");
                        break;
                    case 400:
                        alert("Wrong nickname or password format.");
                        break;
                    default:
                        alert(JSON.stringify(error));
                        break;
                }
            });
    }

    function validateLogin() {
        const sessionId = getCookie("session_id");
        if (sessionId === undefined) return;

        const url =  getCurrentHostname() + "/api/validate";
        const body = {
            key: "session_id",
            sessionId: sessionId
        }

        $.ajax({
            type: "GET",
            url: url,
            data: body,
            dataType: "text"
        })
            .done((data) => {
                console.log(`responded 200 with ${data}`)
                if (data === "true") {
                    console.log("Redirecting to start Menu")
                    proceedToPage("/start");
                }
            })
            .fail((error) => {
                switch (error.status) {
                    default:
                        alert(JSON.stringify(error));
                        break;
                }
            });
    }
}
