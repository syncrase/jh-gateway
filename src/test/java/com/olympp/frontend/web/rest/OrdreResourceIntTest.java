package com.olympp.frontend.web.rest;

import com.olympp.frontend.GatewayApp;

import com.olympp.frontend.domain.Ordre;
import com.olympp.frontend.repository.OrdreRepository;
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
 * Test class for the OrdreResource REST controller.
 *
 * @see OrdreResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class OrdreResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private OrdreRepository ordreRepository;

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

    private MockMvc restOrdreMockMvc;

    private Ordre ordre;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrdreResource ordreResource = new OrdreResource(ordreRepository);
        this.restOrdreMockMvc = MockMvcBuilders.standaloneSetup(ordreResource)
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
    public static Ordre createEntity(EntityManager em) {
        Ordre ordre = new Ordre()
            .name(DEFAULT_NAME);
        return ordre;
    }

    @Before
    public void initTest() {
        ordre = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrdre() throws Exception {
        int databaseSizeBeforeCreate = ordreRepository.findAll().size();

        // Create the Ordre
        restOrdreMockMvc.perform(post("/api/ordres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordre)))
            .andExpect(status().isCreated());

        // Validate the Ordre in the database
        List<Ordre> ordreList = ordreRepository.findAll();
        assertThat(ordreList).hasSize(databaseSizeBeforeCreate + 1);
        Ordre testOrdre = ordreList.get(ordreList.size() - 1);
        assertThat(testOrdre.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createOrdreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ordreRepository.findAll().size();

        // Create the Ordre with an existing ID
        ordre.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrdreMockMvc.perform(post("/api/ordres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordre)))
            .andExpect(status().isBadRequest());

        // Validate the Ordre in the database
        List<Ordre> ordreList = ordreRepository.findAll();
        assertThat(ordreList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOrdres() throws Exception {
        // Initialize the database
        ordreRepository.saveAndFlush(ordre);

        // Get all the ordreList
        restOrdreMockMvc.perform(get("/api/ordres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ordre.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getOrdre() throws Exception {
        // Initialize the database
        ordreRepository.saveAndFlush(ordre);

        // Get the ordre
        restOrdreMockMvc.perform(get("/api/ordres/{id}", ordre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ordre.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrdre() throws Exception {
        // Get the ordre
        restOrdreMockMvc.perform(get("/api/ordres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrdre() throws Exception {
        // Initialize the database
        ordreRepository.saveAndFlush(ordre);

        int databaseSizeBeforeUpdate = ordreRepository.findAll().size();

        // Update the ordre
        Ordre updatedOrdre = ordreRepository.findById(ordre.getId()).get();
        // Disconnect from session so that the updates on updatedOrdre are not directly saved in db
        em.detach(updatedOrdre);
        updatedOrdre
            .name(UPDATED_NAME);

        restOrdreMockMvc.perform(put("/api/ordres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrdre)))
            .andExpect(status().isOk());

        // Validate the Ordre in the database
        List<Ordre> ordreList = ordreRepository.findAll();
        assertThat(ordreList).hasSize(databaseSizeBeforeUpdate);
        Ordre testOrdre = ordreList.get(ordreList.size() - 1);
        assertThat(testOrdre.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingOrdre() throws Exception {
        int databaseSizeBeforeUpdate = ordreRepository.findAll().size();

        // Create the Ordre

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrdreMockMvc.perform(put("/api/ordres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordre)))
            .andExpect(status().isBadRequest());

        // Validate the Ordre in the database
        List<Ordre> ordreList = ordreRepository.findAll();
        assertThat(ordreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrdre() throws Exception {
        // Initialize the database
        ordreRepository.saveAndFlush(ordre);

        int databaseSizeBeforeDelete = ordreRepository.findAll().size();

        // Get the ordre
        restOrdreMockMvc.perform(delete("/api/ordres/{id}", ordre.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ordre> ordreList = ordreRepository.findAll();
        assertThat(ordreList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ordre.class);
        Ordre ordre1 = new Ordre();
        ordre1.setId(1L);
        Ordre ordre2 = new Ordre();
        ordre2.setId(ordre1.getId());
        assertThat(ordre1).isEqualTo(ordre2);
        ordre2.setId(2L);
        assertThat(ordre1).isNotEqualTo(ordre2);
        ordre1.setId(null);
        assertThat(ordre1).isNotEqualTo(ordre2);
    }
}
