package com.SpringBootAndReact.LearningSpringBootAndReact.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.SpringBootAndReact.LearningSpringBootAndReact.filter.JwtFilter;
import com.SpringBootAndReact.LearningSpringBootAndReact.util.CustomPasswordEncoder;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig {

    // Injecting UserDetailsService
	@Autowired
    private final UserDetailsService userDetailsService;

    // Injecting CustomPasswordEncoder
	@Autowired
    private final CustomPasswordEncoder customPasswordEncoder;
	
	//Bringing in our JwtFilter
	@Autowired
	private JwtFilter jwtFilter;
	
	//Getting the AuthenticationManager
	@Bean
    AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                   .build();
    }

    public SecurityConfig(UserDetailsService userDetailsService, CustomPasswordEncoder customPasswordEncoder) {
        this.userDetailsService = userDetailsService;
        this.customPasswordEncoder = customPasswordEncoder;
    }
    
    // Define a PasswordEncoder bean using the custom encoder
    @Bean
    PasswordEncoder passwordEncoder() {
        return customPasswordEncoder.getPasswordEncoder(); // Use the custom encoder
    }

    // Defining the SecurityFilterChain (equivalent to overriding `configure(HttpSecurity http)`)
	@Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
        // Disable CSRF protection (adjust as necessary for your use case)
        .csrf(csrf -> csrf.disable())
        // Configure request authorization
        .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll() // Allow public access to /api/auth/**
                .anyRequest().authenticated() // Require authentication for all other requests
        )
        // Configure stateless session management
        .sessionManagement(session -> session
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Stateless sessions
        )
        // Configure exception handling
        .exceptionHandling(exceptions -> exceptions
            .authenticationEntryPoint((request, response, authException) -> {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
            })
        )
        // Add custom JWT filter before the UsernamePasswordAuthenticationFilter
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
        // Enable form-based login for user authentication (optional)
        .formLogin(form -> form
            .permitAll() // Allow access to the login page without authentication
        )
        // Enable logout functionality (optional)
        .logout(logout -> logout
            .permitAll() // Allow access to the logout endpoint
        );

        return http.build();
    }
	
	/*
    // Configuring AuthenticationManager with UserDetailsService and PasswordEncoder
    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    } */
}
