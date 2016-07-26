/**
 * this  application is to generate Survey Report on data provided by user
 * @author pratap
 *  * */

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;


public class SurveyReport{
	File file;
	FileWriter fw;
	BufferedWriter bw;
	static int optionCount[] = new int[]{0,0,0,0,0};
	
	/*
	 * constructor is used to create output file 
	 * */

	public SurveyReport() throws IOException{

		file = new File("D:/pratapRanawat/eclipse/workspace/OOPs - Assignment 2/src/output.txt");

		// if file doesn't exists, then create it
		if (!file.exists()) {
			file.createNewFile();
		}

		fw = new FileWriter(file.getAbsoluteFile(),true);
		bw = new BufferedWriter(fw);     	

	}
	
	/*
	 * generating report B on Multiple select and text Answer from user
	 * */
	public void generateReportB(Survey sry, int participantNumber) throws IOException{

		String participant = "Participant ";
		participant+= participantNumber;
		boolean flag =false;

		bw.write(participant);										// writing participant name to file

		for(int i= 0;i<sry.answer.size();i++){                   //questionList size()



			String content="";
			/*
			 * writing answer to file
			 * */
			
			for(int j=0;j<sry.answer.get(i).size();j++){


				if( sry.questionList.get(i).questionType.equalsIgnoreCase("Multiple Select") && flag==true ) {
					content += "/ "+sry.answer.get(i).get(j);
				}
				else{
					if( sry.questionList.get(i).questionType.equalsIgnoreCase("Single Select") ){
						int index = Integer.parseInt(sry.answer.get(i).get(j));
						optionCount[index-1]++;

					}
					content += ", "+sry.answer.get(i).get(j).trim();
				}

				if( sry.questionList.get(i).questionType.equalsIgnoreCase("Multiple Select") ){
					flag = true;
				}

			}
			bw.write(content);



		}
		bw.newLine();
		bw.close();
		//}
	}
	
	/*
	 * generating report A for single select Answer 
	 * */
	public static void generateReportA(int numberOfUser){
		System.out.println("Overall Rating, Single Select, (1/2/3/4/5) ");
		for(int i=0;i<5;i++){
			System.out.println((i+1)+". "+ (((double)optionCount[i])/(double)numberOfUser)*100 );
		}
	}



}


