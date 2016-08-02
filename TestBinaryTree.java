
/**
 * Testing Binary Search Tree mirror image and traversals
 * @author pratap
 * */
public class TestBinaryTree {

	
	/*
	 * checking tree1 is mirror image of tree2
	 * */
	<E> boolean isMirror(Node<E> root1, Node<E> root2)
	{
	   
	    if (root1 == null && root2 == null)
	        return true;
	 
	   
	    if (root1 !=null && root2!=null && root1.key == root2.key){
	    	
	        return isMirror(root1.left, root2.right) && isMirror(root1.right, root2.left);
	    }
	 
	    return false;
	}
	
	
	
	/*
	 * main body
	 * */
	public static void main(String[] args){
		
		TestBinaryTree tbt = new TestBinaryTree();
		
		UserInputValidation uiv = new UserInputValidation();
		
		BinarySearchTree<Integer> tree = new BinarySearchTree<Integer>(6);
		
		BinarySearchTree<Integer> tree1 = new BinarySearchTree<Integer>(6);
		
		System.out.println("Mirror Test 1 "+ tbt.isMirror(tree.getRoot(), tree1.getRoot()) );
		
		System.out.println("\n ");
		
		
		tree.add(9);
		tree.add(3);
		tree.add(1);
		tree.add(4);
		tree.add(2);
		tree.add(10);
		tree.add(7);
		tree.add(8);
		tree.add(11);
		tree.add(10);
		tree.add(12);
		tree.add(14);
		
		tree.inOrder( tree.getRoot() );									// in order traversal of tree
		System.out.println("\n ");
		
		tree.preOrder( tree.getRoot() );									// pre order traversal of tree
		System.out.println("\n ");
		
		tree.postOrder( tree.getRoot() );									// post order traversal of tree
		System.out.println("\n ");
		
		
		System.out.println("\n Mirror Test 2 "+ tbt.isMirror(tree1.getRoot(), tree.getRoot()) );
		
		
		
		
		/*
		 * User input
		 * */
		tree = new BinarySearchTree<Integer>(10);
		
		tree1 = new BinarySearchTree<Integer>(10);
		
		System.out.println("\n Mirror Test 2 "+ tbt.isMirror(tree1.getRoot(), tree.getRoot()) );			// testing empty tree is mirror or not
		
		
		/*
		 * getting tree One
		 * */
		
		System.out.println("\n Enter size for tree One ");
		
		Integer size1 = uiv.getInteger();
		
		for(int i=0;i<size1;i++){
			
			tree.add(uiv.getInteger());
		}
		
		
		
		/*
		 * getting tree Two
		 * */
		
		System.out.println("\n Enter size for tree Two ");
		
		Integer size2 = uiv.getInteger();
		
		for(int i=0;i<size2;i++){
			
			tree.add(uiv.getInteger());
		}
		
		System.out.println("\n Mirror Test 3 "+ tbt.isMirror(tree1.getRoot(), tree.getRoot()) );			// testing  tree1 and tree2 are mirror or not
		
		
		tree.inOrder( tree.getRoot() );									// in order traversal of tree One
		System.out.println("\n ");
		
		tree.preOrder( tree.getRoot() );									// pre order traversal of tree One
		System.out.println("\n ");
		
		tree.postOrder( tree.getRoot() );									// post order traversal of tree One
		System.out.println("\n ");
		
	}

}
