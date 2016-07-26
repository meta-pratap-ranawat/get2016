/**
 * this application is to get Question from InputStream and filter it
 * also contain functionality to show Question to User and record answer to the Question
 * @author pratap
 * */

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.StringTokenizer;


public class Question {

	String questionNumber,  questionStatement, questionType,options; 				// Question elements 
	List<String> optionList;														// list for options to Single Question for number of options
	List<String> ansList;															// to record answer of Question
	Scanner sc;


	public Question(){}

	/*
	 * this Constructor dividing Question in Particular format 
	 * question number, question statement,question type, and options
	 * */
	public Question(String question){

		StringTokenizer st = new StringTokenizer( question );					// String tokenizer is used to generate token from Question String
		sc = new Scanner(System.in);

		optionList = new ArrayList<String>();									// list for options

		ansList = new ArrayList<String>();										// list for answer/multiple answer

		questionNumber = st.nextToken(".").trim();								// storing Question Number

		questionStatement = st.nextToken(",").replaceAll("\\. ", "").trim(); 	// question statement

		questionType = st.nextToken(",").trim();								// question type single select/ multiple select/ .....

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

	/*
	 *  this function is define for getting answer for question from user(participant)
	 * */
	public List<String> answerToQuestion(){


		String ans=null,para=" ";

		if(questionType.equals("Single Select")){									// checking for Question type if single select then run below code
			do{
				ans = sc.next();													// getting option
			}while( isValidAnswer(optionList.size(), ans) == false );				// checking input option is valid or not

			ansList.add(ans);														// adding answer to answer list

		}
		else{
			if( questionType.trim().equalsIgnoreCase("Multiple Select") ){			// checking for Question type if multiple select then run below code

				for(int i=0;i<optionList.size();i++){								// loop for multiple option to mark
					do{
						ans = sc.next();											// getting input answer
					}while( isValidAnswer(optionList.size(), ans) == false );		//checking for valid option

					if(ans.equals("0")){											// exist case for multiple option if you marked required option then can exist by pressing 0
						break;
					}
					ansList.add(optionList.get(Integer.parseInt(ans)));

				}

			}
			else{                                                               	// getting input for text type question like feedback

				while( para.length()<50 ){
					ans = sc.next();

					if(ans.equalsIgnoreCase("exit"))								// can out from by typing exist
						break;
					para=para.concat(" "+ans);


				}
				ansList.add(para);

			}
		}

		return ansList;
	}

	/*
	 *  this function for confirming that input entered by user is valid for not
	 * */
	boolean isValidAnswer(int optionListSize, String userInput){

		for(int i=0;i<optionListSize;i++){

			if( userInput.trim().equalsIgnoreCase(""+(i+1)) || userInput.trim().equalsIgnoreCase("0") ){
				return true;
			}
		}
		return false;
	}
	/*
	 * returns question type to caller
	 * */
	public String questionType(){

		return questionType;
	}




}
