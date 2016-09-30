package com.webservicesRestful;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;



public class EmployeeDAO implements EmployeeDAOInterface {
	
	private Connection conn;
	
	int id;
	 String name,address,email,position;
	
	/*EmployeeDAO using connectionFactory*/
	public EmployeeDAO(){
		
		 conn = ConnectionFactory.getConnection();
		
	}

	@Override
	public List<Employee> getAllEmployees() {
		List<Employee> employeeList = new ArrayList<Employee>();
		String query = "SELECT `id`, `name`, `email`, `address` , `position` FROM `employees`";
		PreparedStatement st;
		try {
			st = conn.prepareStatement(query);
			ResultSet resultset = st.executeQuery();

			// add all the data to list of EmployeeList
			while (resultset.next()) {
				Employee employee = new Employee();
				
				employee.setId(resultset.getInt(1));
				employee.setName(resultset.getString(2));
				employee.setEmail(resultset.getString(3));
				employee.setAddress(resultset.getString(4));
				employee.setProfession(resultset.getString(5));

				employeeList.add(employee);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return employeeList;
	}

	@Override
	public int insert(Employee employee) {
		int last_inserted_id = -1;
		String query = "INSERT INTO `employees`(`id` , `name`, `email`, `address`, `position`) VALUES "
				+ "(?,?,?,?,?)";
		PreparedStatement preparedStatement;
		try {
			preparedStatement = conn.prepareStatement(query);
			preparedStatement.setInt(1, employee.getId());
			preparedStatement.setString(2, employee.getName());
			preparedStatement.setString(5, employee.getProfession());
			preparedStatement.setString(3, employee.getEmail());
			preparedStatement.setString(4,employee.getAddress());

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

	@Override
	public Employee deleteById(int id) {
		int deletedRows = 0;
		Employee deletedEmployee = findbyId(id);
		
		boolean status = false;
		String query = "DELETE FROM `employees` WHERE  id= ?";
		try {
			PreparedStatement preparedStatement = conn
					.prepareStatement(query);
			preparedStatement.setInt(1, id);
			deletedRows = preparedStatement.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		}
		if (deletedRows > 0) {
			status = true;
		}
		return deletedEmployee;
	}

	@Override
	public boolean update(Employee employee) {
		boolean status = false;
		String query = "UPDATE `employees` SET "
				+ " `id`= ? , `name`= ? , `email`= ?,`address`= ?,`position`=? "
				+ "WHERE id = " + employee.getId();
		PreparedStatement preparedStatement;
		try {
			preparedStatement = conn.prepareStatement(query);

			preparedStatement.setInt(1, employee.getId());
			preparedStatement.setString(2, employee.getName());
			preparedStatement.setString(5, employee.getProfession());
			preparedStatement.setString(3, employee.getEmail());
			preparedStatement.setString(4,employee.getAddress());
			
			
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

	@Override
	public Employee findbyId(int empid) {
		List<Employee> employeeList = new ArrayList<Employee>();Employee employee=null;
		String query = "SELECT `id`, `name`, `email`, `address` , `position` FROM `employees` WHERE `id`=" + empid;
		PreparedStatement st;
		try {
			st = conn.prepareStatement(query);
			ResultSet resultset = st.executeQuery();
			
			// add all the data to list of EmployeeList
			while (resultset.next()) {
				employee = new Employee();
				employee.setId(resultset.getInt(1));
				employee.setName(resultset.getString(2));
				employee.setEmail(resultset.getString(3));
				employee.setAddress(resultset.getString(4));
				employee.setProfession(resultset.getString(5));

				employeeList.add(employee);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return employee;
	}
	
	@Override
	public List<Employee> findbyName(String name) {
		List<Employee> employeeList = new ArrayList<Employee>();
		String query = "SELECT `id`, `name`, `email`, `address`, `position` FROM `employees` WHERE `name`= ?" ;
		
		PreparedStatement st;
		try {
			
			st = conn.prepareStatement(query);
			st.setString(1, name);
			ResultSet resultset = st.executeQuery();

			// add all the data to list of EmployeeList
			while (resultset.next()) {
				Employee employee = new Employee();
				employee.setId(resultset.getInt(1));
				employee.setName(resultset.getString(2));
				employee.setEmail(resultset.getString(3));
				employee.setAddress(resultset.getString(4));
				employee.setProfession(resultset.getString(5));

				employeeList.add(employee);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return employeeList;
	}
}
