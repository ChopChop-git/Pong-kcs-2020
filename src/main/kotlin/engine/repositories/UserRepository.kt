package engine.repositories

import engine.entities.User
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import javax.persistence.ColumnResult
import javax.persistence.ConstructorResult
import javax.persistence.SqlResultSetMapping

@Repository
interface UserRepository: PagingAndSortingRepository<User, Long> {
    fun findByNickname(nickname: String): User?

    fun existsByNickname(nickname: String): Boolean

    @Transactional
    @Modifying
    @Query("update users u set u.highestScore = :score where u.nickname = :nickname")
    fun updateScoreByNickname(@Param("nickname") nickname: String, @Param("score") score: Int)


/*    @SqlResultSetMapping(
            name="groupDetailsMapping",
            classes = arrayOf(
                    ConstructorResult(
                            targetClass = User::class,
                            columns = arrayOf(
                                    ColumnResult(name="nickname", type=String::class),
                                    ColumnResult(name="highestScore", type=Int::class)
                            )
                    )
            )
    )*/
    @Query(
            value = "select nickname, highestScore from users",
            countQuery = "select count(u.nickname) from users u"
    )
    fun findAllExceptPassword(pageable: Pageable): Page<User>
}