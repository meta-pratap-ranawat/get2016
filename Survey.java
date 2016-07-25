import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;




public class Survey {

	List<Question> questionList;
	Question qs;
	FileReader in = null; Scanner sc;
	
	List< List<String> > answer;

	public Survey(){}

	public Survey(String input)throws IOException{


		try{
			in = new FileReader("D:/pratapRanawat/eclipse/workspace/OOPs - Assignment 2/src/input.txt");

			sc= new Scanner(in);
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
	 * start Survey
	 * 
	 * */
	public void startSurvey(){
		
		// Survey sry;
		
		 
		try{
		//sry = new Survey("pratap");
		
		 answer = new ArrayList< List<String>>();
		 
		for(int i=0; i<questionList.size(); i++){
		//System.out.println(sry.questionList.get(i).questionNumber);
		questionList.get(i).showQuestion();
		answer.add( questionList.get(i).answerToQuestion() );
		
		}
		
		for(int i= 0;i<answer.size();i++){
			for(int j=0;j<answer.get(i).size();j++)
			System.out.println( (i+1)+" "+answer.get(i).get(j) );
		}
		} catch(Exception e){}
		
		
		
	}
	
	/*
	 * update survey report
	 * */
	public SingleSelect updateSurveyReport(SingleSelect ss){
		
		for(int i=0; i<questionList.size(); i++){
			if(questionList.get(i).questionType().equalsIgnoreCase("Single Select") ){
				questionList.get(i);
				if( ss.optionResponse( Integer.parseInt(answer.get(i).get(0)) ) ){}
			}
		}
		return ss;
	}
	
	public static void main(String[] args){
		
	}

}
