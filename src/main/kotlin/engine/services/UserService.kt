package engine.services

import engine.entities.User
import engine.repositories.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service


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

    fun updateScore(user: User, score: Int) {
        userDB.updateScoreByNickname(user.nickname, score)
    }


    fun isRegisteredNickname(nickname: String) = userDB.existsByNickname(nickname)

    fun getLeaderBoard(pageNum: Int, pageSize: Int): Page<User> {
        val paging = PageRequest.of(pageNum, pageSize, Sort.by("highestScore").descending())
        return userDB.findAllExceptPassword(paging)
    }

}