/**
 * this application is to Junit test Binary search
 * @author pratap
 * */
import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class JunitTestBinarySearch {

	Integer array[];
	BinarySearch<Integer> bs;
	@Before
	public void setUp() throws Exception {
		
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
	}

}
