/*
 *  this application is design pattern like
 *      
 *      1
 *     121
 *    12321
 *   1234321
 *  123454321 
 *   1234321
 *    12321
 *     121
 *      1
 *      
 *      if an integer value n=5 is passed to pyramid(n) 
 *      then pyramid like above will be return by pyramid()
 * */

public class Pattern {

	/*
	 * calculating number of space for each line
	 * and storing them in string
	 * */
	String space(int row, int n) { 
		String sp = "";
		int no = n - row - 1;
		for (int i = 0; i < no; i++) {
			sp = sp + " ";
		}

		return sp;
	}
	/*
	 *  calculating numbers for each line,  
	 *  storing them into string and 
	 *  returns a string that contains number string for row
	 * */
	String number(int row) {  
		String num = "";
		String num1 = "";
		int k = 0;
		for (int i = 0; i < row + 1; i++) {

			num1 = Integer.toString(++k);
			num += num1;

		}

		for (int i = 0; i < row; i++) {
			num1 = Integer.toString(--k);
			num += num1;
		}

		return num;
	}
/*
 * this method for constructing pyramid by using above two function space() and number()
 * */
	String[] printPyramid(int n) {   
		String s = "", s1 = "";
		String Pattern[] = new String[n * 2 - 1];
		int i = 0;
		/*
		 * constructing upper pattern of pyramid
		 * */
		for (i = 0; i < n; i++) {   
			s = space(i, n);
			Pattern[i] = s;
			s1 = number(i);
			Pattern[i] = s + s1;
			s = "";
			s1 = "";

		}
		int p = n - 2;
		int l = n - 1;
		int k = i;
/*
 *       constructing lower pattern of pyramid
 * */
		for (int j = 0; j < n - 1; j++) {  

			s = space(p--, n);
			
			Pattern[k] = s;

			s1 = number(--l);

			Pattern[k++] = s + s1;

			s = "";
			s1 = "";
			
		}

		return Pattern;

	}

}
