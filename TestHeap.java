
import java.util.Scanner;


public class TestHeap {

	public TestHeap() {
		// TODO Auto-generated constructor stub
	}
	
	public static void main(String[] args){
		
		Scanner sc = new Scanner(System.in);
		 
		int inputSize = sc.nextInt();
		
		Heap hp = new Heap();
		
		Integer[] array  = new Integer[inputSize];
		
		for(int i=0;i<inputSize;i++){
			array[i]=sc.nextInt();
		}
		
		hp = new Heap(array);
		
		hp.buildHeap();
		
		hp.display();
		
		System.out.println("\n");
		
		hp.heapSort();
		
		System.out.println("\n");
		
		hp.display();
		sc.close();
	}

}
