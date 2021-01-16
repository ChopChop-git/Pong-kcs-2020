package engine.repositories

import engine.entities.User
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository: CrudRepository<User, Long> {
    fun findByNickname(nickname: String): User?

    fun existsByNickname(nickname: String): Boolean
}