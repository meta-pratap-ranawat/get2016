package com.carDekho;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = {"com.carDekho" , "com.controller"})
public class AppConfig {
	
	@Bean
	public ConnectionFactory getBean(){
		
		return new ConnectionFactory();
	}

}

