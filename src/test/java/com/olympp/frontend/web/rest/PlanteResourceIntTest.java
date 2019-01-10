package com.olympp.frontend.web.rest;

import com.olympp.frontend.GatewayApp;

import com.olympp.frontend.domain.Plante;
import com.olympp.frontend.domain.ClassificationCronquist;
import com.olympp.frontend.repository.PlanteRepository;
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

import com.olympp.frontend.domain.enumeration.Mois;
import com.olympp.frontend.domain.enumeration.Mois;
import com.olympp.frontend.domain.enumeration.Strate;
import com.olympp.frontend.domain.enumeration.VitesseCroissance;
import com.olympp.frontend.domain.enumeration.Ensoleillement;
import com.olympp.frontend.domain.enumeration.RichesseSol;
import com.olympp.frontend.domain.enumeration.TypeTerre;
import com.olympp.frontend.domain.enumeration.TypeFeuillage;
import com.olympp.frontend.domain.enumeration.TypeRacine;
/**
 * Test class for the PlanteResource REST controller.
 *
 * @see PlanteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class PlanteResourceIntTest {

    private static final Mois DEFAULT_FLORAISON = Mois.JANVIER;
    private static final Mois UPDATED_FLORAISON = Mois.FEVRIER;

    private static final Mois DEFAULT_RECOLTE = Mois.JANVIER;
    private static final Mois UPDATED_RECOLTE = Mois.FEVRIER;

    private static final Strate DEFAULT_STRATE = Strate.HYPOGEE;
    private static final Strate UPDATED_STRATE = Strate.MUSCINALE;

    private static final VitesseCroissance DEFAULT_CROISSANCE = VitesseCroissance.TRES_LENTE;
    private static final VitesseCroissance UPDATED_CROISSANCE = VitesseCroissance.LENTE;

    private static final Ensoleillement DEFAULT_ENSOLEILLEMENT = Ensoleillement.SOLEIL;
    private static final Ensoleillement UPDATED_ENSOLEILLEMENT = Ensoleillement.MI_OMBRE;

    private static final String DEFAULT_PH_MIN = "4";
    private static final String UPDATED_PH_MIN = "";

    private static final String DEFAULT_PH_MAX = ",4";
    private static final String UPDATED_PH_MAX = "1";

    private static final RichesseSol DEFAULT_RICHESSE_SOL = RichesseSol.TRES_PAUVRE;
    private static final RichesseSol UPDATED_RICHESSE_SOL = RichesseSol.PAUVRE;

    private static final TypeTerre DEFAULT_TYPE_TERRE = TypeTerre.ARGILEUSE;
    private static final TypeTerre UPDATED_TYPE_TERRE = TypeTerre.CALCAIRE;

    private static final Integer DEFAULT_TEMP_MIN = 1;
    private static final Integer UPDATED_TEMP_MIN = 2;

    private static final Integer DEFAULT_TEMP_MAX = 1;
    private static final Integer UPDATED_TEMP_MAX = 2;

    private static final TypeFeuillage DEFAULT_TYPE_FEUILLAGE = TypeFeuillage.PERSISTANT;
    private static final TypeFeuillage UPDATED_TYPE_FEUILLAGE = TypeFeuillage.SEMI_PERSISTANT;

    private static final TypeRacine DEFAULT_TYPE_RACINE = TypeRacine.PIVOTANTE;
    private static final TypeRacine UPDATED_TYPE_RACINE = TypeRacine.FASCICULAIRE;

    @Autowired
    private PlanteRepository planteRepository;

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

    private MockMvc restPlanteMockMvc;

    private Plante plante;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlanteResource planteResource = new PlanteResource(planteRepository);
        this.restPlanteMockMvc = MockMvcBuilders.standaloneSetup(planteResource)
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
    public static Plante createEntity(EntityManager em) {
        Plante plante = new Plante()
            .floraison(DEFAULT_FLORAISON)
            .recolte(DEFAULT_RECOLTE)
            .strate(DEFAULT_STRATE)
            .croissance(DEFAULT_CROISSANCE)
            .ensoleillement(DEFAULT_ENSOLEILLEMENT)
            .phMin(DEFAULT_PH_MIN)
            .phMax(DEFAULT_PH_MAX)
            .richesseSol(DEFAULT_RICHESSE_SOL)
            .typeTerre(DEFAULT_TYPE_TERRE)
            .tempMin(DEFAULT_TEMP_MIN)
            .tempMax(DEFAULT_TEMP_MAX)
            .typeFeuillage(DEFAULT_TYPE_FEUILLAGE)
            .typeRacine(DEFAULT_TYPE_RACINE);
        // Add required entity
        ClassificationCronquist classificationCronquist = ClassificationCronquistResourceIntTest.createEntity(em);
        em.persist(classificationCronquist);
        em.flush();
        plante.setClassificationCronquist(classificationCronquist);
        return plante;
    }

    @Before
    public void initTest() {
        plante = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlante() throws Exception {
        int databaseSizeBeforeCreate = planteRepository.findAll().size();

        // Create the Plante
        restPlanteMockMvc.perform(post("/api/plantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plante)))
            .andExpect(status().isCreated());

        // Validate the Plante in the database
        List<Plante> planteList = planteRepository.findAll();
        assertThat(planteList).hasSize(databaseSizeBeforeCreate + 1);
        Plante testPlante = planteList.get(planteList.size() - 1);
        assertThat(testPlante.getFloraison()).isEqualTo(DEFAULT_FLORAISON);
        assertThat(testPlante.getRecolte()).isEqualTo(DEFAULT_RECOLTE);
        assertThat(testPlante.getStrate()).isEqualTo(DEFAULT_STRATE);
        assertThat(testPlante.getCroissance()).isEqualTo(DEFAULT_CROISSANCE);
        assertThat(testPlante.getEnsoleillement()).isEqualTo(DEFAULT_ENSOLEILLEMENT);
        assertThat(testPlante.getPhMin()).isEqualTo(DEFAULT_PH_MIN);
        assertThat(testPlante.getPhMax()).isEqualTo(DEFAULT_PH_MAX);
        assertThat(testPlante.getRichesseSol()).isEqualTo(DEFAULT_RICHESSE_SOL);
        assertThat(testPlante.getTypeTerre()).isEqualTo(DEFAULT_TYPE_TERRE);
        assertThat(testPlante.getTempMin()).isEqualTo(DEFAULT_TEMP_MIN);
        assertThat(testPlante.getTempMax()).isEqualTo(DEFAULT_TEMP_MAX);
        assertThat(testPlante.getTypeFeuillage()).isEqualTo(DEFAULT_TYPE_FEUILLAGE);
        assertThat(testPlante.getTypeRacine()).isEqualTo(DEFAULT_TYPE_RACINE);
    }

    @Test
    @Transactional
    public void createPlanteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = planteRepository.findAll().size();

        // Create the Plante with an existing ID
        plante.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlanteMockMvc.perform(post("/api/plantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plante)))
            .andExpect(status().isBadRequest());

        // Validate the Plante in the database
        List<Plante> planteList = planteRepository.findAll();
        assertThat(planteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPlantes() throws Exception {
        // Initialize the database
        planteRepository.saveAndFlush(plante);

        // Get all the planteList
        restPlanteMockMvc.perform(get("/api/plantes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plante.getId().intValue())))
            .andExpect(jsonPath("$.[*].floraison").value(hasItem(DEFAULT_FLORAISON.toString())))
            .andExpect(jsonPath("$.[*].recolte").value(hasItem(DEFAULT_RECOLTE.toString())))
            .andExpect(jsonPath("$.[*].strate").value(hasItem(DEFAULT_STRATE.toString())))
            .andExpect(jsonPath("$.[*].croissance").value(hasItem(DEFAULT_CROISSANCE.toString())))
            .andExpect(jsonPath("$.[*].ensoleillement").value(hasItem(DEFAULT_ENSOLEILLEMENT.toString())))
            .andExpect(jsonPath("$.[*].phMin").value(hasItem(DEFAULT_PH_MIN.toString())))
            .andExpect(jsonPath("$.[*].phMax").value(hasItem(DEFAULT_PH_MAX.toString())))
            .andExpect(jsonPath("$.[*].richesseSol").value(hasItem(DEFAULT_RICHESSE_SOL.toString())))
            .andExpect(jsonPath("$.[*].typeTerre").value(hasItem(DEFAULT_TYPE_TERRE.toString())))
            .andExpect(jsonPath("$.[*].tempMin").value(hasItem(DEFAULT_TEMP_MIN)))
            .andExpect(jsonPath("$.[*].tempMax").value(hasItem(DEFAULT_TEMP_MAX)))
            .andExpect(jsonPath("$.[*].typeFeuillage").value(hasItem(DEFAULT_TYPE_FEUILLAGE.toString())))
            .andExpect(jsonPath("$.[*].typeRacine").value(hasItem(DEFAULT_TYPE_RACINE.toString())));
    }
    
    @Test
    @Transactional
    public void getPlante() throws Exception {
        // Initialize the database
        planteRepository.saveAndFlush(plante);

        // Get the plante
        restPlanteMockMvc.perform(get("/api/plantes/{id}", plante.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(plante.getId().intValue()))
            .andExpect(jsonPath("$.floraison").value(DEFAULT_FLORAISON.toString()))
            .andExpect(jsonPath("$.recolte").value(DEFAULT_RECOLTE.toString()))
            .andExpect(jsonPath("$.strate").value(DEFAULT_STRATE.toString()))
            .andExpect(jsonPath("$.croissance").value(DEFAULT_CROISSANCE.toString()))
            .andExpect(jsonPath("$.ensoleillement").value(DEFAULT_ENSOLEILLEMENT.toString()))
            .andExpect(jsonPath("$.phMin").value(DEFAULT_PH_MIN.toString()))
            .andExpect(jsonPath("$.phMax").value(DEFAULT_PH_MAX.toString()))
            .andExpect(jsonPath("$.richesseSol").value(DEFAULT_RICHESSE_SOL.toString()))
            .andExpect(jsonPath("$.typeTerre").value(DEFAULT_TYPE_TERRE.toString()))
            .andExpect(jsonPath("$.tempMin").value(DEFAULT_TEMP_MIN))
            .andExpect(jsonPath("$.tempMax").value(DEFAULT_TEMP_MAX))
            .andExpect(jsonPath("$.typeFeuillage").value(DEFAULT_TYPE_FEUILLAGE.toString()))
            .andExpect(jsonPath("$.typeRacine").value(DEFAULT_TYPE_RACINE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPlante() throws Exception {
        // Get the plante
        restPlanteMockMvc.perform(get("/api/plantes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlante() throws Exception {
        // Initialize the database
        planteRepository.saveAndFlush(plante);

        int databaseSizeBeforeUpdate = planteRepository.findAll().size();

        // Update the plante
        Plante updatedPlante = planteRepository.findById(plante.getId()).get();
        // Disconnect from session so that the updates on updatedPlante are not directly saved in db
        em.detach(updatedPlante);
        updatedPlante
            .floraison(UPDATED_FLORAISON)
            .recolte(UPDATED_RECOLTE)
            .strate(UPDATED_STRATE)
            .croissance(UPDATED_CROISSANCE)
            .ensoleillement(UPDATED_ENSOLEILLEMENT)
            .phMin(UPDATED_PH_MIN)
            .phMax(UPDATED_PH_MAX)
            .richesseSol(UPDATED_RICHESSE_SOL)
            .typeTerre(UPDATED_TYPE_TERRE)
            .tempMin(UPDATED_TEMP_MIN)
            .tempMax(UPDATED_TEMP_MAX)
            .typeFeuillage(UPDATED_TYPE_FEUILLAGE)
            .typeRacine(UPDATED_TYPE_RACINE);

        restPlanteMockMvc.perform(put("/api/plantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlante)))
            .andExpect(status().isOk());

        // Validate the Plante in the database
        List<Plante> planteList = planteRepository.findAll();
        assertThat(planteList).hasSize(databaseSizeBeforeUpdate);
        Plante testPlante = planteList.get(planteList.size() - 1);
        assertThat(testPlante.getFloraison()).isEqualTo(UPDATED_FLORAISON);
        assertThat(testPlante.getRecolte()).isEqualTo(UPDATED_RECOLTE);
        assertThat(testPlante.getStrate()).isEqualTo(UPDATED_STRATE);
        assertThat(testPlante.getCroissance()).isEqualTo(UPDATED_CROISSANCE);
        assertThat(testPlante.getEnsoleillement()).isEqualTo(UPDATED_ENSOLEILLEMENT);
        assertThat(testPlante.getPhMin()).isEqualTo(UPDATED_PH_MIN);
        assertThat(testPlante.getPhMax()).isEqualTo(UPDATED_PH_MAX);
        assertThat(testPlante.getRichesseSol()).isEqualTo(UPDATED_RICHESSE_SOL);
        assertThat(testPlante.getTypeTerre()).isEqualTo(UPDATED_TYPE_TERRE);
        assertThat(testPlante.getTempMin()).isEqualTo(UPDATED_TEMP_MIN);
        assertThat(testPlante.getTempMax()).isEqualTo(UPDATED_TEMP_MAX);
        assertThat(testPlante.getTypeFeuillage()).isEqualTo(UPDATED_TYPE_FEUILLAGE);
        assertThat(testPlante.getTypeRacine()).isEqualTo(UPDATED_TYPE_RACINE);
    }

    @Test
    @Transactional
    public void updateNonExistingPlante() throws Exception {
        int databaseSizeBeforeUpdate = planteRepository.findAll().size();

        // Create the Plante

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanteMockMvc.perform(put("/api/plantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plante)))
            .andExpect(status().isBadRequest());

        // Validate the Plante in the database
        List<Plante> planteList = planteRepository.findAll();
        assertThat(planteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlante() throws Exception {
        // Initialize the database
        planteRepository.saveAndFlush(plante);

        int databaseSizeBeforeDelete = planteRepository.findAll().size();

        // Get the plante
        restPlanteMockMvc.perform(delete("/api/plantes/{id}", plante.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Plante> planteList = planteRepository.findAll();
        assertThat(planteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Plante.class);
        Plante plante1 = new Plante();
        plante1.setId(1L);
        Plante plante2 = new Plante();
        plante2.setId(plante1.getId());
        assertThat(plante1).isEqualTo(plante2);
        plante2.setId(2L);
        assertThat(plante1).isNotEqualTo(plante2);
        plante1.setId(null);
        assertThat(plante1).isNotEqualTo(plante2);
    }
}
