
public class Participant {

	//String 
	public Participant(){}
	public Participant(Survey sry){

		try{
			//sry = new Survey("pratap");
			sry.startSurvey();
		}catch(Exception e){}

	}
	public static void main(String[] args){
		Survey sry;
		Participant pc;
		try{
			sry = new Survey("pratap");
			pc = new Participant(sry);
		}catch(Exception e){}
		 
	}
}
