package engine


import engine.entities.User
import engine.services.UserLoginService
import engine.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import java.nio.charset.Charset
import java.security.MessageDigest
import java.util.stream.Collectors
import java.util.stream.IntStream
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse
import javax.validation.Valid
import javax.validation.constraints.Min


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

    @GetMapping("/start")
    fun startPage() = "start"



    @GetMapping("/game/{id}")
    fun multiPlayer(@PathVariable id: String) = "gameplay"
}

@RestController
class MainPageController(@Autowired val userService: UserService,
                         @Autowired val userLoginService: UserLoginService) {

    @PostMapping("/api/register")
    fun registerUser(@Valid @RequestBody user: User, response: HttpServletResponse) {
        val nickname = user.nickname
        if (userService.isRegisteredNickname(nickname)) {
            throw ResponseStatusException(HttpStatus.I_AM_A_TEAPOT,
                    "User with this nickname has been already registered : $nickname")
        }
        userService.registerUser(user)

        authorizeUser(user, response)
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
        authorizeUser(user, response)
    }

    @GetMapping("/api/validate")
    fun validateSession(
            @RequestParam(defaultValue = "") key: String,
            @RequestParam(defaultValue = "-1") sessionId: String
    ): ResponseEntity<String> {
        if (key != "session_id" || !userLoginService.checkLogin(sessionId)) {
            return ResponseEntity.ok().body("false") //TODO
        }

        return ResponseEntity.ok().body("true")
    }

    @GetMapping("/api/createLobby")
    fun createLobby(@CookieValue(name = "session_id") sessionId: String): ResponseEntity<String> {
        return ResponseEntity.ok().body("${getServerUrl()}/game/${sha256(sessionId)}/")
    }

    @PostMapping("/api/saveScore")
    fun updateScore(@CookieValue(name = "session_id") sessionId: String, @RequestParam score: Int) {
        userService.updateScore(userLoginService.getUser(sessionId)!!, score)
    }

    private fun authorizeUser(user: User, response: HttpServletResponse) {
        val userEntry = userService.getUser(user.nickname)!!
        val sessionId = getSessionId(userEntry)
        response.addCookie(createCookie("session_id", sessionId))
        userLoginService.addLoggedInUser(sessionId, user)
    }

    private fun getSessionId(user: User): String = sha256(user.nickname + salt)

    private fun sha256(str: String): String =
            MessageDigest.getInstance("SHA-256")
                    .digest(str.toByteArray(Charset.forName("utf-8"))).toHex()

    private fun ByteArray.toHex() = joinToString("") { "%02x".format(it) }

    private val salt = "38fe2c784e1c06c590873cef60a63b1fc2eb0f66947beb69aaa0b7ba11035bf7"
}

@Validated
@Controller
class LeaderBoardController(
        @Autowired val userService: UserService
) {
    @GetMapping("/leaders")
    fun leaderBoardPage(
            model: Model,
            @RequestParam(value = "page", defaultValue = "1") @Min(1) page: Int,
            @RequestParam(value = "size", defaultValue = "5") @Min(1) size: Int
    ): String {
        val tablePage =  userService.getLeaderBoard(page - 1, size)
        model.addAttribute("tablePage", tablePage)

        val totalPages = tablePage.totalPages
        if (totalPages > 0) {
            val pageNumbers = IntStream.rangeClosed(1, totalPages)
                    .boxed()
                    .collect(Collectors.toList())
            model.addAttribute("pageNumbers", pageNumbers)
        }
        return "leaders"
    }
}

private fun createCookie(key: String, value: String, age: Int = -1): Cookie {
    val cookie = Cookie(key, value)
    cookie.maxAge = age
    cookie.path = "/"
    return cookie
}

private fun getServerUrl() = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString()

