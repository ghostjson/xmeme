package com.ghostjson.xmeme.repositories;

import com.ghostjson.xmeme.models.Meme;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemeRepository extends JpaRepository<Meme, Long> {

    List<Meme> findFirst100ByOrderByLikesAsc();

    List<Meme> findFirst100ByOrderByCreatedAtDesc();

    List<Meme> findFirst100ByOrderByCreatedAtAsc();


    List<Meme> findFirst100ByOrderByLikesDesc();
}
