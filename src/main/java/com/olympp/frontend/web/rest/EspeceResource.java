package com.olympp.frontend.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.olympp.frontend.domain.Espece;
import com.olympp.frontend.repository.EspeceRepository;
import com.olympp.frontend.web.rest.errors.BadRequestAlertException;
import com.olympp.frontend.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Espece.
 */
@RestController
@RequestMapping("/api")
public class EspeceResource {

    private final Logger log = LoggerFactory.getLogger(EspeceResource.class);

    private static final String ENTITY_NAME = "espece";

    private final EspeceRepository especeRepository;

    public EspeceResource(EspeceRepository especeRepository) {
        this.especeRepository = especeRepository;
    }

    /**
     * POST  /especes : Create a new espece.
     *
     * @param espece the espece to create
     * @return the ResponseEntity with status 201 (Created) and with body the new espece, or with status 400 (Bad Request) if the espece has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/especes")
    @Timed
    public ResponseEntity<Espece> createEspece(@RequestBody Espece espece) throws URISyntaxException {
        log.debug("REST request to save Espece : {}", espece);
        if (espece.getId() != null) {
            throw new BadRequestAlertException("A new espece cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Espece result = especeRepository.save(espece);
        return ResponseEntity.created(new URI("/api/especes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /especes : Updates an existing espece.
     *
     * @param espece the espece to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated espece,
     * or with status 400 (Bad Request) if the espece is not valid,
     * or with status 500 (Internal Server Error) if the espece couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/especes")
    @Timed
    public ResponseEntity<Espece> updateEspece(@RequestBody Espece espece) throws URISyntaxException {
        log.debug("REST request to update Espece : {}", espece);
        if (espece.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Espece result = especeRepository.save(espece);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, espece.getId().toString()))
            .body(result);
    }

    /**
     * GET  /especes : get all the especes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of especes in body
     */
    @GetMapping("/especes")
    @Timed
    public List<Espece> getAllEspeces() {
        log.debug("REST request to get all Especes");
        return especeRepository.findAll();
    }

    /**
     * GET  /especes/:id : get the "id" espece.
     *
     * @param id the id of the espece to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the espece, or with status 404 (Not Found)
     */
    @GetMapping("/especes/{id}")
    @Timed
    public ResponseEntity<Espece> getEspece(@PathVariable Long id) {
        log.debug("REST request to get Espece : {}", id);
        Optional<Espece> espece = especeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(espece);
    }

    /**
     * DELETE  /especes/:id : delete the "id" espece.
     *
     * @param id the id of the espece to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/especes/{id}")
    @Timed
    public ResponseEntity<Void> deleteEspece(@PathVariable Long id) {
        log.debug("REST request to delete Espece : {}", id);

        especeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
