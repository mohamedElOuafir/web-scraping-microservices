package com.example.articleservice.repository;


import com.example.articleservice.entity.Article;
import com.example.articleservice.entity.Favorite;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.QueryParam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Set;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite,Long> {
    Set<Favorite> findByIdUser(Long idUser);

    @Transactional
    @Modifying
    @Query("delete from Favorite f where f.article.Id = :idArticle and f.idUser = :idUser")
            void deleteFavoriteByArticleAndUser(
                    @QueryParam("idArticle") Long idArticle,
                    @QueryParam("idUser") Long idUser
    );
}
