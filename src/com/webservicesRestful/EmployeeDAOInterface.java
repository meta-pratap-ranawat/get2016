package com.webservicesRestful;

import java.util.List;

public interface EmployeeDAOInterface {
	
	/**
	 * return all Employee data
	 * @return
	 */
	public List<Employee> getAllEmployees() ;
	
	/**
	 * find EMployee by id
	 * @param id
	 * @return
	 */
	public Employee findbyId(int id);
	
	public List<Employee> findbyName(String name);
	
	/**
	 * insert employee in database 
	 * @param employee
	 * @return
	 */
	public int insert(Employee employee);
	
	/**
	 * delete by id
	 * @param id
	 * @return
	 */
	public Employee deleteById(int id);
	
	/**
	 * update employee data
	 * @param employee
	 * @return
	 */
	public boolean update(Employee employee);

}
