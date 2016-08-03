
public class TestInfixToPost {
	


	public static void main(String[] args) {

		String exp=null;
		InfixToPost itp = new InfixToPost();
		UserInputValidation uiv = new UserInputValidation();
		
		itp.setExpression("A+B*C-D");
		
		System.out.println("post is "+itp.getPostFixExpression() );
		
		itp.setExpression("a+b+c+d*a");
		
		System.out.println("post is "+itp.getPostFixExpression() );
		
		itp.setExpression("a+b+(c+d)*a");
		
		System.out.println("post is "+itp.getPostFixExpression() );
		
		itp.setExpression("(A+B)*(C-D)");
		
		System.out.println("post is "+itp.getPostFixExpression() );
		
		
		/*getting input from user for test*/
		
		System.out.println("Enter number of expression do you want to convert into postfix " );
		
		Integer T = uiv.getInteger();
		
		while(T-->0){
			
			System.out.println("Enter Expression" );
			
			itp.setExpression(uiv.getString());
			
			System.out.println("PostFix is "+itp.getPostFixExpression() );
				
		}
	}

}
