package com.hoaxify.ws.shared;



import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ ElementType.FIELD})
@Retention(RUNTIME)
@Constraint(validatedBy = {ProfileImageValidator.class})
public @interface ProfileImage {

    String message() default "{hoaxify.constraint.ProfileImage.message}";
    Class<?>[] groups() default { };
    Class<? extends Payload>[] payload() default { };
}
