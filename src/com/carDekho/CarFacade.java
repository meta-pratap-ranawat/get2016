package com.carDekho;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.controller.AppConfig;

@Component
@Scope(value = "singleton")
public class CarFacade {

	@Autowired
	CarDao carDao;
	
	
	
	/**
	 * Constructor to implement the singleton pattern
	 */
	public CarFacade() {
		
		
	}
	
	/**
	 * To get the available car list
	 * @return The list of Car objects containing the make and models of the cars
	 */
	public List<Car> getCarList() {
		
		
		
		
		return carDao.getAllCars();	
	}
	
	/**
	 * To get the Car object based on the id
	 * @param id - The id of the car whose details needs to be fetched
	 * @return - The object of Car class
	 */
	public Car getCarDetailsById(int id) {
		
		//Getting the result set
		return carDao.findCarbyId(id);
	}
	
	
	/**
	 * To update or insert the car details
	 * @param car - The Car object containing the cars details
	 * @param carto - The CarTO object containing the cars metadata details
	 * @return - True if the operation is successful else false
	 */
	public boolean addUpdateCarDetails(Car car) {
		
			return carDao.update(car);
		
	}
	
	
	/**
	 * To close the facade object
	 */
	public static void closeFacade() {
		CarDao.closeCarDao();
	}
}