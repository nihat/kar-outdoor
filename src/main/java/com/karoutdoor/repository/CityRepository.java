package com.karoutdoor.repository;

import com.karoutdoor.entity.City;
import com.karoutdoor.entity.Country;
import com.karoutdoor.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "cities", path = "cities")
public interface CityRepository extends JpaRepository<City, Integer> {

    @Query("SELECT city from City city where city.country.id= :countryId")
    List<City> findByCountryId(@Param("countryId") Integer countryId);
    Page<City> findByNameContaining(@Param("name") String name, Pageable pageable);

}
