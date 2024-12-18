package com.SpringBootAndReact.LearningSpringBootAndReact.domain;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

//Defining this class as an Entity, for a Database
@Entity
@Table(name="users")//In MySQL, User is a reserved word. This makes the table name Users instead
public class User implements UserDetails{

	private static final long serialVersionUID = -793027068596478854L;
	//Defining the attributes for this class
	//Defining Id as an Id
	//GeneratedValue uses the strategy to automatically generate this id
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private LocalDate cohortStartDate; //Used to specify that this is just a date
	private String username;
	@JsonIgnore
	private String password;
	//Defining mapping between users and authorities
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
	@JsonIgnore
	private List<Authority> authorities = new ArrayList<>();
	
	//Getters and Setters for this class
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public LocalDate getCohortStartDate() {
		return cohortStartDate;
	}
	public void setCohortStartDate(LocalDate cohortStartDate) {
		this.cohortStartDate = cohortStartDate;
	}
	
	@Override
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	@Override
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	@Override
	//Authorities are spring specifics
	//They are essentially roles, deciding the access rights that a user may have
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}
	
	public void setAuthorities(List<Authority> authorities) {
		this.authorities = authorities;
	}
	
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	
	
}
