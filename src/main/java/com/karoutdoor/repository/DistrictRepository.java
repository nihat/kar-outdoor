package com.karoutdoor.repository;

import com.karoutdoor.entity.City;
import com.karoutdoor.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "districts", path = "districts")
public interface DistrictRepository extends JpaRepository<District, Integer> {

    @Query("SELECT d from District d where  d.city.id = :cityId")
    List<District> findDistrictsByCityId(@Param("cityId") Integer cityId);
}
