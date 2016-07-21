/* 
 * this application is to solve N-Queen problem 
 * if solution exist then return matrix 
 * else  
 *  */
public class NQueen
{
	private int numberOfQueens;
	
	 NQueen(int numberOfQueens){
		this.numberOfQueens = numberOfQueens;
	}

	int isValidPosition(int board[][], int row, int col)
	{
		int i, j;

		/* checking  row Of current cell */
		for (i = 0; i < col; i++)
			if (board[row][i] == 1)
				return 0;

		/* checking upper diagonal  */
		for (i=row, j=col; i>=0 && j>=0; i--, j--)
			if (board[i][j] == 1)
				return 0;

		/* check lower diagonal  */
		for (i=row, j=col; j>=0 && i<numberOfQueens; i++, j--)
			if (board[i][j] == 1)
				return 0;

		return 1;
	}

	/* A recursive function to solve numberOfQueens
	Queen problem */
	
	int solveQueen(int board[][], int col)
	{
		
		if (col >= numberOfQueens)  // all queens are placed
			return 1;

		
		for (int i = 0; i < numberOfQueens; i++)
		{
			
			if (isValidPosition(board, i, col) == 1)
			{
				/* place queen in board[i][col] */
				board[i][col] = 1;

				/* recur to place rest of the queens */
				if (solveQueen(board, col + 1) == 1)
					return 1;

				
				board[i][col] = 0; // BACKTRACK
			}
		}

		
		return 0;
	}

}

