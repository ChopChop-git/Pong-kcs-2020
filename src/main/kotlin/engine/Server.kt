package engine

import engine.entities.User
import engine.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse
import javax.validation.Valid


@SpringBootApplication
class Server

fun main(args: Array<String>) {
    SpringApplication.run(Server::class.java, *args)
}


@Controller
class PageController {

    @RequestMapping("/")
    fun mainPage() = "index"

    @RequestMapping("/singleplayer")
    fun singlePlayer() = "singleplayer"

    @GetMapping("/game/{id}")
    fun multiPlayer(@PathVariable id: Long) = "gameplay"
}

@RestController
class MainPageController(@Autowired val userService: UserService) {
    val loginedUsers = mutableMapOf<Long, User>()

    @PostMapping("/api/register")
    fun registerUser(@Valid @RequestBody user: User, response: HttpServletResponse) {
        val nickname = user.nickname
        if (userService.isRegisteredNickname(nickname)) {
            throw ResponseStatusException(HttpStatus.I_AM_A_TEAPOT,
                    "User with this nickname has been already registered : $nickname")
        }
        userService.registerUser(user)

        val userEntry = userService.getUser(user.nickname)!!
        val userID = userEntry.id!!

        response.addCookie(createCookie("user_id", "$userID"))
        loginedUsers.putIfAbsent(userID, user)
    }

    @PostMapping("/api/login")
    fun loginUser(@Valid @RequestBody user: User, response: HttpServletResponse) {
        val nickname = user.nickname
        if (!userService.isRegisteredNickname(nickname)) {
            throw ResponseStatusException(HttpStatus.I_AM_A_TEAPOT,
                    "User isn't registered : $nickname")
        }
        if (!userService.checkPassword(user)) {
            throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "Wrong password")
        }
        val userEntry = userService.getUser(user.nickname)!!
        val userID = userEntry.id!!

        response.addCookie(createCookie("user_id", "$userID"))
        loginedUsers.putIfAbsent(userID, user)
    }

    @GetMapping("/api/validate")
    fun validateLogin(
            @RequestParam(defaultValue = "") key : String,
            @RequestParam(defaultValue = "-1") userId: Long
    ): ResponseEntity<String> {
        if (key != "user_id" || !loginedUsers.containsKey(userId)) {
            return ResponseEntity.ok().body("false") //TODO
        }

        return ResponseEntity.ok().body("true")
    }

    @GetMapping("/api/createLobby")
    fun createLobby(@CookieValue(value = "user_id", defaultValue = "-1") userID: String): ResponseEntity<String> {
        if (userID == "-1" || !loginedUsers.containsKey(userID.toLong())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized")
        }
        return ResponseEntity.ok().body("${getServerUrl()}/game/$userID/")
    }

}

private fun createCookie(key: String, value: String, age: Int = -1): Cookie {
    val cookie = Cookie(key, value)
    cookie.maxAge = age
    cookie.path = "/"
    return cookie
}

private fun getServerUrl() = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString()

data class ResponseObject<T>(
        private val obj: T? = null,
        private val message: String? = null
)
