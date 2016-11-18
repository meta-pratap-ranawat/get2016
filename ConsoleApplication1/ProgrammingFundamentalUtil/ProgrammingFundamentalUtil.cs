using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProgrammingFundamentalUtil {


    /**
      below class contains assignment solution for Programming Fundamental Session 1
     */
    public class ProgrammingFundamentalUtilOne {

        /**
            to convert binary number to octal number without using direct function
         */
        public int convertBinaryToOctal(int binaryNumber) { 
        
            String binaryString= Convert.ToString(binaryNumber);
			int i=0,decimalNumber=0,digit,octalNumber=0,cnt=0;
			
			// below loop for converting binary to decimal number
			while( i < binaryString.Length ){
				
				decimalNumber += (int)(  int.Parse((""+binaryString[( binaryString.Length-i-1 )])) *Math.Pow(2, i++) );
			
			}
			
			
			// below loop for converting decimal to octal number
			do{
				digit = decimalNumber%8;
				decimalNumber/= 8; 
				octalNumber+= digit * (int) Math.Pow(10,cnt++);
			}while(decimalNumber > 8);
			
			octalNumber+=   decimalNumber * (int) Math.Pow(10,cnt);
			
			return octalNumber;
		}



        /**
         * Remove duplicate element from Array and return back updateedArray
         * 
         */
        public int[] removeDuplicates(int[] duplicateInArray) {
            int end = duplicateInArray.Length;

            for (int i = 0; i < end; i++)
            {
                for (int j = i + 1; j < end; j++)
                {
                    if (duplicateInArray[i] == duplicateInArray[j])
                    {
                        /*if two elements are same at location i and j 
                         * then jth element will be replaced by end element
                         * array size (end) will be decreased by one
                         */
                        duplicateInArray[j] = duplicateInArray[end - 1];
                        end--;
                        j--;
                    }
                }
            }
            //creating new array for copying  elements from duplicateInArray upto end index
            int[] updatedArray = new int[end];
            //copying duplicatedArray to updatedArray for return array
            for (int i = 0; i < end; i++)
            {
                updatedArray[i] = duplicateInArray[i];
            }
            
            return updatedArray;
        }


        /*
         * this function is to find longest increasing sequence in given array
         * and returns that sequence
         *
         */
        int[] longestSequence(int[] input)
        {

            int counter = 1, LengthSeq = 0, beginOfSequence = 0, beginIndexOfLongestSeq = 0;
            for (int i = 1; i < input.Length; i++)
            {
                /*if elements are in increasing order then increasing counter 
                 * else set counter to 1 and reset sequence begin
                 * */
                if (input[i - 1] < input[i])
                {
                    counter++;
                }
                else
                {
                    beginOfSequence = i;
                    counter = 1;
                }
                /*
                 *  updating longestSequence with new one if counter is large enough
                 * */
                if (LengthSeq < counter)
                {
                    beginIndexOfLongestSeq = beginOfSequence;
                    LengthSeq = counter;
                }
            }


            int[] updatedArray = new int[LengthSeq];
            int m = 0;
            /*
             *  copying selected range of input Array to new Array (updatedArray)
             * */
            for (int i = beginIndexOfLongestSeq; i < beginIndexOfLongestSeq + LengthSeq; i++)
            {
                updatedArray[m++] = input[i];
            }

            return updatedArray;
        }


        /*
         *this function for solving FCFS problem
         * 
         */
        int[,] fcfsScheduling(int[] arrivalTime, int[] jobSize) {
		
		    int[,] fcfs = new int[arrivalTime.Length,4];
		
		    // recording into local variable 
		    for (int i = 0; i < arrivalTime.Length; i++) {
			    fcfs[i,0] = arrivalTime[i];

		    }
		
		    for (int i = 0; i < arrivalTime.Length; i++) {
			    fcfs[i,1] = jobSize[i];

		    }
		
		    /*
		     * sorting all parameters of jobs by arrival time
		     * using bubble sort
		     * */
		    int t=0;
		    for (int i = 0; i < arrivalTime.Length ; i++) {
			    for (int j = 0; j < arrivalTime.Length - 1; j++) {

				    if (fcfs[j,0] > fcfs[j+1,0]) {   
					    t = fcfs[j,0];
					    fcfs[j,0] = fcfs[j + 1,0];
					    fcfs[j + 1,0] = t;
					    t = fcfs[j,1];
					    fcfs[j,1] = fcfs[j + 1,1];
					    fcfs[j + 1,1] = t;
					

				    }
			    }

		    }
		
		    int comp=0;
		    for(int i=0;i<arrivalTime.Length;i++)
		    {
			    if(i==0)
			    {
				    fcfs[0,2]=fcfs[0,0];
				    fcfs[0,3]=fcfs[0,0]+fcfs[0,1];
				     comp=fcfs[0,3];
			    }
			
			    else
			    {
				    if(fcfs[i,0]<=comp)             
				    {
					    fcfs[i,2]=comp;          //start time 
					    fcfs[i,3]=comp+fcfs[i,1];  //end time
					    comp=fcfs[i,3];
				    }
				    else                          //arrival time may be less than current cpu cycle so that cpu will be idle for some time
				    {
					    fcfs[i,2]=fcfs[i,0];
					    fcfs[i,3]=fcfs[i,2]+fcfs[i,1];
				    }
				
			    }
			
		    }
		
		
		    int[,] fc=new int [arrivalTime.Length,5];
		    for(int i=0;i<arrivalTime.Length;i++)
		    {
			    fc[i,0]=i+1;                  //no. of job
			    fc[i,1]=fcfs[i,0];            //arrival time of job
			    fc[i,2]=fcfs[i,2]-fcfs[i,0];  //wait time of job
			    fc[i,3]=fcfs[i,2];                //start time 
			    fc[i,4]=fc[i,3]-1+fcfs[i,1];  //execution time of job
		    }
		
		    return fc;
		
	    }

        /*
         *  this program is application for checking that array is sorted in which way
         * */
        public int isSorted(int[] input)
        {
            //checking for descending order
            if (input[0] > input[1])
            {
                for (int i = 2; i < input.Length; i++)
                {
                    if (input[i] > input[i - 1]) return 0; // for unordered array
                }
                return 2;
            }
            else
            {
                //checking for ascending order
                for (int i = 2; i < input.Length; i++)
                {
                    if (input[i] < input[i - 1]) return 0;  // for unordered array
                }
                return 1;

            }

        }

        /*
         *  this program is application for Merging two Sorted Array
         * */
        public  int[] join(int[] a, int asize, int[] b, int bsize){
		
		    int aPointer=0,bPointer=0,cPointer=0;
		    int[] c = new int[asize+bsize];
		    // if element from both arrays are present for comparation
		    while(aPointer<asize && bPointer<bsize){
			    if(a[aPointer]>b[bPointer]){
				    c[cPointer++] = b[bPointer++];
			    }
			    else{
				    c[cPointer++] = a[aPointer++];
			    }
		    }
		    // only first array element left
		    while(aPointer<asize){
			    c[cPointer++] = a[aPointer++];
		    }
		    //only second array element left
		    while(bPointer<bsize){
			    c[cPointer++] = b[bPointer++];
		    }
		
		    return c;
	    }
        
    }


    /**
     below class contains assignment solution for Programming Fundamental Session 2
    */

    public class ProgrammingFundamentalUtilTwo {

            /*
         * calculating number of space for each line
         * and storing them in string
         * */
            String space(int row, int n)
            {
                String sp = "";
                int no = n - row - 1;
                for (int i = 0; i < no; i++)
                {
                    sp = sp + " ";
                }

                return sp;
            }
            /*
             *  calculating numbers for each line,  
             *  storing them into string and 
             *  returns a string that contains number string for row
             * */
            String number(int row)
            {
                String num = "";
                String num1 = "";
                int k = 0;
                for (int i = 0; i < row + 1; i++)
                {

                    num1 = ""+(++k);
                    num += num1;

                }

                for (int i = 0; i < row; i++)
                {
                    num1 = ""+(--k);
                    num += num1;
                }

                return num;
            }




            /*
             * this method for constructing pyramid by using above two function space() and number()
             * */
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

            String[] printPyramidOne(int n) {   
		    String s = "", s1 = "";
		    String[] Pattern = new String[n * 2 - 1];
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


            /*
             * this method for constructing pyramid by using above two function space() and number()
             * */

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


                String[] printPyramidTwo(int n) { 
		    String s = "", s1 = "";
		    n = n + 1;
		    String[] Pattern = new String[n];
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

}
