/**
 *  this application to Job availbe for printing to printer
 *  @author pratap
 * */

import static org.junit.Assert.*;

import java.util.Arrays;
import java.util.Scanner;

import org.junit.Before;
import org.junit.Test;


public class JunitTestHeap {

	UserInputValidation uiv;
	
	Heap hp;
	
	Scanner sc;
	
	Integer[] array,array1;
	

	@Before
	public void setUp() throws Exception {

		sc = new Scanner(System.in);

		int inputSize = sc.nextInt();

		uiv = new UserInputValidation();

		array  = new Integer[inputSize];

		for(int i=0;i<inputSize;i++){
			
			array[i]=sc.nextInt();
			
		}

		hp = new Heap(array);

		hp.buildHeap();

		hp.heapSort();
		array1 =array;
		Arrays.sort(array1);
	}

	@Test
	public void test() {

		assertArrayEquals( hp.getArray(), array1 );			// test case one

		
		/*
		 * user test case at run time
		 * */
		int T = uiv.getInteger();
		
		while(T-->0){
			
			int inputSize = uiv.getInteger();

			

			array  = new Integer[inputSize];

			for(int i=0;i<inputSize;i++){
				
				array[i]=uiv.getInteger();
			}

			hp = new Heap(array);

			hp.buildHeap();

			hp.heapSort();
			
			array1 =array;
			
			Arrays.sort(array1);


			assertArrayEquals( hp.getArray(), array1 );			// test case 
		}
	
	}
	
	
	/* Test Case format will be
	 * 
	 * number of test case( T )
	 * next T two line will contains
	 * 
	 * array size( inputSize )
	 * inputSize element in array (array[] 0  to inputSize)
	 * 
	 *  Example test Case
	 *  
	 *  3
	 *  
	 *  6
	 *  1 2 3 4 3 2
	 *  
	 *  8
	 *  1 1 1 1 1 1 1 1
	 *  
	 *  7
	 *  4 4 4 4 4 4 4
	 * */
}
