package com.github.apoorvsr.spa_spring_angular.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.security.web.savedrequest.NullRequestCache;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import static org.springframework.security.config.Customizer.withDefaults;

import java.io.IOException;

@Configuration
public class RestSecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        CookieCsrfTokenRepository tokenRepository = CookieCsrfTokenRepository.withHttpOnlyFalse();
        CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
        requestHandler.setCsrfRequestAttributeName("_csrf");
        // @formatter:off
        http.authorizeHttpRequests(authz -> authz
                .requestMatchers("/index.html", "/", "/home", "/login", "/*.js", "/*.css").permitAll()
                .anyRequest().authenticated())
            .httpBasic(withDefaults())
            .csrf(csrf -> csrf
                .csrfTokenRepository(tokenRepository)
                .csrfTokenRequestHandler(requestHandler))
            // Adds this here to create the X-XSRF-TOKEN Header on individual calls
            // otherwise would need to be queried
            .addFilterAfter(new CsrfCookieFilter(), BasicAuthenticationFilter.class)
            .requestCache(cache -> cache.requestCache(new NullRequestCache()))
            // Adding this requireExplicitSave(false) will persist the security context
            // the httpSessionRepository
            .securityContext(securityContext -> securityContext
			    .requireExplicitSave(false));

        // @formatter:on

        return http.build();
    }

    private static final class CsrfCookieFilter extends OncePerRequestFilter {

        @SuppressWarnings("null")
        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                FilterChain filterChain)
                throws ServletException, IOException {
            CsrfToken csrfToken = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
            // Render the token value to a cookie by causing the deferred token to be loaded
            csrfToken.getToken();

            filterChain.doFilter(request, response);
        }
    }
}