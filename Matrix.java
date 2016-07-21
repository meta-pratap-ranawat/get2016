import static org.junit.Assert.assertTrue;

import java.util.Scanner;

public class Matrix {

	int row;
	int col;
	int matrix[][];

	Matrix(int row, int col) throws NegativeArraySizeException {
		this.row = row;
		this.col = col;
		if (row < 0 || col < 0) {
			throw new NegativeArraySizeException();
		}
		matrix = new int[this.row][this.col];

	}

	// add elements in 2D matrix
	Boolean addElements(int r, int c, int val) throws ArrayIndexOutOfBoundsException {

		if (r >= row || c >= col) {
			throw new ArrayIndexOutOfBoundsException();
		}
		matrix[r][c] = val;
		return true;
	}

	int[][] transpose()

	{

		int transpose[][] = new int[this.col][this.row];
		for (int i = 0; i < this.col; i++) {
			for (int j = 0; j < this.row; j++) {
				transpose[i][j] = matrix[j][i];
			}

		}
		return transpose;
	}

	/*
	 * Check that multiplication possible or not
	 */
	Boolean isMultiplicationPosible(int first, int second) {
		if (first == second) {
			return true;
		}
		return false;
	}

	/*
	 * Calculate multiplication of two matrix matrix1*matrix2
	 */
	int[][] Multi(int matrix1[][], int matrix2[][]) {
		int sum = 0;

		int row = matrix1.length;
		int row1 = matrix2.length;
		int col2 = matrix2[0].length;
		int col1 = matrix1[0].length;
		int multipiedMatrix[][] = new int[row][col2];
		
		for (int i = 0; i < row; i++) {
			for (int j = 0; j < col2; j++) {
				for (int k = 0; k < col1; k++) {
					sum = sum + matrix1[i][k] * matrix2[k][j];
				}
				multipiedMatrix[i][j] = sum;
				sum = 0;
			}
		}
		return multipiedMatrix;

	}

	int[][] display() { // return 2D matrix
		return matrix;

	}

	public static void main(String[] arr) {

		System.out.print("Enter row for first matrix");
		Scanner sc = new Scanner(System.in);
		int row = sc.nextInt();
		System.out.print("Enter Column for first matrix");
		int col=sc.nextInt();
		System.out.print("Enter row for second matrix");
		
		int row1 = sc.nextInt();
		System.out.print("Enter Column for second matrix");
		int col1 = sc.nextInt();
		try {
			Matrix m = new Matrix(row, col);
			System.out.print("Enter values for first matrix");
			for (int i = 0; i < row; i++) {

				for (int j = 0; j < col; j++) {
					int val=sc.nextInt();
					Boolean b = m.addElements(i, j, val);
					assertTrue(b);
				}
			}
			Matrix matrix1 = new Matrix(row1, col1);
			System.out.print("Enter values for second matrix");
			for (int i = 0; i < row1; i++) {

				for (int j = 0; j < col1; j++) {
					int val=sc.nextInt();
					Boolean b = matrix1.addElements(i, j, val);
					assertTrue(b);
				}
			}

			
	
		} catch (ArrayIndexOutOfBoundsException e) {
			System.out.println("Element is added out of array limit");
		} catch (NegativeArraySizeException e) {
			System.out.print("Negative size of array is not appplicable-");
		}
		sc.close();
	}
}
