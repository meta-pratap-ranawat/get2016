/**
 * this Node for Binary tree
 * @author pratap
 * */
public class Node<E> {

	E key;
	Node<E> left, right;

	public Node(){

		key = null;
		left = null;
		right = null;

	}

	public Node(E element){
		key= element;
		left = null;
		right = null;
	}
}