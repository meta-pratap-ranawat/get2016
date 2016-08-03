/**
 * this application is to get expression and do infix of expression
 * @author pratap
 * */


public class InfixToPost {

	private String expressionString;
	private String singleCharOfExpression;
	private MyStack<String> stack;


	/*
	 * default allocation
	 * */
	public InfixToPost() {

		expressionString = null;
		singleCharOfExpression = null;
		stack  = new MyStack<String>();

	}


	/*
	 * getting expression
	 * */
	public void setExpression(String userInput){

		expressionString = userInput;

	}


	/*
	 * gives post fix expression from infix
	 * */
	public String getPostFixExpression(){

		String postFixString="";

		for(int i=0;i<expressionString.length();i++){

			singleCharOfExpression = ""+expressionString.charAt(i);

			if( isOperator(singleCharOfExpression) ){

				if(singleCharOfExpression.equals("(")){

					stack.push(singleCharOfExpression);

				}else{
					if(singleCharOfExpression.equals("+") || singleCharOfExpression.equals("-") ){

						if( !stack.isEmpty() && (stack.peek().equals("*") || stack.peek().equals("/")) ){

							postFixString+=stack.pop();

							while( !stack.isEmpty() && (singleCharOfExpression.equals("+") || singleCharOfExpression.equals("-") )){

								postFixString+=stack.pop();

							}

							stack.push(singleCharOfExpression);

						}else{

							stack.push(singleCharOfExpression);

						}
					}else{

						if(singleCharOfExpression.equals(")")){

							while(!stack.peek().equals("(")){

								postFixString+=stack.pop();

							}
							stack.pop();

						}else{

							stack.push(singleCharOfExpression);

						}
					}
				}

			}else{

				postFixString+= singleCharOfExpression;

			}
		}

		while(!stack.isEmpty()){

			postFixString+= stack.pop();

		}

		return postFixString;
	}


	/*checks for operator*/
	private boolean isOperator(String input){

		if( input.equals("(") || input.equals("+") || input.equals("-") || input.equals("*") || input.equals("/") || input.equals(")") ){

			return true;

		}else{

			return false;

		}
	}




}
