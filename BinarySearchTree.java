/**
 * this application is implementation of Binary Search Tree
 * with tree traversal
 * 
 * @author pratap
 * */
public class BinarySearchTree<E extends Comparable<E>> implements Comparable<E> {

	private	Node<E> root;
	private	Node<E> current;
	
	
	/*
	 * creating  tree whose root has null
	 * */
	public BinarySearchTree() {

		root = new Node<E>();

	}

	/*
	 * creating tree with some root value
	 * */
	public BinarySearchTree(E element){

		root = new Node<E>(element);

	}


	/*adding element into tree*/
	public void add(E element){

		Node<E> prev = null;
		
		Node<E> temp = new Node<E>(element);

		if(root == null ){

			root.key = element;

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
	public void inOrder(Node<E> node){

		if(node != null){

			inOrder(node.left);
			System.out.print(" "+node.key);
			inOrder(node.right);
		}

	}


	
	/*
	 * pre order traversal of tree
	 * */
	public void preOrder(Node<E> node){

		if(node != null){

			System.out.print(" "+node.key);
			preOrder(node.left);
			preOrder(node.right);
		}

	}
	
	
	/*
	 * post order traversal of tree
	 * */
	public void postOrder(Node<E> node){

		if(node != null){
			
			postOrder(node.left);
			postOrder(node.right);
			System.out.print(" "+node.key);
		}

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

}
