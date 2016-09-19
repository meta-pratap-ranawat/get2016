import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public class FahrenheitToCelsius {

	public FahrenheitToCelsius() {
		// TODO Auto-generated constructor stub
	}
	
	@WebMethod
	public Integer convertFahrenheitToCelsius(Integer tempF){
		
		return (int)((tempF-32)*(5.0/9.0));
	}

}
