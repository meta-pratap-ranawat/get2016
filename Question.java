import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;


public class Question {

	private String questionNumber,  questionStatement, questionType,options;
	 List<String> optionList;
	public Question(){}

	public Question(String question){

		StringTokenizer st = new StringTokenizer( question );
		
		optionList = new ArrayList<String>();

		questionNumber = st.nextToken(".").trim();

		questionStatement = st.nextToken(",").replaceAll("\\. ", "").trim();

		questionType = st.nextToken(",").trim();
		
		while(st.hasMoreElements() ){
			options = st.nextToken("/").replaceAll("\\(", "").replaceAll("\\, ", "").replaceAll("\\)", "").trim();
			optionList.add(options);
		}


	}
	
	public static void main(String args[]){

		Question qs = new Question("Q1. Overall Rating, Single Select, (1/2/3/4/5)");
		System.out.println(" "+qs.questionNumber);
		System.out.println(" "+qs.questionStatement);
		System.out.println(" "+qs.questionType);
		System.out.println(" "+qs.optionList);
	}


}
