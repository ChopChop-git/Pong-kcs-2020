package engine.config

import engine.filters.AuthorizationCheckFilter
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@Configuration
class FilterConfig(
        @Autowired val authorizationCheckFilter: AuthorizationCheckFilter
): WebMvcConfigurer {

    @Bean
    fun loggingFilter(): FilterRegistrationBean<AuthorizationCheckFilter> {
        val registrationBean = FilterRegistrationBean<AuthorizationCheckFilter>()
        registrationBean.filter = authorizationCheckFilter
        registrationBean
                .addUrlPatterns("/start",
                        "/singleplayer",
                        "/start",
                        "/game/*",
                        "/api/createLobby",
                        "/api/saveScore")
        return registrationBean
    }
}