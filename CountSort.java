/**
 * this application is for sorting using CountSort
 * @author pratap
 * */

public class CountSort implements Sort{

	
	/**
	 * sorting function
	 * @param array
	 * @param sorted array
	 * */
	public int[] sort(int array[], int start, int end) {


		int max = findMax(array);

		int output[] = new int[array.length];

		int countArray[] = new int[max + 1];

		for (int i = 0; i < array.length; i++) {

			countArray[array[i]] = countArray[array[i]] + 1;

		}

		for (int i = 1; i < countArray.length; i++){

			countArray[i] += countArray[i - 1];

		}

		for (int i = array.length - 1; i >= 0; i--){

			output[--countArray[array[i]]] = array[i];
		}
		for (int i = 0; i < array.length; i++) {

			array[i] = output[i];

		}

		return array;
	}


	/**
	 * find max element from array
	 * @param array
	 * @return max maximum element
	 * */
	public	int findMax(int array[]) {

		int max = array[0];

		for (int i = 0; i < array.length; i++) {

			if (max < array[i]) {

				max = array[i];

			}
			
			
			if(array[i]<0){
				
				gotException("can not sort by Linear Sort input array has negative value\n");
				return 0;
			}
		}

		return max;
	}

	

	/*
	 * handle exception
	 * */
	public void gotException(String message){

		try{

			throw new MyException(message);

		}catch(MyException e){

			System.out.println(e.getMessage());
			//e.printStackTrace();

		}

	}

	/*
	 * main function
	 * */
	public static void main(String args[]) {

		CountSort count = new CountSort();

		int array[] = { 1, 2, 5, 2, 10, 6,2,2,3,4,5,6,4,3,6,7,2,8,2 };

		count.sort(array,0,array.length-1);


		for (int i = 0; i < array.length; i++) {

			System.out.println(" "+array[i]);
		}

	}

}
