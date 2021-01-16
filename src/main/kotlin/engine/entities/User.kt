package engine.entities

import javax.persistence.*
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull
import javax.validation.constraints.Pattern
import javax.validation.constraints.Size

@Entity(name = "users")
class User (
    @Column(nullable = false, unique = true)
    @field:Pattern(regexp = "[\\w-]+")
    val nickname: String,

    @Column
    @field:NotBlank
    val password: String,

    @OneToMany(mappedBy = "id")
    val games: MutableList<Game> = mutableListOf()

    /*,
    @field:Enumerated(value = EnumType.STRING)
    @Column
    @field:NotNull
    val role: UserRoles = UserRoles.USER*/

) : BaseEntity<Long>() {}

/*
enum class UserRoles(private val role: String) {
    USER("USER"),
    ADMIN("ADMIN")
}*/
