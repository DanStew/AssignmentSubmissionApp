package com.SpringBootAndReact.LearningSpringBootAndReact.domain;

import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
//Entity to map roles (authorities) to different users in the system
//Roles have a many to one relationship with Users
//This class will be used as part of the getAuthorities() class, seen in User
//getAuthorities() requires an Authority to implement GrantedAuthority, as it returns a collection of GrantedAuthorities
public class Authority implements GrantedAuthority{
	
	private static final long serialVersionUID = 1608601430782928598L;
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String authority;
	@ManyToOne(optional = false)
	private User user;
	
	//Constructors
	public Authority() {}
	
	public Authority(String authority) {
		this.authority = authority;
	}
	
	//Getters and Setter methods
	@Override
	public String getAuthority() {
		return authority;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}
}
