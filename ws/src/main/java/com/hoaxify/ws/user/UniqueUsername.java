package com.hoaxify.ws.user;



import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ ElementType.FIELD})
@Retention(RUNTIME)
@Constraint(validatedBy = {UniqueUsernameValidation.class})
public @interface UniqueUsername {


    String message() default "{hoaxify.constraint.username.UniqueUsername.message}";
    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
