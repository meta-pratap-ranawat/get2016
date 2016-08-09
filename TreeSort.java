import java.util.ArrayList;
import java.util.List;

/**
 * this application is implementation of Binary Search Tree
 * with tree traversal
 * 
 * @author pratap
 * */
public class TreeSort<E extends Comparable<E>> implements Comparable<E> {

	private	Node<E> root;
	private	Node<E> current;
	
	private List<E> list;
	
	
	/*
	 * creating  tree whose root has null
	 * */
	public TreeSort() {

		root = null;
		list = new ArrayList<E>();

	}

	/*
	 * creating tree with some root value
	 * */
	public TreeSort(E element){

		root = new Node<E>(element);
		list = new ArrayList<E>();

	}


	/*adding element into tree*/
	public void add(E element){

		Node<E> prev = null;
		
		Node<E> temp = new Node<E>(element);

		if(root == null ){

			root = temp;

		}else{

			current = root;

			while(current!=null){								// getting position to add element
				
				prev = current;
				
				if(compareTo(element)> 0 ){
					
					current = current.left;
					
				}else{

					if(compareTo(element)< 0 ){
						
						current = current.right;
					}
					else{
						
						return; 								// can't add duplicate element in Tree 
						
					}

				}

			}

			current = prev;										//parent node for temp
			
			if(compareTo(element)>0){							//adding temp as left  child of current
				
				current.left = temp;
				
			}else{
				
				current.right = temp;							//adding temp as right child of current
				
			}

		}

	}


	/*
	 * in order traversal of tree
	 * */
	public void treeSort(Node<E> node){

		if(node != null){

			treeSort(node.left);
			list.add(node.key);
			treeSort(node.right);
		}

	}
	
	/**
	 * to get sorted list
	 * @return sorted list
	 * */
	public List<E> getSortedData(){
		
		return list;
		
	}

	
		
	/*
	 * to get root of tree
	 * */
	public Node<E> getRoot(){
		
		return root;
	}



	/*
	 * for comparing generic element
	 * */
	@Override
	public int compareTo(E element){
			
		return (current.key).compareTo(element);

	}
	
	
	public static void main(String[] args){
		
		TreeSort<Integer> ts = new TreeSort<Integer>(5);
		
		//ts.add(5);
		ts.add(3);
		ts.add(1);
		ts.add(2);
		ts.add(4);
		ts.add(7);
		ts.add(6);
		ts.add(8);
		ts.add(9);ts.add(12);
		ts.add(10);
		ts.treeSort(ts.getRoot());
		List<Integer> list = ts.getSortedData();
		
		for(int i=0;i<list.size();i++){
			
			System.out.print(" "+list.get(i));
		
		}
	}
}