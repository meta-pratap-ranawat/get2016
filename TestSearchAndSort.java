/*
 * this application is Junit for testing SearchAndSort.java
 * 
 * */

import static org.junit.Assert.*;

import java.util.Scanner;

import org.junit.Before;
import org.junit.Test;


public class TestSearchAndSort {

	SearchAndSort sas;
	int[] inputArr,expectedOutputArr;
	
	Scanner sc;
	@Before
	public void setUp() throws Exception {
		sas = new SearchAndSort();
		//arr= new int[]{1,2,3,4,8,6,7,5,9};
	//	arr1= new int[]{1,2,3,4,5,6,7,8,9};
		
		sc = new Scanner(System.in);
		int arrSize = sc.nextInt();
		
		inputArr = new int[arrSize];
		expectedOutputArr = new int[arrSize];
		 
		for(int i=0;i<arrSize;i++){
			inputArr[i] = sc.nextInt();
		}
		
		for(int i=0;i<arrSize;i++){
			expectedOutputArr[i] = sc.nextInt();
		}
	}

	@Test
	public void test() {
		
		//tesing linear search
		assertEquals(8, sas.linearSearch(inputArr, 8, 0)); 
		
		//testing binary search
		assertEquals(8, sas.binarySearch(inputArr, 8, 0,inputArr.length));
		
		// testing QuickSort
		sas.quickSort(inputArr, 0, inputArr.length-1);
		assertArrayEquals(expectedOutputArr, inputArr);
	}

}
