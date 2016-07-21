/*
 * this is only abstract program for calculator that show how calculator can work
*/

public class Calculator extends Listener{


	Layout l=new Layout();
	l.setGridLayout();
	l.setBoarderLayout();
	Button b=new Button();
	/*
	 * input is enter by user
	 * Until any operator is not come numbers have to append to string then convert that string into integer
	 * */


	b.inputButton(input);
	/* 
	  Accordingly input is number or operator it called inputButton of Numbers or Button
	 */

}
// setting layout for calculator and provides element like display and button 
class Layout{
	private Texted display;
	private Panel keypad;

	void setGridlayout();
	void setBoarderLayout();

	void addButton(Button object);
	void addButton(Number object);
	void addButton(Operator object);
}

abstract class Button{

	abstract inputButton();

}

// assign number to variable
class Numbers extends Button{
	int number;
	void inputButton(String number);
    int getNumber();
}

// Operator class check for valid opeartor and perform action according to operator
class Operator extends Button{
	String operator;
	void  setButton();
	void inputButton(String operator){
		Number nm = new Number();
		Operation opt = new Operation(nm.number, this.operator);
		if(this.operator == "="){
			Display dpy = new Display();
			dpy.updateDisplay(Operations.accumulator);
		}
		
	}
	

}

//how to Operation can be handled 
class Operations{   
	static int accumulator;
	public Operation(){ 
		accumulator =0;
		}
	
	public Operation(int data, String op){
		switch(op){
		case  "+" : accumulator+=data; 
					break;
		case  "-" : accumulator-= data; 
					break;
		
		case  "/" : accumulator/= data; 
					break;
		case  "*" : accumulator*= data; 
					break;	
		case  "%" : accumulator%= data; 
					break;	
					
		}
	}
	public setAccumulator(int data){
		accumulator = data;
	}
	
	public setAccumulator(){
		accumulator = 0;
	}
	public int getAccumulator(){
		return accumulator;
	}

}

// for managing display
class Display{

	void updateDisplay(Opeartion op){
		display.setText(op.getAccumulator());
	}
	void resetDisplay(String operator);



}
