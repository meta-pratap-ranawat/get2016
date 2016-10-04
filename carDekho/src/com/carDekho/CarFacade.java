package com.carDekho;


import java.util.List;

public class CarFacade {

	private static CarFacade facade = null;	//Facade object for singleton pattern
	
	/**
	 * Constructor to implement the singleton pattern
	 */
	private CarFacade() {
		
	}
	
	/**
	 * To get the available car list
	 * @return The list of Car objects containing the make and models of the cars
	 */
	public List<Car> getCarList() {
		
		CarDao carDao = new CarDao();
		
		
		return carDao.getAllCars();	
	}
	
	/**
	 * To get the Car object based on the id
	 * @param id - The id of the car whose details needs to be fetched
	 * @return - The object of Car class
	 */
	public List<Car> getCarDetailsById(int id) {
		CarDao carDao = new CarDao();
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
		CarDao carDao = new CarDao();;
		
			return carDao.update(car);
		
	}
	
	/**
	 * To get the facade object
	 * @return - The Facade object
	 */
	public static CarFacade getFacade() {
		//Checking if facade object already exists or not
		if(facade == null) {
			facade = new CarFacade();
		}
		return facade;
	}
	
	/**
	 * To close the facade object
	 */
	public static void closeFacade() {
		CarDao.closeCarDao();
	}
}