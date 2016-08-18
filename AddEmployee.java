/**
 * this application is to Add new Employee in Database but it will not add duplicate entity by employeeId
 * @author pratap
 * */

import java.util.HashSet;

/*
 * extends Employee Entity
 * */
public class AddEmployee extends Employee {

	private static int employeeId;

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
	public AddEmployee( String employeeName, String employeeAddress) {

		super(++employeeId, employeeName, employeeAddress);

	}



	@Override
	public boolean equals(Object o){

		AddEmployee employee = (AddEmployee)o;

		if(employee.getEmployeeName().equals(this.getEmployeeName())){

			return true;

		}

		return false;

	}



	@Override
	public int hashCode() {


		return this.getEmployeeName().hashCode();

	}


	@Override
	public String toString(){

		return ("Id "+getEmployeeId()+", Name "+getEmployeeName()+", Address "+getEmployeeAddress());
	}
	
	/**
	 * main is only to test class separately for compiled test Junit is available 
	 * */
	public static void main(String[] args) {

		HashSet<AddEmployee> employeeSet = new HashSet<AddEmployee>();

		employeeSet.add(new AddEmployee("Pratap","jaipur"));

		employeeSet.add(new AddEmployee("Vijay","jaipur"));

		employeeSet.add(new AddEmployee("Rahul","jaipur"));

		employeeSet.add(new AddEmployee("Ram","Chittorgarh"));			// tried to add duplicate data

		employeeSet.add(new AddEmployee("Pratap","Bhilwara"));			// tried to add duplicate data

		for(AddEmployee e : employeeSet){

			System.out.println(e);

		}

	}

}
