/*
 *  this program is application for Merging two Sorted Array
 * */
public class MergeSortedArray {

	public  int[] join(int a[], int asize, int b[], int bsize){
		
		int aPointer=0,bPointer=0,cPointer=0;
		int c[] = new int[asize+bsize];
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
