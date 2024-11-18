package com.karoutdoor.repository;

import com.karoutdoor.entity.Country;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "countries",path = "countries")
public interface CountryRepository extends JpaRepository<Country, Integer> {

    @Cacheable("countries")
    @Query("SELECT country from Country country order by country.order ASC")
    List<Country> findAllCountries();

}
