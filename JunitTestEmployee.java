/**
 * this application is Junit test for Employee for Sorting by Comparable(natural Sorting) and Comparator(ascending sorting)
 * @author pratap
 * */

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.Before;
import org.junit.Test;


public class JunitTestEmployee {


	List<Employee> inputList;
	List<Employee> exceptedOutput;

	UserInputValidation uiv;
	@Before
	public void setUp() throws Exception {

		/*
		 * preparing test case for sorting by Id( by comparator )
		 * */
		inputList= new ArrayList<Employee>();

		exceptedOutput= new ArrayList<Employee>();

		uiv = new UserInputValidation();

		inputList.add( new Employee(2,"A","Jaipur"));

		inputList.add( new Employee(1,"B","Jaipur"));

		inputList.add( new Employee(6,"C","Jaipur"));

		inputList.add( new Employee(3,"D","Jaipur"));

		inputList.add( new Employee(5,"E","Jaipur"));

		inputList.add( new Employee(4,"F","Jaipur"));

		inputList.add( new Employee(8,"G","Jaipur"));

		inputList.add( new Employee(7,"H","Jaipur"));

		Collections.sort(inputList,new Employee());	

		exceptedOutput.add( new Employee(1,"B","Jaipur"));

		exceptedOutput.add( new Employee(2,"A","Jaipur"));

		exceptedOutput.add( new Employee(3,"D","Jaipur"));

		exceptedOutput.add( new Employee(4,"F","Jaipur"));

		exceptedOutput.add( new Employee(5,"E","Jaipur"));

		exceptedOutput.add( new Employee(6,"C","Jaipur"));

		exceptedOutput.add( new Employee(7,"H","Jaipur"));

		exceptedOutput.add( new Employee(8,"G","Jaipur"));
	}

	@Test
	public void test() {

		// testing for sorting by comparable (natural sort)

		for(int i=0;i<exceptedOutput.size();i++){

			assertEquals(exceptedOutput.get(i).getEmployeeId(),inputList.get(i).getEmployeeId());			

		}


		exceptedOutput.clear();

		Collections.sort(inputList);	

		exceptedOutput.add( new Employee(2,"A","Jaipur"));

		exceptedOutput.add( new Employee(1,"B","Jaipur"));

		exceptedOutput.add( new Employee(6,"C","Jaipur"));

		exceptedOutput.add( new Employee(3,"D","Jaipur"));

		exceptedOutput.add( new Employee(5,"E","Jaipur"));

		exceptedOutput.add( new Employee(4,"F","Jaipur"));

		exceptedOutput.add( new Employee(8,"G","Jaipur"));

		exceptedOutput.add( new Employee(7,"H","Jaipur"));

		for(int i=0;i<exceptedOutput.size();i++){

			assertEquals(exceptedOutput.get(i).getEmployeeId(),inputList.get(i).getEmployeeId());

		}

		

		/**
		 * User also can pass test case  input & output for ascending order sorting comparator
		 * 
		 * */
		exceptedOutput.clear(); inputList.clear();

		System.out.println("Enter Number of Employee");

		Integer numOfEmp = uiv.getInteger();

		System.out.println("enter employee details \n Id Name Address");

		for(int i=0;i<numOfEmp;i++){

			inputList.add(new Employee(uiv.getInteger(), uiv.getString(), uiv.getString()));

		}

		Collections.sort(inputList,new Employee());	
	
		
		System.out.println("enter employee details by Sorted order for comparator sort(ascensding sorting) \n Id Name Address");

		for(int i=0;i<numOfEmp;i++){

			exceptedOutput.add(new Employee(uiv.getInteger(), uiv.getString(), uiv.getString()));

		}
		
		
		for(int i=0;i<exceptedOutput.size();i++){

			assertEquals(exceptedOutput.get(i).getEmployeeId(),inputList.get(i).getEmployeeId());

		}
		
		
		
		
		/**
		 * User also can pass test case  input & output for natural order sorting comparable by Id
		 * 
		 * */
		exceptedOutput.clear(); inputList.clear();

		System.out.println("Enter Number of Employee");

		 numOfEmp = uiv.getInteger();

		System.out.println("enter employee details \n Id Name Address");

		for(int i=0;i<numOfEmp;i++){

			inputList.add(new Employee(uiv.getInteger(), uiv.getString(), uiv.getString()));

		}

		Collections.sort(inputList);	
	
		
		System.out.println("enter employee details by Sorted order for comparable sort(natural sorting) \n Id Name Address");

		for(int i=0;i<numOfEmp;i++){

			exceptedOutput.add(new Employee(uiv.getInteger(), uiv.getString(), uiv.getString()));

		}
		
		
		for(int i=0;i<exceptedOutput.size();i++){

			assertEquals(exceptedOutput.get(i).getEmployeeId(),inputList.get(i).getEmployeeId());

		}
		
		
	}
	
}
