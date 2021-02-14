package com.ghostjson.xmeme.models;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "Meme")
@Table(name = "memes")
public class Meme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String url;
    private String caption;
    private Long likes = 0L;
    private Integer reports = 0;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public Meme(String name, String url, String caption) {
        this.name = name;
        this.url = url;
        this.caption = caption;
    }

    public Meme() {
    }

    public Long getId() {
        return id;
    }

    public String getCaption() {
        return caption;
    }

    public String getName() {
        return name;
    }

    public String getUrl() {
        return url;
    }

    public Long getLikes() {
        return likes;
    }

    public Integer getReports() {
        return reports;
    }





    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }


    public void setName(String name) {
        this.name = name;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setLikes(Long likes) {
        this.likes = likes;
    }


    public void reported(){
        this.reports += 1;
    }
}
