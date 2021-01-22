
window.onload = function() {
    setTimeout(showWrap, 1000);

    let
        leaderTableBtn = document.getElementById('leaderBtn'),

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



    singlePlayerBtn.addEventListener('click', startSingle);
    createLobbyBtn.addEventListener('click', createLobby);
    joinLobbyBtn.addEventListener('click', joinLobby);
    createGameBtn.addEventListener('click', createGame)
    joinGameBtn.addEventListener('click', joinGame)
    leaderTableBtn.addEventListener('click', showLeaderTable);




    startMenu.className = 'active';
    createGameMenu.className = '';
    joinGameMenu.className = '';


    function showLeaderTable() {
        proceedToPage('/leaders');
    }


    createLinkInput .onclick = function() {
        this.select();
        document.execCommand('copy');
        alert('Copied link to the clipboard');
    }

    function startSingle() {
        proceedToPage("/singleplayer");
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


    /*function validateLogin() {
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
    }*/
}
