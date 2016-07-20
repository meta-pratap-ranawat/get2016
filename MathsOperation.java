/*
 * This application is to do some  mathematical operation
 * 1. greatest common divisor 
 * 2. reminder
 * 3. greatest element from array
 * */
public class MathsOperation {

	/*
	 * gcd(a,b) function is used to calculate 
	 * greatest common divisor using recursion  
	 * */
	public int gcd(int num1, int num2){
		if(num2 == 0){
			return num1;
		}
		else{
			return gcd(num2, num1%num2);
		}
	}
	/*
	 * reminder(a,b) is used to find reminder when a/b i.e. a%b using recursion
	 * it is given in question that a and b will be positive number
	 * */
	public  int reminder(int num1, int num2){
		if( num1 >= num2 ){
			return reminder(num1-num2, num2);
		}
		else{
			return num1;
		}
	}
	
	/*
	 * maximiunOfArray is used find maximum from array using recursion
	 * */
	public  int maximumOfArray(int[] array, int begin, int end){
		
		//(begin>end)?( (array[begin]>array[end])?(return maxOfArray(array,begin,end--)):( return maxOfArray(array,begin++,end) ) ):( return array[begin] );
	
		if( begin<end ){
			if( array[begin]>array[end] ){
				return maximumOfArray(array,begin,end-1);
			}
			else{
				return maximumOfArray(array,begin+1,end);
			}
		}
		else{
			return array[begin];
		}
	}
	/*
	public static void main(String[] args) {
		// TODO Auto-generated meth
		int[] arr;
		int a=28,b=3;
		arr = new int[]{3,4,1,9,5,8};
		System.out.println("gcd "+ gcd(a,b));
		System.out.println("rem "+ reminder(a,b));
		System.out.println("max "+ maximiumOfArray(arr,0,arr.length-1));

	} */

}
