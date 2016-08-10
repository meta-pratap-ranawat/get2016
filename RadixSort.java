

public class RadixSort implements Sort{

	CountSort count;
	
	public RadixSort(){
		
		count = new CountSort();
	
	}

	public int[] sort(int array[], int start, int end) {
		
		int max = count.findMax(array);
		
		int digit = countDigit(max);
		
		
		
		int div = 1;
		
		while (digit > 0) {

			int countArray[] = new int[10];
			
			int output[] = new int[array.length];
			
			for (int i = 0; i < array.length; i++) {

				countArray[(array[i] / div) % 10] = countArray[(array[i] / div) % 10] + 1;

			}
			
			
			/*
			 * it can found position in array
			 */
			for (int i = 1; i < countArray.length; i++){
				
				countArray[i] += countArray[i - 1];
				}
             
			for (int i = array.length - 1; i >= 0; i--){
				
				output[--countArray[(array[i] / div) % 10]] = array[i];
				}
			
			for (int i = 0; i < array.length; i++) {
				
				array[i] = output[i];

			}
			
			digit = digit - 1;

			div = div * 10;
		}

		return array;

	}

	int countDigit(int number) {
		int count = 0;
		while (number > 0) {

			number = number / 10;
			count++;
		}

		return count;
	}

	
	/*
	
	public static void main(String args[]) {
		
		RadixSort radix = new RadixSort();
		
		int array[] = { 111, 12, 151, 34, 100, 00, 1, 2, 3, 4, 1000};
		
		radix.sort(array,0,array.length-1);
		
		for (int i = 0; i < array.length; i++) {

			System.out.println(" "+array[i]);
		}
	}
	*/

}
