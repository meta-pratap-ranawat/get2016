package DS1;

public class TestMyDLinkList {
	
	public static void main(String[] args){
		MyDLinkList<String> mylinklist = new MyDLinkList<String>();
		MyDLinkList<String> mylinklist1 = new MyDLinkList<String>();
		mylinklist.add("Pratap");
		mylinklist.add("Krishan");
		mylinklist.add("Pawan");
		mylinklist.add("Vijay");
		mylinklist1.add("Warroir");
		mylinklist1.add("fight");
		mylinklist1.add("Goal");
		mylinklist1.add("google");
		mylinklist1.add(4, "Coder");
		
		mylinklist.addAll(mylinklist1);
		mylinklist.remove(4);
		///mylinklist.remove("Pratap");
		//mylinklist.reverse();
		mylinklist.sort();
		for(int i=0;i<=mylinklist.size();i++){
			System.out.println(" "+mylinklist.get(i));
		}
		
		System.out.println(" "+mylinklist.indexOf("google"));
	}
}
