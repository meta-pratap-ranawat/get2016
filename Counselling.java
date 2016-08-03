import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;


public class Counselling {
	List<Student> studentList;
	List<College> collegeList;
	College college;
	Student student;
		Scanner sc;
		MyQueue<Student> studentQueue;
		//MyQueue<College> collegeQueue;
		
	public Counselling() {
		
		studentList = new ArrayList<Student>();
		
		collegeList = new ArrayList<College>();
		
		college = new College();
		
		student = new Student();
		
		studentQueue = new MyQueue<Student>();
		
		sc = new Scanner(System.in);
		
	}
	
	
	
	public void setDetails(){
		int num;
		
		
		System.out.println("Enter number of participant College in Couselling");
		num = sc.nextInt();
		
		for(int i=0;i<num;i++){
			
			System.out.println("Enter Name of College Rank and Capacity");
			
			college.setDetails(sc.next(), sc.nextInt(), sc.nextInt());
			
			collegeList.add(college);
			
		}
		
		
		
		System.out.println("Enter number of participant Student in Couselling");
		num = sc.nextInt();

		for(int i=0;i<num;i++){
			
			System.out.println("Enter Name of Student and Rank ");
			
			student.setDetails(sc.next(), sc.nextInt());
			
			studentList.add(student);
			
		}
		
	}
	
	
	public void startCounselling(){
		
		Collections.sort(studentList);
		
		Collections.sort(collegeList);
		
		
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
