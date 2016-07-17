/* BinaryToOctal program is application to convert Binary Number to Octal Number
   it is done into two steps
   1. converting binary number to decimal number
   2. converting decimal number to octal number
*/

 public class BinaryToOctal {
	
    // this function takes input as binary number, convert it into octal number and return octal number
	 int convertBinaryToOctal(int binaryNumber){
			
			String binaryString= Integer.toString(binaryNumber);
			int i=0,decimalNumber=0,digit,octalNumber=0,cnt=0;
			
			// below loop for converting binary to decimal number
			while( i < binaryString.length() ){
				
				decimalNumber += (int)(  Character.getNumericValue( binaryString.charAt( binaryString.length()-i-1 ) ) *Math.pow(2, i++) );
			
			}
			
			
			// below loop for converting decimal to octal number
			do{
				digit = decimalNumber%8;
				decimalNumber/= 8; 
				octalNumber+= digit * (int) Math.pow(10,cnt++);
			}while(decimalNumber > 8);
			
			octalNumber+=   decimalNumber * (int) Math.pow(10,cnt);
			
			return octalNumber;
		}
}

