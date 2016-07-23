import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;




public class Survey {

	List<Question> questionList;
	FileReader in = null; Scanner sc;

	public Survey(){}

	public Survey(String input) throws IOException{


		try{
			in = new FileReader("D:/pratapRanawat/eclipse/workspace/OOPs - Assignment 2/src/input.txt");

			sc= new Scanner(in);
			questionList = new ArrayList<Question>(); 

			while(sc.hasNext()){
				questionList.add( new Question( sc.nextLine() ) );
				System.out.println(questionList);



			}
			sc.close();

		}finally {
			if (in != null) {
				in.close();
			}

		}

	}				// end of constructor

}
