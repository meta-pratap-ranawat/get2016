/**
 * this application is Junit to test MyLinkList addtion of element to list in sorted manner
 * by recursion
 * @author pratap
 * */

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.Before;
import org.junit.Test;


public class JunitTestMyLinkList {

	MyLinkList input;
	List<Integer> exceptedOutput;

	@Before
	public void setUp() throws Exception {

		input = new MyLinkList();							

		input.add(5);										

		input.add(10);

		input.add(15);

		input.add(16);

		input.add(14);

		input.add(9);

		exceptedOutput = new ArrayList<Integer>();

		exceptedOutput.add(10);

		exceptedOutput.add(9);

		exceptedOutput.add(16);

		exceptedOutput.add(14);

		exceptedOutput.add(5);

		exceptedOutput.add(15);

		Collections.sort(exceptedOutput);

	}

	@Test
	public void test() {

		assertArrayEquals(exceptedOutput.toArray(), input.toArray()); 	// test case 1

		
		/*
		 * test case two
		 * */
		input = new MyLinkList();							

		input.add(5);										

		input.add(5);

		input.add(5);

		input.add(5);

		input.add(5);

		input.add(5);

		exceptedOutput = new ArrayList<Integer>();

		exceptedOutput.add(5);

		exceptedOutput.add(5);

		exceptedOutput.add(5);

		exceptedOutput.add(5);

		exceptedOutput.add(5);

		exceptedOutput.add(5);

		Collections.sort(exceptedOutput);

		assertArrayEquals(exceptedOutput.toArray(), input.toArray());		// test case two
		
		

		
		/*
		 * test case three
		 * */
		input = new MyLinkList();							

		input.add(5);										

		input.add(4);

		input.add(3);

		input.add(2);

		input.add(1);

		input.add(-1);

		exceptedOutput = new ArrayList<Integer>();

		exceptedOutput.add(5);

		exceptedOutput.add(4);

		exceptedOutput.add(2);

		exceptedOutput.add(3);

		exceptedOutput.add(1);

		exceptedOutput.add(-1);

		Collections.sort(exceptedOutput);

		assertArrayEquals(exceptedOutput.toArray(), input.toArray());		// test case three
		
		
		/*
		 * test case four
		 * */
		input = new MyLinkList();							

		input.add(-5);										

		input.add(-15);

		input.add(-20);

		input.add(-25);

		input.add(-10);

		input.add(-5);

		exceptedOutput = new ArrayList<Integer>();

		exceptedOutput.add(-5);

		exceptedOutput.add(-5);

		exceptedOutput.add(-10);

		exceptedOutput.add(-15);

		exceptedOutput.add(-20);

		exceptedOutput.add(-25);

		Collections.sort(exceptedOutput);

		assertArrayEquals(exceptedOutput.toArray(), input.toArray());		// test case four
	}

}
