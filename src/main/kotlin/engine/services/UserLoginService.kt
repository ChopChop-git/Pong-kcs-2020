package engine.services

import engine.entities.User
import org.springframework.stereotype.Component

@Component
class UserLoginService {
    private val loggedIn = mutableMapOf<String, User>()

    fun addLoggedInUser(sessionId: String, user: User) {
        loggedIn.putIfAbsent(sessionId, user);
    }

    fun checkLogin(sessionId: String) = loggedIn.containsKey(sessionId)

    fun getUser(sessionId: String) = loggedIn[sessionId]

}