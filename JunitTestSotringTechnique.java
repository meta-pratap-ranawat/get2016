/**
 * this application is Junit test for Sorting array 
 * @author pratap
 * */

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.Before;
import org.junit.Test;


public class JunitTestSotringTechnique {


	SortingTechnique sort;

	UserInputValidation uiv;

	List<Integer> input;

	List<Integer> exceptedOutput;

	Integer T;

	@Before
	public void setUp() throws Exception {

		sort = null;

		uiv =new UserInputValidation();

		input = new ArrayList<Integer>();

		exceptedOutput = new ArrayList<Integer>();

		System.out.println("Enter number of test case");

		T = uiv.getInteger();
	}

	@Test
	public void test() {


		while(T-->0){

			System.out.println("Enter the size of input array");

			Integer size = uiv.getInteger();

			System.out.println("Enter element of input array");


			for(int i=0;i<size;i++){

				input.add(uiv.getInteger());

			}

			exceptedOutput = input;

			Collections.sort(exceptedOutput);

			assertArrayEquals(exceptedOutput, sort.sortObject.sort( input.toArray(), 0, input.size()-1) );

			exceptedOutput.clear();

			input.clear();

		}

		/*
		 * Input test
		 * 
		 * test case 1
		 * 1						// sorting by linear sort
		 * 10						// sort by Linear sort
		 * 1 2 3 4 5 6 8 -1 -2		// throw exception array has negative element can sort
		 * 
		 * test case 2
		 * 1							//sorting by linear
		 * 10
		 * 1 1 1 1 1 1 1 0 0 0			// sorting is done by count sort
		 * 
		 * test case 3
		 * 2								//sorting by comparation
		 * 15
		 * 1 2 3 4 5 2 4 1 7 8 4 5 3 3 67	// sorting is done by Quick Sort
		 * 
		 * test case 4
		 * 3							// invalid option try valid option
		 * 
		 * */
	}

}
