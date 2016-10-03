package com.customer;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;



public class CustomerDAO implements CustomerDAOInterface {
	
	private Connection conn;
	
	int id;
	 String name,address,email,position;
	
	/*EmployeeDAO using connectionFactory*/
	public CustomerDAO(){
		
		 conn = ConnectionFactory.getConnection();
		
	}

	@Override
	public List<Customer> getAllCustomers() {
		List<Customer> customerList = new ArrayList<Customer>();
		String query = "SELECT `id`, `firstName`, `lastName` , `email`, `address` , `numberOfOrders` FROM `customers`";
		PreparedStatement st;
		try {
			st = conn.prepareStatement(query);
			ResultSet resultset = st.executeQuery();

			// add all the data to list of EmployeeList
			while (resultset.next()) {
				Customer customer = new Customer();
				
				customer.setId(resultset.getInt(1));
				customer.setFirstName(resultset.getString(2));
				customer.setLastName(resultset.getString(3));
				customer.setEmail(resultset.getString(4));
				customer.setAddress(resultset.getString(5));
				customer.setNumberOfOrders(resultset.getInt(6));

				customerList.add(customer);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return customerList;
	}

	

	

	
	
	
	
}
