/*
 *  this  is Junit application for testing MathsOperation.java
 *  In this we checked for 
 *       1. greatest common divisor gcd()
 *       2. reminder()
 *       3.finding maximum from array maximiumofArray()
 * */
import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;


public class TestMathsOperation {
	
	int num1,num2;
	int[] array;
	MathsOperation mp;

	@Before
	public void setUp() throws Exception {
		mp = new MathsOperation();
		num1 = 28; num2 = 3;
		array = new int[]{2,4,8,4,0,8,5};
	}

	@Test
	public void test() {
		assertEquals(1, mp.gcd(num1,num2));
		assertEquals(1, mp.reminder(num1, num2));
		assertEquals(8,mp.maximumOfArray(array,0,array.length-1));
	}

}
