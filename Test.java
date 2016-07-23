package demo;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
public class Test {

	

	
	   public static void main(String args[]) throws IOException
	   {
	      FileReader in = null; Scanner sc;
	     

	      try {
	         in = new FileReader("D:/pratapRanawat/eclipse/workspace/OOPs - Assignment 2/src/input.txt");
	        
	         sc= new Scanner(in);
	         List<String> questionList = new ArrayList<String>(); 
	         while(sc.hasNext()){
	        	 questionList.add( sc.nextLine() );
	        	 System.out.println(questionList);



	         }
	         sc.close();
	         
	      }finally {
	         if (in != null) {
	            in.close();
	         }
	        
	      }
	   }
	
}
