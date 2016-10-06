package com.carDekho;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Component;

import com.controller.AppConfig;


@Component
public class CarDao {
	
	@Autowired
	ConnectionFactory connectionFactory;
	
	@Autowired
	Car car;
	
	Connection connection;
	
	static String id = "id", updateTime = "updateTime",
			updatedBy = "updatedBy", make = "make", model = "model",
			engineInCC = "engineInCC", fuelCapacity = "fuelCapacity",
			milage = "milage", price = "price", roadTax = "roadTax", ac = "ac",
			powerSteering = "powerSteering", accessoryKit = "accessoryKit";

	
	public CarDao() {
		
		/*ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class); 
    	
    	connectionFactory = ctx.getBean(ConnectionFactory.class);*/
		
		 connection = connectionFactory.getConnection();
		
	}
	public List<Car> getAllCars() {
		List<Car> carList = new ArrayList<Car>();
		String query = "SELECT * FROM cars";
		PreparedStatement st;
		try {
			st = connection.prepareStatement(query);
			ResultSet resultset = st.executeQuery();
			
			/*ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class); 
	    	
	    	car = ctx.getBean(Car.class);*/

			// add all the data to list of Car
			while (resultset.next()) {
				
				car.setId(resultset.getInt(id));
				
				car.setMake(resultset.getString(make));
				car.setModel(resultset.getString(model));
				car.setEngineInCC(resultset.getInt(engineInCC));
				car.setFuelCapacity(resultset.getInt(fuelCapacity));
				car.setMilage(resultset.getInt(milage));
				car.setPrice(resultset.getInt(price));
				car.setRoadTax(resultset.getInt(roadTax));
				car.setAc(resultset.getInt(ac));
				car.setPowerSteering(resultset.getInt(powerSteering));
				car.setAccessoryKit(resultset.getInt(accessoryKit));
				carList.add(car);
				
			}
			
		} catch (SQLException e) {
			
			e.printStackTrace();
			
		}
		
		return carList;
		
	}

	
	public Car findCarbyId(int idToFind) {

		String query = "SELECT * FROM cars where id = " + idToFind;
		PreparedStatement st;
		/*
		ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class); 
    	
    	car = ctx.getBean(Car.class);*/
		
		try {
			st = connection.prepareStatement(query);
			ResultSet resultset = st.executeQuery();

			// add all the data to list of Car
			while (resultset.next()) {
				
				car.setId(resultset.getInt(id));
				
				car.setMake(resultset.getString(make));
				car.setModel(resultset.getString(model));
				car.setEngineInCC(resultset.getInt(engineInCC));
				car.setFuelCapacity(resultset.getInt(fuelCapacity));
				car.setMilage(resultset.getInt(milage));
				car.setPrice(resultset.getInt(price));
				car.setRoadTax(resultset.getInt(roadTax));
				car.setAc(resultset.getInt(ac));
				car.setPowerSteering(resultset.getInt(powerSteering));
				car.setAccessoryKit(resultset.getInt(accessoryKit));
				
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return car;
	}

	
	public int insert(Car car) {

		int last_inserted_id = -1;
		String query = "INSERT  INTO `cars` (`make`,`model`,`engineInCC`,`fuelCapacity`,`milage`,`price`,`roadTax`,`ac`,`powerSteering`,`accessoryKit`) "
				+ "VALUES (?,?,?,?,?,?,?,?,?,?)";
		PreparedStatement preparedStatement;
		try {
			preparedStatement = connection.prepareStatement(query);

			preparedStatement.setString(1, car.getMake());
			preparedStatement.setString(2, car.getModel());
			preparedStatement.setInt(3, car.getEngineInCC());
			preparedStatement.setInt(4, (int) car.getFuelCapacity());
			preparedStatement.setInt(5, (int) car.getMilage());
			preparedStatement.setInt(6, (int) car.getPrice());
			preparedStatement.setInt(7, (int) car.getRoadTax());
			preparedStatement.setInt(8, car.getAc());
			preparedStatement.setInt(9, car.getPowerSteering());
			preparedStatement.setInt(10, car.getAccessoryKit());
			preparedStatement.executeUpdate();

			ResultSet rs = preparedStatement.getGeneratedKeys();
			if (rs.next()) {
				last_inserted_id = rs.getInt(1);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return last_inserted_id;
	}

	
	public boolean deleteById(int id) {
		int deletedRows = 0;
		boolean status = false;
		String query = "DELETE FROM cars WHERE id= ?";
		try {
			PreparedStatement preparedStatement = connection
					.prepareStatement(query);
			preparedStatement.setInt(1, id);
			deletedRows = preparedStatement.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		}
		if (deletedRows > 0) {
			status = true;
		}
		return status;
	}

	
	public boolean update(Car car) {

		boolean status = false;
		String query = "UPDATE `cars` SET `make`=?,`model`=?,`engineInCC`=?,`fuelCapacity`=?,`milage`=?,`price`=?,`roadTax`=?,`ac`=?,`powerSteering`=?,`accessoryKit`=? "
				+ " WHERE id = " + car.getId();
		PreparedStatement preparedStatement;
		try {
			preparedStatement = connection.prepareStatement(query);

			preparedStatement.setString(1, car.getMake());
			preparedStatement.setString(2, car.getModel());
			preparedStatement.setInt(3, car.getEngineInCC());
			preparedStatement.setInt(4, (int) car.getFuelCapacity());
			preparedStatement.setInt(5, (int) car.getMilage());
			preparedStatement.setInt(6, (int) car.getPrice());
			preparedStatement.setInt(7, (int) car.getRoadTax());
			preparedStatement.setInt(8, car.getAc());
			preparedStatement.setInt(9, car.getPowerSteering());
			preparedStatement.setInt(10, car.getAccessoryKit());
			int effectedRow = preparedStatement.executeUpdate();
			if (effectedRow > 0) {
				status = true;
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
		System.out.println("status = " + status);

		return status;
	}


	public static void closeCarDao() {
		// TODO Auto-generated method stub
		//connection.close();
		
	}

}
