package engine.services

/*
import engine.entities.Game
import engine.repositories.GameRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Component
import org.springframework.stereotype.Service

@Service
class GameService(@Autowired private val gameDB: GameRepository) {

    fun getGame(id: Long) = gameDB.findById(id).orElseThrow()

    fun addGame(game: Game) {
        gameDB.save(game)
    }

    fun getAllGames() = gameDB.findAll()

    fun getAllGames(pageNumber: Int, pageSize: Int, sortBy: String): Page<Game> {
        val paging: Pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy))
        return gameDB.findAll(paging)
    }
}*/
