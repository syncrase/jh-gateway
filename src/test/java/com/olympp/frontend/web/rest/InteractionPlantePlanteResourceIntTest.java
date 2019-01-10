package com.olympp.frontend.web.rest;

import com.olympp.frontend.GatewayApp;

import com.olympp.frontend.domain.InteractionPlantePlante;
import com.olympp.frontend.domain.Plante;
import com.olympp.frontend.domain.Plante;
import com.olympp.frontend.repository.InteractionPlantePlanteRepository;
import com.olympp.frontend.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.olympp.frontend.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the InteractionPlantePlanteResource REST controller.
 *
 * @see InteractionPlantePlanteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class InteractionPlantePlanteResourceIntTest {

    private static final String DEFAULT_NOTATION = "-";
    private static final String UPDATED_NOTATION = "+";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private InteractionPlantePlanteRepository interactionPlantePlanteRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restInteractionPlantePlanteMockMvc;

    private InteractionPlantePlante interactionPlantePlante;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InteractionPlantePlanteResource interactionPlantePlanteResource = new InteractionPlantePlanteResource(interactionPlantePlanteRepository);
        this.restInteractionPlantePlanteMockMvc = MockMvcBuilders.standaloneSetup(interactionPlantePlanteResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InteractionPlantePlante createEntity(EntityManager em) {
        InteractionPlantePlante interactionPlantePlante = new InteractionPlantePlante()
            .notation(DEFAULT_NOTATION)
            .description(DEFAULT_DESCRIPTION);
        // Add required entity
        Plante plante = PlanteResourceIntTest.createEntity(em);
        em.persist(plante);
        em.flush();
        interactionPlantePlante.setDePlante(plante);
        // Add required entity
        interactionPlantePlante.setVersPlante(plante);
        return interactionPlantePlante;
    }

    @Before
    public void initTest() {
        interactionPlantePlante = createEntity(em);
    }

    @Test
    @Transactional
    public void createInteractionPlantePlante() throws Exception {
        int databaseSizeBeforeCreate = interactionPlantePlanteRepository.findAll().size();

        // Create the InteractionPlantePlante
        restInteractionPlantePlanteMockMvc.perform(post("/api/interaction-plante-plantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interactionPlantePlante)))
            .andExpect(status().isCreated());

        // Validate the InteractionPlantePlante in the database
        List<InteractionPlantePlante> interactionPlantePlanteList = interactionPlantePlanteRepository.findAll();
        assertThat(interactionPlantePlanteList).hasSize(databaseSizeBeforeCreate + 1);
        InteractionPlantePlante testInteractionPlantePlante = interactionPlantePlanteList.get(interactionPlantePlanteList.size() - 1);
        assertThat(testInteractionPlantePlante.getNotation()).isEqualTo(DEFAULT_NOTATION);
        assertThat(testInteractionPlantePlante.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createInteractionPlantePlanteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = interactionPlantePlanteRepository.findAll().size();

        // Create the InteractionPlantePlante with an existing ID
        interactionPlantePlante.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInteractionPlantePlanteMockMvc.perform(post("/api/interaction-plante-plantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interactionPlantePlante)))
            .andExpect(status().isBadRequest());

        // Validate the InteractionPlantePlante in the database
        List<InteractionPlantePlante> interactionPlantePlanteList = interactionPlantePlanteRepository.findAll();
        assertThat(interactionPlantePlanteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInteractionPlantePlantes() throws Exception {
        // Initialize the database
        interactionPlantePlanteRepository.saveAndFlush(interactionPlantePlante);

        // Get all the interactionPlantePlanteList
        restInteractionPlantePlanteMockMvc.perform(get("/api/interaction-plante-plantes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(interactionPlantePlante.getId().intValue())))
            .andExpect(jsonPath("$.[*].notation").value(hasItem(DEFAULT_NOTATION.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getInteractionPlantePlante() throws Exception {
        // Initialize the database
        interactionPlantePlanteRepository.saveAndFlush(interactionPlantePlante);

        // Get the interactionPlantePlante
        restInteractionPlantePlanteMockMvc.perform(get("/api/interaction-plante-plantes/{id}", interactionPlantePlante.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(interactionPlantePlante.getId().intValue()))
            .andExpect(jsonPath("$.notation").value(DEFAULT_NOTATION.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInteractionPlantePlante() throws Exception {
        // Get the interactionPlantePlante
        restInteractionPlantePlanteMockMvc.perform(get("/api/interaction-plante-plantes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInteractionPlantePlante() throws Exception {
        // Initialize the database
        interactionPlantePlanteRepository.saveAndFlush(interactionPlantePlante);

        int databaseSizeBeforeUpdate = interactionPlantePlanteRepository.findAll().size();

        // Update the interactionPlantePlante
        InteractionPlantePlante updatedInteractionPlantePlante = interactionPlantePlanteRepository.findById(interactionPlantePlante.getId()).get();
        // Disconnect from session so that the updates on updatedInteractionPlantePlante are not directly saved in db
        em.detach(updatedInteractionPlantePlante);
        updatedInteractionPlantePlante
            .notation(UPDATED_NOTATION)
            .description(UPDATED_DESCRIPTION);

        restInteractionPlantePlanteMockMvc.perform(put("/api/interaction-plante-plantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInteractionPlantePlante)))
            .andExpect(status().isOk());

        // Validate the InteractionPlantePlante in the database
        List<InteractionPlantePlante> interactionPlantePlanteList = interactionPlantePlanteRepository.findAll();
        assertThat(interactionPlantePlanteList).hasSize(databaseSizeBeforeUpdate);
        InteractionPlantePlante testInteractionPlantePlante = interactionPlantePlanteList.get(interactionPlantePlanteList.size() - 1);
        assertThat(testInteractionPlantePlante.getNotation()).isEqualTo(UPDATED_NOTATION);
        assertThat(testInteractionPlantePlante.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingInteractionPlantePlante() throws Exception {
        int databaseSizeBeforeUpdate = interactionPlantePlanteRepository.findAll().size();

        // Create the InteractionPlantePlante

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInteractionPlantePlanteMockMvc.perform(put("/api/interaction-plante-plantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interactionPlantePlante)))
            .andExpect(status().isBadRequest());

        // Validate the InteractionPlantePlante in the database
        List<InteractionPlantePlante> interactionPlantePlanteList = interactionPlantePlanteRepository.findAll();
        assertThat(interactionPlantePlanteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInteractionPlantePlante() throws Exception {
        // Initialize the database
        interactionPlantePlanteRepository.saveAndFlush(interactionPlantePlante);

        int databaseSizeBeforeDelete = interactionPlantePlanteRepository.findAll().size();

        // Get the interactionPlantePlante
        restInteractionPlantePlanteMockMvc.perform(delete("/api/interaction-plante-plantes/{id}", interactionPlantePlante.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<InteractionPlantePlante> interactionPlantePlanteList = interactionPlantePlanteRepository.findAll();
        assertThat(interactionPlantePlanteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InteractionPlantePlante.class);
        InteractionPlantePlante interactionPlantePlante1 = new InteractionPlantePlante();
        interactionPlantePlante1.setId(1L);
        InteractionPlantePlante interactionPlantePlante2 = new InteractionPlantePlante();
        interactionPlantePlante2.setId(interactionPlantePlante1.getId());
        assertThat(interactionPlantePlante1).isEqualTo(interactionPlantePlante2);
        interactionPlantePlante2.setId(2L);
        assertThat(interactionPlantePlante1).isNotEqualTo(interactionPlantePlante2);
        interactionPlantePlante1.setId(null);
        assertThat(interactionPlantePlante1).isNotEqualTo(interactionPlantePlante2);
    }
}
