/**
 * this application is to create connection is with database
 * @author pratap
 * */

import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.*;


public class MyConnection {

	private Connection conn;
	
	public MyConnection() {

		try{
			
			Class.forName("com.mysql.jdbc.Driver");
			
		} catch(ClassNotFoundException cnfe){
			
			System.out.println("Error "+cnfe);
			
		}
		
		String host = "jdbc:mysql://localhost:3306/";
		String dbName = "lis";
		String mysqlURL = host +dbName;
		String userId = "root";
		String password = "1234";
		
		try {
			
			conn = DriverManager.getConnection(mysqlURL,userId,password);
			
		} catch (SQLException e) {
			
		
			e.printStackTrace();
			
		}
		
		
	}
	
	
	/*
	 * return connection object
	 * */
	public Connection getConnection(){
		
		return conn;
		
	}
	
	
	public void close(){
		
		try {
			
			conn.close();
			
		} catch (SQLException e) {
			
			
			e.printStackTrace();
		}
		
	}
	
}
