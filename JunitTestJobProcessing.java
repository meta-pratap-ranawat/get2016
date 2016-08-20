/**
 * this Junit application is for JobProcessing and Testing them
 * @author pratap
 * */

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

import org.junit.Before;
import org.junit.Test;


public class JunitTestJobProcessing {

	UserInputValidation uiv;

	Heap hp = new Heap(); 							//created Empty Queue

	Scanner sc;

	Integer[] array,array1;

	List<Job> jobList;

	Job tempJob;


	@Before
	public void setUp() throws Exception {

		sc = new Scanner(System.in);

		System.out.println("Enter number of Request to Process(Job)");

		int inputSize = sc.nextInt();

		uiv = new UserInputValidation();

		jobList = new ArrayList<Job>();

		array  = new Integer[inputSize];

		/**
		 * insertion of Job into Queue
		 * */
		for(int i=0;i<inputSize;i++){

			tempJob = new Job(sc.next());

			jobList.add( tempJob );

			array[i] = tempJob.getPriority();

		}


		/*
		 * setting priority Queue using Heap
		 * */
		hp = new Heap(array);

		hp.buildHeap();

		hp.heapSort();

		Collections.sort(jobList);

		for(int i=0;i<inputSize;i++){

			

			array[i] = jobList.get(i).getPriority();

		}

	}



	@Test
	public void test() {

		assertArrayEquals( hp.getArray(), array );			// test case one


		/*
		 * user test case at run time
		 * */
		int T = uiv.getInteger();

		while(T-->0){
			
			jobList.clear();
			
			int inputSize = uiv.getInteger();



			array  = new Integer[inputSize];

			/**
			 * insertion of Job into Queue
			 * */
			for(int i=0;i<inputSize;i++){

				tempJob = new Job(sc.next());

				jobList.add( tempJob );

				array[i] = tempJob.getPriority();

			}


			/*
			 * setting priority Queue using Heap
			 * */
			hp = new Heap(array);

			hp.buildHeap();

			hp.heapSort();

			Collections.sort(jobList);

			for(int i=0;i<inputSize;i++){

				

				array[i] = jobList.get(i).getPriority();

			}


			assertArrayEquals( hp.getArray(), array );			// test case 

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
	 *  chair
	 *  professor
	 *  chair
	 *  graduate
	 *  professor
	 *  undergraduate
	 *  
	 *  8
	 *  chair
	 *  chair
	 *  chair
	 *  chair
	 *  chair
	 *  chair
	 *  chair
	 *  chair
	 *        
	 *  
	 *  7
	 *  undergraduate
	 *  undergraduate
	 *  undergraduate
	 *  undergraduate
	 *  undergraduate
	 *  undergraduate
	 *  undergraduate
	 * */

}
