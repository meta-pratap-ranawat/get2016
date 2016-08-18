/**
* this Junit application is to test AddEmployee
*/

import static org.junit.Assert.*;

import java.util.HashSet;

import org.junit.Before;
import org.junit.Test;


public class JunitTestAddEmployee {


	HashSet<AddEmployee> inputEmployeeSet, exceptedOutput;

	@Before
	public void setUp() throws Exception {

		inputEmployeeSet = new HashSet<AddEmployee>();

		inputEmployeeSet.add(new AddEmployee("Pratap","jaipur"));			//updated Code

		inputEmployeeSet.add(new AddEmployee("Vijay","jaipur"));			//updated Code

		inputEmployeeSet.add(new AddEmployee("Rahul","jaipur"));			//updated Code

		inputEmployeeSet.add(new AddEmployee("Ram","Chittorgarh"));			//updated Code

		inputEmployeeSet.add(new AddEmployee("Pratap","Bhilwara"));			// tried to add duplicate data


		exceptedOutput = new HashSet<AddEmployee>();

		exceptedOutput.add(new AddEmployee("Pratap","jaipur"));					//updated Code

		exceptedOutput.add(new AddEmployee("Vijay","jaipur"));					//updated Code

		exceptedOutput.add(new AddEmployee("Rahul","jaipur"));					//updated Code

		exceptedOutput.add(new AddEmployee("Ram","Chittorgarh"));				//updated Code

	}

	@Test
	public void test() {


		assertArrayEquals(exceptedOutput.toArray(), inputEmployeeSet.toArray());				// test case 1



		/*
		 * User Input test case
		 * */
		inputEmployeeSet.clear(); exceptedOutput.clear();

		Integer numberOfEmployee;						//updated Code

		UserInputValidation uiv = new UserInputValidation();			//updated Code

		numberOfEmployee = uiv.getInteger();					//updated Code

		for(int i=0;i<numberOfEmployee;i++){					//updated Code

			System.out.println("enter Name \n enter city");

			inputEmployeeSet.add(new AddEmployee(uiv.getString(),uiv.getString()));

		}		


		exceptedOutput = new HashSet<AddEmployee>();

		System.out.println("enter 1 continously till you want to add employee in exceptedOutput else 0 to exit");		//updated Code

		while(1==uiv.getInteger()){												//updated Code

			System.out.println("enter Name \n enter city");

			exceptedOutput.add(new AddEmployee(uiv.getString(),uiv.getString()));

		}

		assertArrayEquals(exceptedOutput.toArray(), inputEmployeeSet.toArray());		//test case 2


	}

}
