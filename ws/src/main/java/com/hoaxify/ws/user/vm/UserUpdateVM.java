package com.hoaxify.ws.user.vm;


import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class UserUpdateVM {

    @Size(min = 4, max = 255)
    @NotNull
    private String displayName;

    private String image;
}
