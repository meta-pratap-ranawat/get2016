/**
 * this application is designed to implement Comparable Sort on Questions Object.
 * Sorting is done by comparing question Statements of different Question
 * @author pratap
 * */

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;
import java.util.StringTokenizer;

/*
 * implementing comparable 
 * 
 * */
class Questions implements Comparable<Questions> {

	String questionNumber,  questionStatement, questionType,options; 				// Question elements 
	List<String> optionList;														// list for options to Single Question for number of options
	List<String> ansList;															// to record answer of Question
	Scanner sc;


	//public Question(){}

	/*
	 * this Constructor dividing Question in Particular format 
	 * question number, question statement,question type, and options
	 * */
	public Questions(String question){

		StringTokenizer st = new StringTokenizer( question );					// String tokenizer is used to generate token from Question String
		sc = new Scanner(System.in);

		this.optionList = new ArrayList<String>();									// list for options

		this.ansList = new ArrayList<String>();										// list for answer/multiple answer

		this.questionNumber = st.nextToken(".").trim();								// storing Question Number

		this.questionStatement = st.nextToken(",").replaceAll("\\. ", "").trim(); 	// question statement

		this.questionType = st.nextToken(",").trim();								// question type single select/ multiple select/ .....

		while(st.hasMoreElements() ){
			options = st.nextToken("/").replaceAll("\\(", "").replaceAll("\\, ", "").replaceAll("\\)", "").trim();
			optionList.add(options);											// storing options into options list
		}


	}
	/*
	 * this function will display Question with its optionList
	 * */
	public void showQuestion(){
		System.out.print(""+questionNumber+" ->");
		System.out.print(" "+questionStatement);
		System.out.println("   ("+questionType+")");
		for(int i=0;i<optionList.size();i++){
			System.out.println((i+1)+". "+optionList.get(i));
		}
		System.out.println();
	}

	public String getQuestionType(){

		return this.questionType;
	}
	
	public String getQuestionStatement(){
		return this.questionStatement;
	}

	/*
	 *  compareTo with Questions object
	 * */
	@Override
	public int compareTo(Questions question) {
		int a = this.questionStatement.compareTo(question.questionStatement);  // comparing current object with question object
		return a;

	}


}



public class SortQuestion {

										// to store answers to Question

	
	public static void main(String[] input)throws IOException{
		
		List<Questions> questionList;									// to storing Question from file (list) 
		Questions qs;
		FileReader in = null; Scanner sc;

		


		try{
			in = new FileReader("D:/pratapRanawat/eclipse/workspace/OOPs - Assignment 2/src/input.txt");

			sc= new Scanner(in);
			
			questionList = new ArrayList<Questions>(); 

			while(sc.hasNext()){
				qs = new Questions( sc.nextLine() );
				questionList.add( qs );
				//System.out.println(qs.questionNumber);

			}
			sc.close();
			
			Collections.sort(questionList);						// Sorting Question List and Sorting is by compareTo function
			
			for (Questions qu : questionList) {					// displaying sorted questionList
				System.out.println(qu.getQuestionStatement());
			}
			
		}finally {
			if (in != null) {
				in.close();
			}

		}

	}	   // end of constructor

}
