package com.carDekho;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope(value="singleton")
public class ConnectionFactory {
	
	
	public  Connection connection = null;

	public static final String URL = "jdbc:mysql://localhost/cardekho";
	public static final String USER = "root";
	public static final String PASSWORD = "1234";

	// Constructor
	public ConnectionFactory() {
		try {
			Class.forName("com.mysql.jdbc.Driver");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// To create connection
	private Connection createConnection() {

		if(connection==null) {
			try {
				connection = DriverManager.getConnection(URL, USER, PASSWORD);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return connection;
	}

	/**
	 * To get object of connection for database
	 * 
	 * @return
	 */
	public  Connection getConnection() {
		return this.createConnection();
	}

}
