import java.util.ArrayList;
import java.util.List;


public class Heap {

	private Integer[] array;
	int size;
	public Heap() {
		//array = new int[10]();
		size =0;
	}


	public Heap(Integer[] array){
		this.array = new Integer[array.length];
		this.array = array;
		this.size = array.length;
	}


	public void buildHeap(){
		//size = array.size();
		for(int i=(size/2);i>=0;i--){
			minHeapify(array,i);
		}
	}

	private void minHeapify(Integer[] array,int i){

		int left = 2*i+1;
		int right = 2*i+2;
		int least;
		if(left<size && array[left]<array[i]){
			least = left;
		}else{
			least = i;
		}

		if(right<size && array[right]<array[least]){
			least = right;
		}

		if(least!=i){
			Integer temp = array[least];
			array[least]=array[i];
			array[i]=temp;
			minHeapify(array,least);
		}

		
	}

	public void heapSort(){



		for(int i=array.length-1;i>=1;i--){
			
			Integer temp = array[0];
			array[0]=array[i];
			array[i]=temp;
			
			size =size-1;
			
			minHeapify(array,0);
			
		}
	}

	public void display(){
		
		for(int i=0;i<array.length;i++){
			System.out.print(" "+array[i]);
		}
	}
	
	
	
	public Integer[] getArray(){
		
		return array;
		
	}
}
