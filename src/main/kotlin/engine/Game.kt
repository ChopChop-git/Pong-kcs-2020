package engine

import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller

@Controller
class GameController {

    @MessageMapping("/move/{id}")
    @SendTo("/game/{id}")
    fun move(@DestinationVariable id: String, move: MoveMessage) {

    }
}

class Game {
 //TODO
}
//TODO
class MoveMessage {}
