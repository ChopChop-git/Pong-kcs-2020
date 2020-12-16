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
   loginMenu.className = 'active';
    welcomeMenu.className = '';
});
welcomeRegisterBtn.addEventListener('click', function () {
    registerMenu.className = 'active';
    welcomeMenu.className = '';
})
loginBtn.addEventListener('click', login);
registerBtn.addEventListener('click', register);
singlePlayerBtn.addEventListener('click', startSingle);
createLobbyBtn.addEventListener('click', createLobby);
joinLobbyBtn.addEventListener('click', joinLobby);



welcomeMenu.className = 'active';
loginMenu.className = '';
registerMenu.className = '';
startMenu.className = '';
createGameMenu.className = '';
joinGameMenu.className = '';

createLinkInput.onclick = function() {
    this.select();
    document.execCommand('copy');
    alert('Copied link to the clipboard');
}

function startSingle() {
    return undefined;
}

function createLobby() {
   startMenu.className = '';
   createGameMenu.className = 'active';
}

function joinLobby() {
    startMenu.className = '';
    joinGameMenu.className = 'active';
}

function login() {
    loginMenu.className = '';
    startMenu.className = 'active';
}
function register() {
    registerMenu.className = '';
    startMenu.className = 'active';
}

