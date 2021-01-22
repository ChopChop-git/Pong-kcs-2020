package engine.entities

import javax.persistence.*
import javax.validation.constraints.*

@Entity(name = "users")
class User (
    @Column(nullable = false, unique = true)
    @field:Pattern(regexp = "[\\w-]+")
    val nickname: String,

    @Column
    @field:NotBlank
    val password: String,

    /*@OneToMany(mappedBy = "id")
    val games: MutableList<Game> = mutableListOf()*/

    @Column(updatable = true)
    @field:Min(0)
    val highestScore: Int

) : BaseEntity<Long>() {}

/*
enum class UserRoles(private val role: String) {
    USER("USER"),
    ADMIN("ADMIN")
}*/
