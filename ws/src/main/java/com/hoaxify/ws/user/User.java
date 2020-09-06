package com.hoaxify.ws.user;

import com.hoaxify.ws.hoax.Hoax;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.List;


@Data
@Entity
public class User implements UserDetails {

    /**
     *
     */
    private static final long serialVersionUID = -8421768845853099274L;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @Size(min = 4, max = 255)
    @UniqueUsername
    @NotNull(message = "{hoaxify.constraint.username.NotNull.message}")
    private String username;

    @Size(min = 4, max = 255)
    @NotNull
    private String displayName;

    @NotNull
    @Size(min = 8, max = 255)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{hoaxify.constrain.password.Pattern.message}")
    private String password;


    private String image;

    @OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE)
    private List<Hoax> hoaxes;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.createAuthorityList("Role_user");
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}