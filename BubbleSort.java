
/**
 * this application is for sorting using BubbleSort
 * @author pratap
 * */

public class BubbleSort implements Sort{

	/**
	 * sorting function
	 * @param array
	 * @param sorted array
	 * */
	public int[] sort(int array[], int start, int end) {
		
		int temp = 0;
		
		for (int i = 0; i < array.length; i++) {
			
			for (int j = 0; j < array.length - 1; j++) {
				
				if (array[j] > array[j + 1]) {
					
					temp = array[j];
					
					array[j] = array[j + 1];
					
					array[j + 1] = temp;
					
				}
			}
		}

		return array;

	}

	
	
	
	/*
	 * main function
	 * */
	public static void main(String args[]) {
		
		BubbleSort bubble = new BubbleSort();
		
		int array[] = { 111, 12, 151, 34, 100, 00 };
		
		bubble.sort(array,0,array.length-1);
		

		for (int i = 0; i < array.length; i++) {

			System.out.println(" "+array[i]);
		}
	}

}
