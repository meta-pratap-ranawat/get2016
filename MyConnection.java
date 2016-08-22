import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.*;

import com.mysql.jdbc.Connection;


public class MyConnection {

	private java.sql.Connection conn;
	
	private PreparedStatement statement;
	
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
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
	
	public boolean setQuery(String query){
		
		try{
			
			 statement = conn.prepareStatement(query);
			
		} catch(SQLException se){
			
			System.out.println("Error in Query Process "+se);
			
			
			return false;
		}
		
		return true;
	}
	
	public void addParameter(){}
	
	public ResultSet executeQuery(){
		
		ResultSet res=null;
		try{
			
		res = statement.executeQuery();
		
		} catch(SQLException se){
			
			System.out.println("Error in Query Execution "+se);
			
			
		}
		
		return res;
	}
	
	public void close(){
		
		try {
			conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public static void main(String args[]){
		
		String query="select * from members";
		
		ResultSet res;
		
		MyConnection conn = new MyConnection();
		
		conn.setQuery(query);
		
		res = conn.executeQuery();
		try{
		 while(res.next()){
	         //Retrieve by column name
	         int id  = res.getInt(1);
	         String age = res.getString(2);
	         String first = res.getString(3);
	         String last = res.getString(4);

	         //Display values
	         System.out.print("ID: " + id);
	         System.out.print(",Name: " + age);
	         System.out.print(",Street: " + first);
	         System.out.println(",City: " + last);
	      }
		} catch(SQLException se){}
		System.out.println(" "+res);
		
	}

}
