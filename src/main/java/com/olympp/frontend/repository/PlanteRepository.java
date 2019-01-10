package com.olympp.frontend.repository;

import com.olympp.frontend.domain.Plante;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Plante entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlanteRepository extends JpaRepository<Plante, Long> {

}
