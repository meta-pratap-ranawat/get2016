import org.junit.*;
import static org.junit.Assert.*;


public class TestBinaryToOctal {
	
	BinaryToOctal binaryToOctal = new BinaryToOctal();
	
	@Test
	public void testBinaryToOctal(){
		
		assertEquals(65,binaryToOctal.convertBinaryToOctal(110101));
		assertEquals(5,binaryToOctal.convertBinaryToOctal(101));
		assertEquals(10,binaryToOctal.convertBinaryToOctal(1000));
		assertEquals(12,binaryToOctal.convertBinaryToOctal(1010));
		assertEquals(7,binaryToOctal.convertBinaryToOctal(111));
	}
}
