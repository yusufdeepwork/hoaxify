package com.hoaxify.ws.hoax;

import com.hoaxify.ws.user.User;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
@Entity
public class Hoax {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Size(min = 1,max = 1000)
    @Column(length = 1000)
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

    @ManyToOne
    private User user;
}
