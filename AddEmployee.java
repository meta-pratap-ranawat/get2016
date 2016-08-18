/**
 * this application is to Add new Employee in Database but it will not add duplicate entity by employeeId
 * @author pratap
 * */

import java.util.HashSet;

/*
 * extends Employee Entity
 * */
public class AddEmployee extends Employee {

	private static int employeeId;			//updated Code

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
	public AddEmployee( String employeeName, String employeeAddress) {		//updated Code

		super(++employeeId, employeeName, employeeAddress);			//updated Code

	}



	@Override
	public boolean equals(Object o){

		AddEmployee employee = (AddEmployee)o;

		if(employee.getEmployeeName().equals(this.getEmployeeName())){			//updated Code

			return true;

		}

		return false;

	}



	@Override
	public int hashCode() {


		return this.getEmployeeName().hashCode();				//updated Code

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

		employeeSet.add(new AddEmployee("Pratap","jaipur"));				//updated Code

		employeeSet.add(new AddEmployee("Vijay","jaipur"));				//updated Code

		employeeSet.add(new AddEmployee("Rahul","jaipur"));				//updated Code

		employeeSet.add(new AddEmployee("Ram","Chittorgarh"));				//updated Code

		employeeSet.add(new AddEmployee("Pratap","Bhilwara"));			// tried to add duplicate data

		for(AddEmployee e : employeeSet){

			System.out.println(e);

		}

	}

}
