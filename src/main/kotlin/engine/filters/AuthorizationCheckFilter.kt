package engine.filters

import engine.services.UserLoginService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.web.filter.GenericFilterBean
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class AuthorizationCheckFilter(
        @Autowired val userLoginService: UserLoginService
) : GenericFilterBean() {

    override fun doFilter(request: ServletRequest, response: ServletResponse, chain: FilterChain) {
        request as HttpServletRequest
        response as HttpServletResponse
        if (request.cookies == null ||
                !request.hasCookie("session_id") ||
                !userLoginService.checkLogin(request.getCookieValue("session_id")!!)) {
            response.sendError(401, "You are not authorized to see this page")
            return
        }
        chain.doFilter(request, response)
    }


    private fun HttpServletRequest.hasCookie(name: String) =
            this.cookies.asSequence().map { it.name }.contains(name)
    private fun HttpServletRequest.getCookieValue(name: String) =
            this.cookies.asSequence().find { it.name == name }?.value

}
