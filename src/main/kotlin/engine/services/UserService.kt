package engine.services

import engine.entities.User
import engine.repositories.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.stereotype.Service

@Component
@Service
class UserService(@Autowired private val userDB: UserRepository) {


    fun getUser(id: Long) = userDB.findById(id)

    fun getUser(nickname: String) = userDB.findByNickname(nickname)

    fun registerUser(user: User) {
        userDB.save(user)
    }

    fun checkPassword(user: User) : Boolean {
        val found = userDB.findByNickname(user.nickname)
        return found?.password == user.password
    }


    fun isRegisteredNickname(nickname: String) = userDB.existsByNickname(nickname)

}