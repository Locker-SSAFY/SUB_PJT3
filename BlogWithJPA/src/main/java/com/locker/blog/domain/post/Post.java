package com.locker.blog.domain.post;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter @Getter
@Table(name = "post")
public class Post {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long pid;

    @Column(nullable = false, name="email")
    @JoinColumn(nullable = false)
    private String email;

    @Column(nullable = false)
    @JoinColumn(nullable = false)
    private String nickname;

    private String title;

    @Column(length = 1000)
    private String content;

    private LocalDateTime created;
    private LocalDateTime updated;
}
