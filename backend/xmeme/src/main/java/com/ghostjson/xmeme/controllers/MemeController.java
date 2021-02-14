package com.ghostjson.xmeme.controllers;

import com.ghostjson.xmeme.repositories.MemeRepository;
import com.ghostjson.xmeme.models.Meme;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@ApiOperation(value = "/memes", tags = "Meme Controller")
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(path = "memes")
public class MemeController {


    @Autowired
    private MemeRepository memeRepository;


    @ApiOperation(value = "Get latest 100 memes")
    @GetMapping
    public List<Meme> getLatestMemes() {
        return this.memeRepository.findFirst100ByOrderByCreatedAtDesc();
    }

    @ApiOperation(value = "Get oldest 100 memes")
    @GetMapping(path = "oldest")
    public List<Meme> getOldestMemes() {
        return this.memeRepository.findFirst100ByOrderByCreatedAtAsc();
    }

    @ApiOperation(value = "Get most liked memes")
    @GetMapping(path = "likes")
    public List<Meme> getMostLikedMemes() {
        return this.memeRepository.findFirst100ByOrderByLikesDesc();
    }

    @ApiOperation(value = "Get least liked memes")
    @GetMapping(path = "least-likes")
    public List<Meme> getLeastLikedMemes(){
        return this.memeRepository.findFirst100ByOrderByLikesAsc();
    }

    @ApiOperation(value = "Get a particular meme")
    @GetMapping(path = "{id}")
    public Meme getMeme(@PathVariable("id") Long id) {
        Meme meme = this.memeRepository.findById(id).orElse(null);

        if (meme != null) {
            return meme;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Meme not found.");
        }
    }

    @ApiOperation(value = "Save a meme")
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public String saveMeme(@RequestBody Meme meme) {

        this.memeRepository.save(meme);
        return "{\"id\":\"" + meme.getId() + "\"}";

    }

    @ApiOperation(value = "Edit a particular meme")
    @PatchMapping(path = "{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public String editMeme(@PathVariable("id") Long id, @RequestBody Meme memeRequest) {

        Meme meme = this.memeRepository.findById(id).orElse(null);

        if (meme != null) {
            meme.setCaption(memeRequest.getCaption());
            meme.setName(memeRequest.getName());
            meme.setUrl(memeRequest.getUrl());

            this.memeRepository.save(meme);

            return "{\"id\":\"" + meme.getId() + "\"}";
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Meme not found.");
        }
    }

    @ApiOperation(value = "Like a particular meme")
    @PostMapping(path = "like/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public String likeMeme(@PathVariable("id") Long id) {
        Meme meme = this.memeRepository.findById(id).orElse(null);

        if (meme != null) {
            meme.setLikes(meme.getLikes() + 1);
            this.memeRepository.save(meme);

            return "{\"id\":\"" + meme.getId() + "\"}";
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Meme not found.");
        }
    }


    @ApiOperation(value = "Report a meme")
    @DeleteMapping(path = "report/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public String reportMeme(@PathVariable("id") Long id) {

        Meme meme = this.memeRepository.findById(id).orElse(null);

        if (meme != null) {

            meme.reported();
            this.memeRepository.save(meme);

            // if meme has more than 3 reports, then delete
            if (meme.getReports() > 3) {
                this.memeRepository.delete(meme);
            }

            return "{\"id\":\"" + meme.getId() + "\"}";
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Meme not found.");
        }
    }

}
