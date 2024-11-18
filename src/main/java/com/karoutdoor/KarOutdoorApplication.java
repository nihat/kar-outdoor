package com.karoutdoor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class KarOutdoorApplication {

    public static void main(String[] args) {
        SpringApplication.run(KarOutdoorApplication.class, args);
    }

}
