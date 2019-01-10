package com.olympp.frontend.web.rest;

import com.olympp.frontend.GatewayApp;

import com.olympp.frontend.domain.Espece;
import com.olympp.frontend.repository.EspeceRepository;
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
 * Test class for the EspeceResource REST controller.
 *
 * @see EspeceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class EspeceResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private EspeceRepository especeRepository;

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

    private MockMvc restEspeceMockMvc;

    private Espece espece;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EspeceResource especeResource = new EspeceResource(especeRepository);
        this.restEspeceMockMvc = MockMvcBuilders.standaloneSetup(especeResource)
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
    public static Espece createEntity(EntityManager em) {
        Espece espece = new Espece()
            .name(DEFAULT_NAME);
        return espece;
    }

    @Before
    public void initTest() {
        espece = createEntity(em);
    }

    @Test
    @Transactional
    public void createEspece() throws Exception {
        int databaseSizeBeforeCreate = especeRepository.findAll().size();

        // Create the Espece
        restEspeceMockMvc.perform(post("/api/especes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(espece)))
            .andExpect(status().isCreated());

        // Validate the Espece in the database
        List<Espece> especeList = especeRepository.findAll();
        assertThat(especeList).hasSize(databaseSizeBeforeCreate + 1);
        Espece testEspece = especeList.get(especeList.size() - 1);
        assertThat(testEspece.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createEspeceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = especeRepository.findAll().size();

        // Create the Espece with an existing ID
        espece.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEspeceMockMvc.perform(post("/api/especes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(espece)))
            .andExpect(status().isBadRequest());

        // Validate the Espece in the database
        List<Espece> especeList = especeRepository.findAll();
        assertThat(especeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEspeces() throws Exception {
        // Initialize the database
        especeRepository.saveAndFlush(espece);

        // Get all the especeList
        restEspeceMockMvc.perform(get("/api/especes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(espece.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getEspece() throws Exception {
        // Initialize the database
        especeRepository.saveAndFlush(espece);

        // Get the espece
        restEspeceMockMvc.perform(get("/api/especes/{id}", espece.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(espece.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEspece() throws Exception {
        // Get the espece
        restEspeceMockMvc.perform(get("/api/especes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEspece() throws Exception {
        // Initialize the database
        especeRepository.saveAndFlush(espece);

        int databaseSizeBeforeUpdate = especeRepository.findAll().size();

        // Update the espece
        Espece updatedEspece = especeRepository.findById(espece.getId()).get();
        // Disconnect from session so that the updates on updatedEspece are not directly saved in db
        em.detach(updatedEspece);
        updatedEspece
            .name(UPDATED_NAME);

        restEspeceMockMvc.perform(put("/api/especes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEspece)))
            .andExpect(status().isOk());

        // Validate the Espece in the database
        List<Espece> especeList = especeRepository.findAll();
        assertThat(especeList).hasSize(databaseSizeBeforeUpdate);
        Espece testEspece = especeList.get(especeList.size() - 1);
        assertThat(testEspece.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingEspece() throws Exception {
        int databaseSizeBeforeUpdate = especeRepository.findAll().size();

        // Create the Espece

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEspeceMockMvc.perform(put("/api/especes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(espece)))
            .andExpect(status().isBadRequest());

        // Validate the Espece in the database
        List<Espece> especeList = especeRepository.findAll();
        assertThat(especeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEspece() throws Exception {
        // Initialize the database
        especeRepository.saveAndFlush(espece);

        int databaseSizeBeforeDelete = especeRepository.findAll().size();

        // Get the espece
        restEspeceMockMvc.perform(delete("/api/especes/{id}", espece.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Espece> especeList = especeRepository.findAll();
        assertThat(especeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Espece.class);
        Espece espece1 = new Espece();
        espece1.setId(1L);
        Espece espece2 = new Espece();
        espece2.setId(espece1.getId());
        assertThat(espece1).isEqualTo(espece2);
        espece2.setId(2L);
        assertThat(espece1).isNotEqualTo(espece2);
        espece1.setId(null);
        assertThat(espece1).isNotEqualTo(espece2);
    }
}
