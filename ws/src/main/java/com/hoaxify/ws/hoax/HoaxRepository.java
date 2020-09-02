package com.hoaxify.ws.hoax;

import com.hoaxify.ws.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HoaxRepository extends JpaRepository<Hoax,Long> {

    Page<Hoax> findByUser(User inDB, Pageable page);

    Page<Hoax> findByIdLessThan(long id, Pageable page);
}
