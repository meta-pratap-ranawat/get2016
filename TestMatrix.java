import static org.junit.Assert.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

public class TestMatrix {

	@Test
	public void test() {

		int row = 3;
		int col = 2;
		Matrix m = new Matrix(row, col);
		int mat[] = { 2, 3, 8, 7, 6, 5 };
        int row1=2;
        int col1=3;
        Matrix m1 = new Matrix(row1, col1);
        int mat1[] = { 2, 3, 8, 7, 6, 5 };
		int k = 0;
		//add elements in first matrix
		for (int i = 0; i < row; i++) { 

			for (int j = 0; j < col; j++) {
				Boolean b = m.addElements(i, j, mat[k++]);
				assertTrue(b);
			}
		}
		k=0;
		 //add elements in second matrix
		for (int i = 0; i <row1; i++) { 

			for (int j = 0; j <col1; j++) {
				Boolean b = m1.addElements(i, j, mat1[k++]);
				assertTrue(b);
			}
		}

		int matr[][] = { { 2, 3 }, { 8, 7 }, { 6, 5 } };
        int matr2[][]={{2,3,8},{7,6,5}};
      //transpose of first matrix
		int trans[][] = m.transpose();
		int result[][] = { { 2, 8, 6 }, { 3, 7, 5 } };
		//transpose is assert
		assertArrayEquals(result, trans);
		//display method is assert
		assertArrayEquals(matr, m.display()); 
		 //display method is assert
		assertArrayEquals(matr2, m1.display());
		
		
		 /* 
		  Check if multiplication is possible or not
		  */
		Boolean t=m.Multi_pos( col,row1);
		int exp[][]={{25,24,31},{65,66,99},{47,48,73}};
		int store[][]=m.Multi(matr, matr2);
		assertArrayEquals(exp,store);
	}

}
