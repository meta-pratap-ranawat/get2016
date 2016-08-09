/**
 * this application is to Add new Employee in Database but it will not add duplicate entity by employeeId
 * @author pratap
 * */

import java.util.HashSet;

/*
 * extends Employee Entity
 * */
public class AddEmployee extends Employee {


	/*
	 * default constructor
	 * */
	public AddEmployee() {

		super();

	}


	/**
	 * parameterized constructor by parameter to parent call
	 * @param employeeId
	 * @param employeeName
	 * @param employeeAddress
	 * */
	public AddEmployee(Integer employeeId, String employeeName, String employeeAddress) {

		super(employeeId, employeeName, employeeAddress);

	}



	@Override
	public boolean equals(Object o){

		AddEmployee employee = (AddEmployee)o;

		if(employee.getEmployeeId().equals(this.getEmployeeId())){

			return true;

		}

		return false;

	}



	@Override
	public int hashCode() {


		return this.getEmployeeId().hashCode();

	}

	
	@Override
	public String toString(){

		return ("Id "+getEmployeeId()+", Name "+getEmployeeName()+", Address "+getEmployeeAddress());
	}

	public static void main(String[] args) {

		HashSet<AddEmployee> employeeSet = new HashSet<AddEmployee>();

		employeeSet.add(new AddEmployee(1,"Pratap","jaipur"));

		employeeSet.add(new AddEmployee(2,"Vijay","jaipur"));

		employeeSet.add(new AddEmployee(3,"Rahul","jaipur"));

		employeeSet.add(new AddEmployee(1,"Ram","Chittorgarh"));			// tried to add duplicate data

		employeeSet.add(new AddEmployee(2,"Pratap","Bhilwara"));			// tried to add duplicate data

		for(AddEmployee e : employeeSet){

			System.out.println(e);

		}

	}

}
