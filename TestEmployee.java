
/**
 * testing sorting methods manually
 * @author pratap
 * */
import java.util.ArrayList;

import java.util.Collections;
import java.util.List;


public class TestEmployee {

	public static void main(String[] args){

		List<Employee> list= new ArrayList<Employee>();


		list.add( new Employee(2,"Pratap","Jaipur"));

		list.add( new Employee(1,"Kirishan","jaipur"));

		list.add( new Employee(6,"Rahul","Bhilwara"));

		list.add( new Employee(3,"Prateek","Ajmer"));

		list.add( new Employee(5,"Nitin","Abu"));

		list.add( new Employee(4,"Rajat","Jodhpur"));

		list.add( new Employee(8,"rAMjI","bAGRU"));

		list.add( new Employee(7,"rOHIT","Triveni"));

		Collections.sort(list);								// sorting by comparable by employee ID

		for(Employee e : list){

			System.out.print(" [ "+e.getEmployeeId()+" "+e.getEmployeeName()+" "+e.getEmployeeAddress()+" ] ");

		}

		System.out.println();
		Collections.sort(list,new Employee());				// sorting by comparator by employee name

		for(Employee e : list){

			System.out.print(" [ "+e.getEmployeeId()+" "+e.getEmployeeName()+" "+e.getEmployeeAddress()+" ] ");

		}


	}

}
