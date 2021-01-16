
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
        passLoginInput = document.getElementById('passwordLogin'),

        startMenu = document.getElementById('startMenu'),
        singlePlayerBtn = document.getElementById('singlePlayerBtn'),
        createLobbyBtn = document.getElementById('createLobbyBtn'),
        joinLobbyBtn = document.getElementById('joinLobbyBtn'),

        createGameMenu = document.getElementById('createGameMenu'),
        createGameBtn = document.getElementById('createGameBtn'),
        createLinkInput = document.getElementById('createLink'),

        joinGameMenu = document.getElementById('joinGameMenu'),
        joinGameBtn = document.getElementById('joinGameBtn'),
        joinLinkInput = document.getElementById('joinLink');


    welcomeLoginBtn.addEventListener('click', function() {
        changeActiveDiv(welcomeMenu, loginMenu);
    });
    welcomeRegisterBtn.addEventListener('click', function () {
        changeActiveDiv(welcomeMenu, registerMenu);
    })
    loginBtn.addEventListener('click', login);
    registerBtn.addEventListener('click', register);
    singlePlayerBtn.addEventListener('click', startSingle);
    createLobbyBtn.addEventListener('click', createLobby);
    joinLobbyBtn.addEventListener('click', joinLobby);
    createGameBtn.addEventListener('click', createGame)
    joinGameBtn.addEventListener('click', joinGame)



    welcomeMenu.className = 'active';
    loginMenu.className = '';
    registerMenu.className = '';
    startMenu.className = '';
    createGameMenu.className = '';
    joinGameMenu.className = '';

    validateLogin()

    createLinkInput .onclick = function() {
        this.select();
        document.execCommand('copy');
        alert('Copied link to the clipboard');
    }

    function startSingle() {
        window.location.href = getCurrentHostname() + "/singleplayer"
    }

    function createGame() {
        window.location.href = createLinkInput.value
    }

    function joinGame()  {
        const url = joinLinkInput.value
        if (url === "") {
            alert("Please paste game url")
            return
        }
        window.location.href = url
    }

    function createLobby() {
        const url =  getCurrentHostname() + "/api/createLobby";
        $.ajax({
            type: "GET",
            url: url,
            dataType: "text"
        })
            .done((data) => {
                createLinkInput.value = data
                changeActiveDiv(startMenu, createGameMenu);
            })
            .fail((error) => {
                switch (error.status) {
                    default:
                        alert(JSON.stringify(error));
                        break;
                }
            });
    }

    function joinLobby() {
        changeActiveDiv(startMenu, joinGameMenu);
    }

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
                changeActiveDiv(registerMenu, startMenu);
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
        const userId = getCookie("user_id");
        if (userId === undefined) return;

        const url =  getCurrentHostname() + "/api/validate";
        const body = {
            key: "user_id",
            userId: userId
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
                    changeActiveDiv(welcomeMenu, startMenu);
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
