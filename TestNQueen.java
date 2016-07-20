import static org.junit.Assert.*;

import java.util.Arrays;
import java.util.Scanner;

import org.junit.Before;
import org.junit.Test;


public class TestNQueen {

	int board[][],numberOfQueen;
	NQueen queen;Scanner sc;
	
	@Before
	public void setUp() throws Exception {
		
		
		 sc = new Scanner(System.in);
		 sc.delimiter();
		 
		 numberOfQueen = sc.nextInt();
		 board =new int[numberOfQueen][numberOfQueen];
		// Arrays.fill(board, 0);
		 for(int i=0;i<numberOfQueen;i++){
			
			 for(int j=0;j<numberOfQueen;j++){
				 board[i][j] = 0;
			 }
			 
		 }
		 
		 queen = new NQueen(numberOfQueen);
		 
	}

	@Test
	public void testNQueen() {
		if( queen.solveQueen(board, 0) == 1 ){
		 assertEquals(1, queen.solveQueen(board, 0));
		}
		else{
			assertEquals(1, queen.solveQueen(board, 0));
		}
		
		
	}

}
