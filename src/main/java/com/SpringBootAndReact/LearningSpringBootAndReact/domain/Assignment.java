package com.SpringBootAndReact.LearningSpringBootAndReact.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Assignment {
	//Attributes for an Assignment
	//Defining Id as an Id
	//GeneratedValue uses the strategy to automatically generate this id
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String status;
	private String branch;
	private String githubURL;
	
	private String codeReviewVideoUrl;
	@ManyToOne(optional = false)
	private User user;
	
	//Getters and Setters for the attributes
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getGithubURL() {
		return githubURL;
	}
	public void setGithubURL(String githubURL) {
		this.githubURL = githubURL;
	}
	public String getCodeReviewVideoUrl() {
		return codeReviewVideoUrl;
	}
	public void setCodeReviewVideoUrl(String codeReviewVideoUrl) {
		this.codeReviewVideoUrl = codeReviewVideoUrl;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
}
