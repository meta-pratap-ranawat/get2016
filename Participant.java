/**
 * this is main to run application Survey is controller
 * @author pratap
 * */

import java.util.Scanner;


public class Participant {


	public Participant(){}
	public Participant(Survey sry){

		try{

			sry.startSurvey();
		}catch(Exception e){

			System.out.println("Error in Getting input form user");
		}

	}

	/*
	 *  main function controller of application
	 * */
	public static void main(String[] args){
		Survey sry;
		SurveyReport  sryRep;
		Participant pc;
		Scanner sc = new Scanner(System.in);
		
		System.out.println("Enter number of participant ");
		
		try{
			int numberOfUser = sc.nextInt(),i=0;
		}catch(Exception e){ 
			System.out.println("Error input mismatch ");
			
		}
		try{

			while(i++ < numberOfUser){
				
				sryRep = new SurveyReport();
				sry = new Survey("pratap");
				pc = new Participant(sry);
				sryRep.generateReportB(sry,i);
				
			}
			
			SurveyReport.generateReportA(numberOfUser);
			
		}catch(Exception e){
			System.out.println("Error in I/O from file");
		}

	}
	/*
	
	2			// number of participant		

	1			// answer for Question 1

	1			// answer for multiple choice
	2
	0			// existing from multiple choice

	no issue		// feedback
	exit     		// exist from feedback text

	2				// response from participant 2		

	2	
	0

	system working
	exit

	
	*/
	
}
