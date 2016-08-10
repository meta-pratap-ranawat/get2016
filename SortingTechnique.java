

public class SortingTechnique {


	private Integer sortingTechnique;

	private UserInputValidation uiv;

	public Sort sortObject;

	
	/**
	 * default constructor
	 * */
	public SortingTechnique(){

		uiv = null;

	}


	/**
	 * parameterized constructor
	 * @param array[]
	 * */
	public SortingTechnique(int[] array){

		uiv =new UserInputValidation();

		System.out.println("Select sorting technique");

		System.out.println("1. Linear Sorting\n 2. Comparation Sort");

		do{
			sortingTechnique = uiv.getInteger();

			if(sortingTechnique == 1){

				if( countDigit( findMax(array) ) > 2 ){
					
					sortObject = new RadixSort();	break;
					
				}else{
					
					sortObject = new CountSort();	break;
					
				}

			}else if(sortingTechnique == 2){

				if( array.length < 10 ){

					sortObject = new BubbleSort();	break;

				}else{

					sortObject = new QuickSort();	break;

				}

			}

			System.out.println("Please Enter Valid Option");

		}while(true);




	}

	
	/**
	 * find max element from array
	 * @param array
	 * @return max maximum element
	 * */
	private	int findMax(int array[]) {

		int max = array[0];

		

		for (int i = 0; i < array.length; i++) {

			if (max < array[i]) {

				max = array[i];

			}
		}

		return max;
	}


	/**
	 * count Number of digit in number
	 * @param number
	 * @return its count of digit of number
	 * */
	private int countDigit(int number) {

		int count = 0;

		while (number > 0) {


			number = number / 10;

			count++;
		}

		return count;

	}

	public static void main(String args[])
	{
		int[] input = { 1, 2, 5, 2, -1,34,234,234,132,3453,11,2,2,2,2};
		
		SortingTechnique sort=new SortingTechnique(input);
		
		int[] output = sort.sortObject.sort(input, 0, input.length-1);
		
		for(int i=0;i<output.length;i++){
			
			System.out.print(" "+ output[i]);
			
		}
		
	}
}
