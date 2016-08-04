/**
 * this application is to do counselling process
 * @author pratap
 * */


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
	String seatAllocated[][];
	Scanner sc;
	MyQueue<Student> studentQueue;
	int seat;
	MyQueue<College> collegeQueue;

	
	/*
	 * initial allocation
	 * */
	public Counselling() {

		studentList = new ArrayList<Student>();

		collegeList = new ArrayList<College>();

		college = new College();

		student = new Student();

		studentQueue = new MyQueue<Student>();
		
		

		sc = new Scanner(System.in);

	}


	/*
	 * setting up counselling menu
	 * */
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


	/*
	 * allocation of college to student
	 * */
	public void startCounselling(){

		Collections.sort(studentList);

		Collections.sort(collegeList);

		System.out.println(studentList);
		
		System.out.println(collegeList);
		
		seat = countSeat();

		seatAllocated = new String[countSeat()][2];
		int k=0;
		for(int i=0;i<seat;i++){

			if(collegeList.get(k).getCollegeCapacity() >0){

				seatAllocated[i][0] = studentList.get(i).getStudentName();

				seatAllocated[i][1] = collegeList.get(k).getCollegeName();

				collegeList.get(k).decreaseCapacity();
			}else{

				k++;
				//i--;
				seatAllocated[i][0] = studentList.get(i).getStudentName();

				seatAllocated[i][1] = collegeList.get(k).getCollegeName();

				collegeList.get(k).decreaseCapacity();

			}

		}
	}


	/*
	 * counselling result
	 * */
	public void allocationResult(){


		System.out.println("\t Counselling Result");

		for(int i=0;i<seat;i++){

			System.out.println("\n");

			System.out.println("Student Name : "+seatAllocated[i][0]+ " seat allocated in College : "+seatAllocated[i][1]);

		}
	}

	public int countSeat(){

		int count = 0;

		for(int i=0;i<collegeList.size();i++){

			count+=collegeList.get(i).getCollegeCapacity();

		}

		return count;
	}



	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		Counselling cnl = new Counselling();
		
		cnl.setDetails();
		cnl.startCounselling();
		cnl.allocationResult();

	}

}
