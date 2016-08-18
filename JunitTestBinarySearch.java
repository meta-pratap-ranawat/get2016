/**
 * this application is to Junit test Binary search
 * @author pratap
 * */
import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class JunitTestBinarySearch {

	Integer array[];
	
	Integer input[], keyToSearch, exceptedOutput, size;		//update Code
	
	UserInputValidation uiv;					//updated Code
	
	BinarySearch<Integer> bs;
	
	@Before
	public void setUp() throws Exception {
		
		uiv = new UserInputValidation();			//updated Code
		
		array = new Integer[]{2,2,8,8,8,8,8,9,9};
		
		bs = new BinarySearch<Integer>(array);
		
		
		
	}

	@Test
	public void test() {
		
		// first 9 is at 7th index
		assertEquals(7,bs.binarySearchIterative(0, array.length, 9));
		
		//first occurrence of 2 in array is at 0th index
		assertEquals(0,bs.binarySearchIterative(0, array.length, 2));
		
		// 10 is not present in array so it will return -1
		assertEquals(-1,bs.binarySearchIterative(0, array.length, 10));
		
		// first occurrence of 8 in array is at 2th index
		assertEquals(2,bs.binarySearchIterative(0, array.length, 8));
		
		array = new Integer[]{2,4,3,5,6,7,2,6,2,9,1};
		
		
		/*
		 * In below case binary search will generate exception that is array is not sorted
		 * */
		assertEquals(7,bs.binarySearchIterative(0, array.length, 2));
		
		
		/** updated Code
		User input (here user will pass test case)
		input array size as well as its element and
		Key element to be search in input array and
		its exceptedOutput location in array
		*/
		
		System.out.println("Enter length of Array");
		
		size = uiv.getInteger();
		
		System.out.println("Enter element of Array)");
		
		input = new Integer[size];
		
		for(int i=0;i<size;i++){
			
			input[i] = uiv.getInteger();
		}
		
		System.out.println("enter element to search its first occurence in array");
		keyToSearch = uiv.getInteger();
		
		System.out.println("enter  keyElement first occurence in array");
		exceptedOutput = uiv.getInteger();
		
		bs = new BinarySearch<Integer>(input);
		assertEquals(exceptedOutput,bs.binarySearchIterative(0, input.length, keyToSearch));
		
		//end of updated Code
	}

}
