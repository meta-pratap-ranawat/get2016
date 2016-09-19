package DefaultNamespace;

import java.rmi.RemoteException;

import javax.xml.rpc.ServiceException;

public class MyClient {

	public static void main(String[] args) throws ServiceException {

		FahrenheitToCelsiusServiceLocator obj = new FahrenheitToCelsiusServiceLocator();
		
		obj.setFahrenheitToCelsiusEndpointAddress("http://localhost:8080/WebServiceSession1/services/FahrenheitToCelsius");
		
		FahrenheitToCelsius ftc = obj.getFahrenheitToCelsius();
		
		try {
			System.out.print("converted value "+ftc.convertFahrenheitToCelsius(123));
		} catch (RemoteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
