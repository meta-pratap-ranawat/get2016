import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

public class JunitTestTreeSort {

	TreeSort<Integer> studentRollNumber;
	
	List<Integer> exceptedOutput;
	
	@Before
	public void setUp() throws Exception {
	}

	@Test
	public void test() {

		/*
		 * test case 1
		 * */
		studentRollNumber = new TreeSort<Integer>(5);

		exceptedOutput = new ArrayList<Integer>();

		studentRollNumber.add(3);
		
		studentRollNumber.add(1);
		
		studentRollNumber.add(2);
		
		studentRollNumber.add(4);
		
		studentRollNumber.add(7);
		
		studentRollNumber.add(6);
		
		studentRollNumber.add(8);
		
		studentRollNumber.add(9);
		
		studentRollNumber.add(12);
		
		studentRollNumber.add(10);
		
		studentRollNumber.treeSort(studentRollNumber.getRoot());
		
		List<Integer> outputList = studentRollNumber.getSortedData();
		
		

		exceptedOutput.add(3);
		
		exceptedOutput.add(5);
		
		exceptedOutput.add(1);
		
		exceptedOutput.add(2);
		
		exceptedOutput.add(4);
		
		exceptedOutput.add(7);
		
		exceptedOutput.add(6);
		
		exceptedOutput.add(8);
		
		exceptedOutput.add(9);
		
		exceptedOutput.add(12);
		
		exceptedOutput.add(10);

		Collections.sort(exceptedOutput);

		assertArrayEquals(exceptedOutput.toArray(), outputList.toArray());
		
		
		
		/*
		 * test case two 
		 * */
		
		studentRollNumber = new TreeSort<Integer>(2);

		exceptedOutput = new ArrayList<Integer>();

		studentRollNumber.add(3);
		
		studentRollNumber.add(1);
		
		studentRollNumber.add(2);						// tried to add same roll number
		
		studentRollNumber.add(1);						// tried to add same roll number
		
		studentRollNumber.add(2);						// tried to add same roll number
		
		studentRollNumber.add(3);						// tried to add same roll number
		
		studentRollNumber.add(2);						// tried to add same roll number
		
		studentRollNumber.add(1);						// tried to add same roll number
		
		studentRollNumber.add(1);						// tried to add same roll number
		
		studentRollNumber.add(1);						// tried to add same roll number
		
		studentRollNumber.treeSort(studentRollNumber.getRoot());
		
		 outputList = studentRollNumber.getSortedData();
		
		

		exceptedOutput.add(3);
						
		exceptedOutput.add(1);
		
		exceptedOutput.add(2);
				
		Collections.sort(exceptedOutput);

		assertArrayEquals(exceptedOutput.toArray(), outputList.toArray());
		
	}

}
