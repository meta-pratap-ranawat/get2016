/**
 * this application is to getting Question Stream from file and giving it to Question class for designing Question
 * @author pratap
 * */

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;




public class Survey {

	List<Question> questionList;									// to storing Question from file (list) 
	Question qs;
	FileReader in = null; Scanner sc;

	List< List<String> > answer;									// to store answers to Question

	public Survey(){}

	/*
	 * getting content from file and converting them into Question List(contains multiple Questions - all from file)
	 * */
	public Survey(String input)throws IOException{


		try{
			in = new FileReader("D:/pratapRanawat/eclipse/workspace/OOPs - Assignment 2/src/input.txt");

			sc= new Scanner(in);
			answer = null;
			questionList = new ArrayList<Question>(); 

			while(sc.hasNext()){
				qs = new Question( sc.nextLine() );
				questionList.add( qs );
				//System.out.println(qs.questionNumber);

			}
			sc.close();
			//throw new IOException();
		}finally {
			if (in != null) {
				in.close();
			}

		}

	}	   // end of constructor




	/*
	 * starting a Survey by Showing Question by showQuestion()
	 *  and getting user reponse by answerToQuestion()
	 * 
	 * */
	public void startSurvey(){

		try{

			answer = new ArrayList< List<String>>();

			for(int i=0; i<questionList.size(); i++){

				questionList.get(i).showQuestion();
				answer.add( questionList.get(i).answerToQuestion() );

			}

		} catch(Exception e){}

	}

}
