/*
 * this application is Junit for testing SearchAndSort.java
 * 
 * */

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;


public class TestSearchAndSort {

	SearchAndSort sas;
	int[] arr,arr1;
	@Before
	public void setUp() throws Exception {
		sas = new SearchAndSort();
		
		arr= new int[]{1,2,3,4,8,6,7,5,9};
		arr1= new int[]{1,2,3,4,5,6,7,8,9};
	}

	@Test
	public void test() {
		assertEquals(8, sas.linearSearch(arr, 8, 0));
		
		assertEquals(8, sas.binarySearch(arr, 8, 0,arr.length));
		sas.quickSort(arr, 0, arr.length-1);
		
		assertArrayEquals(arr1, arr);
	}

}
