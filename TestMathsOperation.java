/*
 *  this  is Junit application for testing MathsOperation.java
 *  In this we checked for 
 *       1. greatest common divisor gcd()
 *       2. reminder()
 *       3.finding maximum from array maximiumofArray()
 * */
import static org.junit.Assert.*;

import java.util.Scanner;

import org.junit.Before;
import org.junit.Test;


public class TestMathsOperation {
	
	int num1, num2, gcd, arrSize, maxOfArray;
	int[] array;
	MathsOperation mp;
	Scanner sc;

	@Before
	public void setUp() throws Exception {
		mp = new MathsOperation();
		sc = new Scanner(System.in);
		
		num1 = sc.nextInt();
		num2 = sc.nextInt();
		gcd =  sc.nextInt();
		arrSize = sc.nextInt();
		//num1 = 28; num2 = 3;
		
		array = new int[arrSize];
		for(int i=0;i<arrSize;i++){
			array[i] = sc.nextInt();
		}
		maxOfArray = sc.nextInt();
		/*
		 * input test case format will be
		 * 
		 * enter num1 num2
		 * enter gcdOf(num1,num2)
		 * enter arraySize
		 * enter element upto arraySize
		 * enter max element from array
		 * 
		 * example test case
		 * 
		 * 28 3
		 * 1
		 * 5
		 * 1 2 3 4 5
		 * 5
		 * 
		 * */
	}

	@Test
	public void test() {
		assertEquals( gcd, mp.gcd(num1,num2) );
		assertEquals( num1%num2, mp.reminder(num1, num2) );
		assertEquals( maxOfArray, mp.maximumOfArray(array,0,array.length-1) );
	}

}
