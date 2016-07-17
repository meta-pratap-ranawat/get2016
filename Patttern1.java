
/*
 *  this application is design pattern like
 *  
 *  12345 
 *   1234
 *    123
 *     12
 *      1
 *      
 *      if an integer value n=5 is passed to pyramid(n) 
 *      then pyramid like above will be return by pyramid()
 * */


public class Patttern1 {

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
			num = num + num1;

		}

		return num;
	}

	/*
	 * this method for constructing pyramid by using above two function space() and number()
	 * */
	
	String[] printPyramid(int n) { 
		String s = "", s1 = "";
		n = n + 1;
		String Pattern[] = new String[n];
		int i = 0;

		int p = n - 1;
		int l = n - 1;
		int k = i;

		for (int j = 0; j < n; j++) { 

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
