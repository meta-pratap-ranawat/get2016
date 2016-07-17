/*
 * this application is Junit program developed to check Pattern.java
 * */
import static org.junit.Assert.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

public class TestPattern1 {

	@Test
	public void testMessageutil() {
		Patttern1 c = new Patttern1();

		String b[] = c.printPyramid(5);

		String a[] = { "12345", " 1234", "  123", "   12", "    1" };

		/*
		 *  checking whole pattern by row by row
		 *   */
		
		for (int i = 0; i < 5; i++) {
			assertEquals(a[i], b[i]);
		}
		String space[] = { "", " ", "  ", "   ", "    " };
		int p = 5;

		/*
		 * checking space() function separately
		 * */
		
		for (int i = 0; i < 5; i++) {
			String sp = c.space(p--, 6);
			assertEquals(space[i], sp);
		}
		int l = 5;
		String number[] = { "12345", "1234", "123", "12", "1" };
		
		/*
		 * checking number() function separately
		 * */
		
		for (int i = 0; i < 5; i++) {
			String no = c.number(--l);
			assertEquals(number[i], no);
		}

	}

	
}
