import java.util.Comparator;

/**
 * this application is describe Employee Entity with its ID, name, address
 * 
 * And implements sorting method of Comparable and Comparator
 * @author pratap 
 * */
public class Employee implements Comparable<Employee>, Comparator<Employee>{

	private Integer employeeId;							// employee ID

	private String employeeName,employeeAddress;		//employee Name and employee address

	
	
	/*
	 * default initialization
	 * 
	 * */
	public Employee() {

		employeeId = 0;

		employeeName = null;

		employeeAddress = null;

	}
	
	

	/**
	 * setting employee Identity
	 * @param employee ID
	 * @param employee name
	 * @param employee Address
	 * */
	public Employee(Integer employeeId, String employeeName, String employeeAddress) {

		this.employeeId = employeeId;

		this.employeeName = employeeName;

		this.employeeAddress = employeeAddress;

	}
	
	
	/**
	 * to getting employee Id
	 * @return employeeId
	 * */
	public Integer getEmployeeId(){
		
		return employeeId;
		
	}
	
	
	/**
	 * to getting employee Name
	 * @return employeeName
	 * */
	public String getEmployeeName(){
		
		return employeeName;
		
	}
	
	/**
	 * to getting employee Id
	 * @return employeeId
	 * */
	public String getEmployeeAddress(){
		
		return employeeAddress;
		
	}
	
	
	/**
	 * sorting by comparable by employee name
	 * @param Employee object
	 * */
	@Override
	public int compareTo(Employee e){
		
		return this.getEmployeeName().compareTo(e.getEmployeeName());		// natural Sorting using comparable
		
	}


	/**
	 * sorting by comparator by employee ID
	 * @param Employee obj1, Employee obj2
	 * */
	@Override
	public int compare(Employee arg, Employee arg1) {
		
		return arg.getEmployeeId() - arg1.getEmployeeId();					// customized sorting in ascending order using comparator
	}
	
	
}
