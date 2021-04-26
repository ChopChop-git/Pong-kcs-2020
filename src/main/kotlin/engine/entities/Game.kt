
package engine.entities

import javax.persistence.*

@Entity(name = "games")
class Game(
    @field:ManyToOne(fetch = FetchType.LAZY)
    @field:JoinColumn
    val firstPlayer: User,

    @field:ManyToOne(fetch = FetchType.LAZY)
    @field:JoinColumn
    val secondPlayer: User,

    @Column
    val result: String
): BaseEntity<Long>() {}
