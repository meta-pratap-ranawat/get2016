package com.carDekho;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionFactory {
	
	private static ConnectionFactory instance = new ConnectionFactory();
	public static Connection connection = null;

	public static final String URL = "jdbc:mysql://localhost/cardekho";
	public static final String USER = "root";
	public static final String PASSWORD = "1234";

	// Constructor
	private ConnectionFactory() {
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();

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
	public static Connection getConnection() {
		return instance.createConnection();
	}

}
