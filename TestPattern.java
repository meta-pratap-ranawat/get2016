/*
 * this application is Junit program developed to check Pattern.java
 * */
import static org.junit.Assert.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

public class TestPattern {

	@Test
	public void testPattern() {
		Pattern c = new Pattern();

		String b[] = c.printPyramid(5);

		String a[] = { "    1", "   121", "  12321", " 1234321", "123454321",
				" 1234321", "  12321", "   121", "    1" };
		
		/*
		 *  checking whole pattern by row by row
		 *   */
		for (int i = 0; i < 9; i++) {
			assertEquals(a[i], b[i]);
		}
		
		/*
		 * checking space() function separately
		 * */
		String space[] = { "    ", "   ", "  ", " ", "" };//match spaces
		for (int i = 0; i < 5; i++) {
			String sp = c.space(i, 5);
			assertEquals(space[i], sp);
		}
		/*
		 * checking number() function separately
		 * */
		String number[] = { "1", "121", "12321", "1234321", "123454321" }; //match the number
		for (int i = 0; i < 5; i++) {
			String no = c.number(i);
			assertEquals(number[i], no);
		}

	}

}
