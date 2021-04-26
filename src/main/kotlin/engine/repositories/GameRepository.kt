package engine.repositories


import engine.entities.Game
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.stereotype.Repository

@Repository
interface GameRepository: PagingAndSortingRepository<Game, Long> {
 //TODO
}
