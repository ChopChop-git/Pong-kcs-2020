import kotlinx.browser.document
import kotlinx.browser.window
import kotlinx.html.*
import kotlinx.html.dom.append


fun main() {
    window.onload = {
        document.head!!.append.apply {
            title {
                +"Pong"
            }
            link {
                href = "css/pong.css"
                rel = "stylesheet"
            }
            script {
                type = "text/javascript"
                src = "js/mainPage.js"
            }
        }
        document.body!!.append.apply {
            div {
                id = "wrap"
                div {
                    id = "welcomeMenu"
                    h1 { +"Register/Login" }
                    button {
                        id = "welcomeLoginBtn"
                        +"Login"
                    }
                    button {
                        id = "welcomeRegisterBtn"
                        +"Register"
                    }
                }
                div {
                    id = "loginMenu"
                    h1 { +"Login" }
                    input {
                        id = "nicknameLogin"
                        type = InputType.text
                        placeholder = "Your nickname"
                    }
                    input {
                        id = "passwordLogin"
                        type = InputType.password
                        placeholder = "Your password"
                    }
                    button {
                        id = "loginBtn"
                        +"Login"
                    }
                }
                div {
                    id = "registerMenu"
                    h1 { +"Register" }
/*                    input {
                        id = "emailRegister"
                        type = InputType.email
                        placeholder = "your_email@example.pong"
                    }*/
                    input {
                        id = "nicknameRegister"
                        type = InputType.text
                        placeholder = "Your nickname"
                    }
                    input {
                        id = "passwordRegister"
                        type = InputType.password
                        placeholder = "Your password"
                    }
                    button {
                        id = "registerBtn"
                        +"Register"
                    }
                }
                div {
                    id = "startMenu"
                    h1 { +"Pong" }
                    button {
                        id = "singlePlayerBtn"
                        +"Single-Player"
                    }
                    button {
                        id = "createLobbyBtn"
                        +"Create Game"
                    }
                    button {
                        id = "joinLobbyBtn"
                        +"Join Game"
                    }
                }
                div {
                    id = "createGameMenu"
                    h2 { +"Your invite link" }
                    input {
                        id = "createLink"
                        type = InputType.url
                        placeholder = "some_link"
                        readonly = true
                    }
                    button {
                        id = "createGameBtn"
                        +"Start game"
                    }
                }
                div {
                    id = "joinGameMenu"
                    h2 { +"Paste an invite link" }
                    input {
                        id = "joinLink"
                        type = InputType.url
                    }
                    button {
                        id = "joinGameBtn"
                        +"Start game"
                    }
                }
                /*div {
                    id = "pauseMenu"
                    h1 { +"Pause" }
                    button {
                        id = "continueBtn"
                        +"Continue"
                    }
                    button {
                        id = "restartBtn"
                        +"Restart"
                    }
                }
                div {
                    id = "gameplay"
                    canvas {
                        id = "gameCanvas"
                        width = "800"
                        height = "600"
                    }
                }
                div {
                    id = "gameOverMenu"
                    h1 {
                        id = "gameMessage"
                    }
                    button {
                        id = "againBtn"
                        +"Try again"
                    }
                }*/
            }
        }
    }
}