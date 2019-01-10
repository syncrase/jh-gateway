package com.olympp.frontend.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.olympp.frontend.domain.enumeration.Mois;

import com.olympp.frontend.domain.enumeration.Strate;

import com.olympp.frontend.domain.enumeration.VitesseCroissance;

import com.olympp.frontend.domain.enumeration.Ensoleillement;

import com.olympp.frontend.domain.enumeration.RichesseSol;

import com.olympp.frontend.domain.enumeration.TypeTerre;

import com.olympp.frontend.domain.enumeration.TypeFeuillage;

import com.olympp.frontend.domain.enumeration.TypeRacine;

/**
 * @author Pierre TAQUET
 */
@ApiModel(description = "@author Pierre TAQUET")
@Entity
@Table(name = "plante")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Plante implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "floraison")
    private Mois floraison;

    @Enumerated(EnumType.STRING)
    @Column(name = "recolte")
    private Mois recolte;

    @Enumerated(EnumType.STRING)
    @Column(name = "strate")
    private Strate strate;

    @Enumerated(EnumType.STRING)
    @Column(name = "croissance")
    private VitesseCroissance croissance;

    @Enumerated(EnumType.STRING)
    @Column(name = "ensoleillement")
    private Ensoleillement ensoleillement;

    @Pattern(regexp = "^\\d{0,1}(,\\d){0,1}$")
    @Column(name = "ph_min")
    private String phMin;

    @Pattern(regexp = "^\\d{0,1}(,\\d){0,1}$")
    @Column(name = "ph_max")
    private String phMax;

    @Enumerated(EnumType.STRING)
    @Column(name = "richesse_sol")
    private RichesseSol richesseSol;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_terre")
    private TypeTerre typeTerre;

    @Column(name = "temp_min")
    private Integer tempMin;

    @Column(name = "temp_max")
    private Integer tempMax;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_feuillage")
    private TypeFeuillage typeFeuillage;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_racine")
    private TypeRacine typeRacine;

    @OneToOne(optional = false)    @NotNull
    @JoinColumn(unique = true)
    private ClassificationCronquist classificationCronquist;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Mois getFloraison() {
        return floraison;
    }

    public Plante floraison(Mois floraison) {
        this.floraison = floraison;
        return this;
    }

    public void setFloraison(Mois floraison) {
        this.floraison = floraison;
    }

    public Mois getRecolte() {
        return recolte;
    }

    public Plante recolte(Mois recolte) {
        this.recolte = recolte;
        return this;
    }

    public void setRecolte(Mois recolte) {
        this.recolte = recolte;
    }

    public Strate getStrate() {
        return strate;
    }

    public Plante strate(Strate strate) {
        this.strate = strate;
        return this;
    }

    public void setStrate(Strate strate) {
        this.strate = strate;
    }

    public VitesseCroissance getCroissance() {
        return croissance;
    }

    public Plante croissance(VitesseCroissance croissance) {
        this.croissance = croissance;
        return this;
    }

    public void setCroissance(VitesseCroissance croissance) {
        this.croissance = croissance;
    }

    public Ensoleillement getEnsoleillement() {
        return ensoleillement;
    }

    public Plante ensoleillement(Ensoleillement ensoleillement) {
        this.ensoleillement = ensoleillement;
        return this;
    }

    public void setEnsoleillement(Ensoleillement ensoleillement) {
        this.ensoleillement = ensoleillement;
    }

    public String getPhMin() {
        return phMin;
    }

    public Plante phMin(String phMin) {
        this.phMin = phMin;
        return this;
    }

    public void setPhMin(String phMin) {
        this.phMin = phMin;
    }

    public String getPhMax() {
        return phMax;
    }

    public Plante phMax(String phMax) {
        this.phMax = phMax;
        return this;
    }

    public void setPhMax(String phMax) {
        this.phMax = phMax;
    }

    public RichesseSol getRichesseSol() {
        return richesseSol;
    }

    public Plante richesseSol(RichesseSol richesseSol) {
        this.richesseSol = richesseSol;
        return this;
    }

    public void setRichesseSol(RichesseSol richesseSol) {
        this.richesseSol = richesseSol;
    }

    public TypeTerre getTypeTerre() {
        return typeTerre;
    }

    public Plante typeTerre(TypeTerre typeTerre) {
        this.typeTerre = typeTerre;
        return this;
    }

    public void setTypeTerre(TypeTerre typeTerre) {
        this.typeTerre = typeTerre;
    }

    public Integer getTempMin() {
        return tempMin;
    }

    public Plante tempMin(Integer tempMin) {
        this.tempMin = tempMin;
        return this;
    }

    public void setTempMin(Integer tempMin) {
        this.tempMin = tempMin;
    }

    public Integer getTempMax() {
        return tempMax;
    }

    public Plante tempMax(Integer tempMax) {
        this.tempMax = tempMax;
        return this;
    }

    public void setTempMax(Integer tempMax) {
        this.tempMax = tempMax;
    }

    public TypeFeuillage getTypeFeuillage() {
        return typeFeuillage;
    }

    public Plante typeFeuillage(TypeFeuillage typeFeuillage) {
        this.typeFeuillage = typeFeuillage;
        return this;
    }

    public void setTypeFeuillage(TypeFeuillage typeFeuillage) {
        this.typeFeuillage = typeFeuillage;
    }

    public TypeRacine getTypeRacine() {
        return typeRacine;
    }

    public Plante typeRacine(TypeRacine typeRacine) {
        this.typeRacine = typeRacine;
        return this;
    }

    public void setTypeRacine(TypeRacine typeRacine) {
        this.typeRacine = typeRacine;
    }

    public ClassificationCronquist getClassificationCronquist() {
        return classificationCronquist;
    }

    public Plante classificationCronquist(ClassificationCronquist classificationCronquist) {
        this.classificationCronquist = classificationCronquist;
        return this;
    }

    public void setClassificationCronquist(ClassificationCronquist classificationCronquist) {
        this.classificationCronquist = classificationCronquist;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Plante plante = (Plante) o;
        if (plante.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), plante.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Plante{" +
            "id=" + getId() +
            ", floraison='" + getFloraison() + "'" +
            ", recolte='" + getRecolte() + "'" +
            ", strate='" + getStrate() + "'" +
            ", croissance='" + getCroissance() + "'" +
            ", ensoleillement='" + getEnsoleillement() + "'" +
            ", phMin='" + getPhMin() + "'" +
            ", phMax='" + getPhMax() + "'" +
            ", richesseSol='" + getRichesseSol() + "'" +
            ", typeTerre='" + getTypeTerre() + "'" +
            ", tempMin=" + getTempMin() +
            ", tempMax=" + getTempMax() +
            ", typeFeuillage='" + getTypeFeuillage() + "'" +
            ", typeRacine='" + getTypeRacine() + "'" +
            "}";
    }
}
