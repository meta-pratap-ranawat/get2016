import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.StringTokenizer;


public class Question {

	String questionNumber,  questionStatement, questionType,options;
	List<String> optionList;
	List<String> ansList;
	Scanner sc;
	
	//static int optionSingleSelect[];
	public Question(){}
	
	/*
	 * this Constructor dividing Question in Particular format 
	 * question number, question statement,question type, and options
	 * */
	public Question(String question){

		StringTokenizer st = new StringTokenizer( question );
		sc = new Scanner(System.in);

		optionList = new ArrayList<String>();

		ansList = new ArrayList<String>();

		questionNumber = st.nextToken(".").trim();

		questionStatement = st.nextToken(",").replaceAll("\\. ", "").trim();

		questionType = st.nextToken(",").trim();

		while(st.hasMoreElements() ){
			options = st.nextToken("/").replaceAll("\\(", "").replaceAll("\\, ", "").replaceAll("\\)", "").trim();
			optionList.add(options);
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

		if(questionType.equals("Single Select")){
			do{
				ans = sc.next();
			}while( isValidAnswer(optionList.size(), ans) == false );

			ansList.add(ans);

		}
		else{
			if( questionType.trim().equalsIgnoreCase("Multiple Select") ){

				for(int i=0;i<optionList.size();i++){
					do{
						ans = sc.next();
					}while( isValidAnswer(optionList.size(), ans) == false );

					if(ans.equals("0")){
						break;
					}
					ansList.add(optionList.get(Integer.parseInt(ans)));

				}

			}
			else{

				while( para.length()<50 ){
					ans = sc.next();

					if(ans.equalsIgnoreCase("exit"))
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

	public String questionType(){

		return questionType;
	}

	public static void main(String args[]){

		Question qs = new Question("Q1. Overall Rating, Single Select, (1/2/3/4/5)");
		System.out.println(" "+qs.questionNumber);
		System.out.println(" "+qs.questionStatement);
		System.out.println(" "+qs.questionType);
		System.out.println(" "+qs.optionList);
	}


}
