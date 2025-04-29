package com.njwmerv.salita_back;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication(
	exclude = {org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration.class}
)
@EnableMongoRepositories
public class SalitaBackApplication implements CommandLineRunner{public static void main(String[] args) {
		SpringApplication.run(SalitaBackApplication.class, args);
	}

	@Override
	public void run(String... args){
		System.out.println("Running Salita Backend Application now...");
	}
}
