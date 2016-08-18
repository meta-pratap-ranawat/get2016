import static org.junit.Assert.*;

import java.util.HashSet;

import org.junit.Before;
import org.junit.Test;


public class JunitTestAddEmployee {


	HashSet<AddEmployee> inputEmployeeSet, exceptedOutput;

	@Before
	public void setUp() throws Exception {

		inputEmployeeSet = new HashSet<AddEmployee>();

		inputEmployeeSet.add(new AddEmployee("Pratap","jaipur"));

		inputEmployeeSet.add(new AddEmployee("Vijay","jaipur"));

		inputEmployeeSet.add(new AddEmployee("Rahul","jaipur"));

		inputEmployeeSet.add(new AddEmployee("Ram","Chittorgarh"));			// tried to add duplicate data

		inputEmployeeSet.add(new AddEmployee("Pratap","Bhilwara"));			// tried to add duplicate data


		exceptedOutput = new HashSet<AddEmployee>();

		exceptedOutput.add(new AddEmployee("Pratap","jaipur"));

		exceptedOutput.add(new AddEmployee("Vijay","jaipur"));

		exceptedOutput.add(new AddEmployee("Rahul","jaipur"));

		exceptedOutput.add(new AddEmployee("Ram","Chittorgarh"));

	}

	@Test
	public void test() {


		assertArrayEquals(exceptedOutput.toArray(), inputEmployeeSet.toArray());				// test case 1



		/*
		 * test case
		 * */
		inputEmployeeSet.clear(); exceptedOutput.clear();

		Integer numberOfEmployee;

		UserInputValidation uiv = new UserInputValidation();

		numberOfEmployee = uiv.getInteger();

		for(int i=0;i<numberOfEmployee;i++){

			System.out.println("enter Name \n enter city");

			inputEmployeeSet.add(new AddEmployee(uiv.getString(),uiv.getString()));

		}		


		exceptedOutput = new HashSet<AddEmployee>();

		System.out.println("enter 1 continously till you want to add employee in exceptedOutput else 0 to exit");

		while(1==uiv.getInteger()){

			System.out.println("enter Name \n enter city");

			exceptedOutput.add(new AddEmployee(uiv.getString(),uiv.getString()));

		}

		assertArrayEquals(exceptedOutput.toArray(), inputEmployeeSet.toArray());		//test case 2


	}

}
