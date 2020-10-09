import kotlinx.html.*
import kotlinx.html.stream.appendHTML
import java.io.PrintWriter

fun main() {
    PrintWriter("build/index.html").use {
        it.appendHTML().html {
            head {
                title("Client-server and Kotlin")
            }
            body {
                h1 {
                    +"Armenakyan Karen"
                }
                p {
                    +"I am going to make a multiplayer online pong game"
                }
                img {
                    src = "resources/main/images/pong.jpg"
                }
            }
        }
    }
}
