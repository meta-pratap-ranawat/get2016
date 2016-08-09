import static org.junit.Assert.*;

import java.util.HashSet;

import org.junit.Before;
import org.junit.Test;


public class JunitTestAddEmployee {

	
	HashSet<AddEmployee> inputEmployeeSet, exceptedOutput;

	@Before
	public void setUp() throws Exception {

		inputEmployeeSet = new HashSet<AddEmployee>();

		inputEmployeeSet.add(new AddEmployee(1,"Pratap","jaipur"));

		inputEmployeeSet.add(new AddEmployee(2,"Vijay","jaipur"));

		inputEmployeeSet.add(new AddEmployee(3,"Rahul","jaipur"));

		inputEmployeeSet.add(new AddEmployee(1,"Ram","Chittorgarh"));			// tried to add duplicate data

		inputEmployeeSet.add(new AddEmployee(2,"Pratap","Bhilwara"));			// tried to add duplicate data
		

		exceptedOutput = new HashSet<AddEmployee>();

		exceptedOutput.add(new AddEmployee(1,"Pratap","jaipur"));

		exceptedOutput.add(new AddEmployee(2,"Vijay","jaipur"));

		exceptedOutput.add(new AddEmployee(3,"Rahul","jaipur"));

	}

	@Test
	public void test() {
		
		
			assertArrayEquals(exceptedOutput.toArray(), inputEmployeeSet.toArray());				// test case 1
			
			
			
			/*
			 * test case
			 * */
			inputEmployeeSet.clear(); exceptedOutput.clear();
			
			inputEmployeeSet.add(new AddEmployee(1,"Pratap","jaipur"));

			inputEmployeeSet.add(new AddEmployee(1,"Vijay","jaipur"));

			inputEmployeeSet.add(new AddEmployee(1,"Rahul","jaipur"));

			inputEmployeeSet.add(new AddEmployee(1,"Ram","Chittorgarh"));			// tried to add duplicate data

			inputEmployeeSet.add(new AddEmployee(1,"Pratap","Bhilwara"));			// tried to add duplicate data
			

			exceptedOutput = new HashSet<AddEmployee>();

			exceptedOutput.add(new AddEmployee(1,"Pratap","jaipur"));
			
			assertArrayEquals(exceptedOutput.toArray(), inputEmployeeSet.toArray());		//test case 2

			
	}

}
