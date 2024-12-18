package com.SpringBootAndReact.LearningSpringBootAndReact.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class JwtUtil {
	
	//Secret password for JWT, random password, comes from application.properties
	//This should use @Value and get the value from application.properties
	//I couldn't get it to do this, so instead it is hardcoded here
	//This solution is probably slightly less secure, however, for now it works
	//@Value("${jwt.secret}")
	private String secret = "2lB9ZhFt4WslV+R*]W{&c](E3#hLTQ%kKwC%jNCaSXS3cI,a|1";
	
	private static final long serialVersionUID = -2550185165626007488L;
	
	//Determines how long the JWT is valid for
	public static final long JWT_TOKEN_VALIDITY = 30*24*60*60;
	
	//Converting the secret string to a Java Key object type
	private SecretKey getSigningKey(String secret) {
		// Convert the string to bytes (UTF-8 encoding is standard for this)
        byte[] secretBytes = secret.getBytes();
        // Create a SecretKeySpec using the bytes and the HMAC SHA-256 algorithm
        return new SecretKeySpec(secretBytes, "HmacSHA256");
	}
	
	//Creating the SecretKey object, from the Secret string that we had
	private SecretKey secretKey = getSigningKey(secret);
	
	//Getting information from the token
	public String getUsernameFromToken(String token) {
		return getClaimFromToken(token, Claims::getSubject);
	}
	
	public Date getIssuedAtDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getIssuedAt);
	}
	
	public Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}
	
	//Getting all the claims from the token
	//The claims are the additional data that you have decided to put into the Jwt, not the basic information
	public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}
	
	private Claims getAllClaimsFromToken(String token) {
		return Jwts.parser()
			    .verifyWith(secretKey)
			    .build()
			    .parseSignedClaims(token)
			    .getPayload();
	}
	
	//Seeing if the token has expired
	private Boolean isTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}
	
	private Boolean ignoreTokenExpiration(String token) {
		//Here, you specify tokens for which expiration is ignored
		return false;
	}
	
	//Function to generate a new token (public interface for token generation)
	public String generateToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		return doGenerateToken(claims, userDetails.getUsername());
	}
	
	//The function which actually creates the token, hidden for privacy
	private String doGenerateToken(Map<String, Object> claims, String subject) {
		return Jwts.builder()
                .subject(subject)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
                .claims(claims) // Use the non-deprecated method to set claims
                .signWith(secretKey) // Use the SecretKey object
                .compact();
	}
	
	public Boolean canTokenBeRefreshed(String token) {
		return (!isTokenExpired(token) || ignoreTokenExpiration(token));
	}
	
	//Function to check whether the token is valid or not
	public Boolean validateToken(String token, UserDetails userDetails) {
		final String username = getUsernameFromToken(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
}
