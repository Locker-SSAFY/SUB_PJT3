package com.locker.blog.domain.repository;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter @Getter @ToString
public class Timeline {
    private String message;
    private String url;
    private String date;
    private String thumbnail;
}
