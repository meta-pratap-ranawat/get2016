<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.List, java.util.ArrayList, com.carDekho.Vehicle" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Listing of Cars</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>

<body>
	<div class="container">
		<table class="table table-bordered table-striped">
			<tr>
				<th>Model</th>
				<th>Make</th>
				<th>Edit</th>
				<th>View</th>
			</tr>
			<%
			@SuppressWarnings("unchecked")
			List<Vehicle> carList = (ArrayList<Vehicle>)application.getAttribute("listOfCars");
			for(Vehicle vehicle : carList) {
			%>
			<tr>
				<td>
					<%=
					vehicle.getModel()
					%>
				</td>
				<td>
					<%=
					vehicle.getMake()
					%>
				</td>
				<td>
					<a href="carform?id=<%=vehicle.getId()%>">Edit</a>
				</td>
				<td>
					<a href="details?id=<%=vehicle.getId()%>">View</a>
				</td>
			</tr>
			<%
			}
			application.removeAttribute("listOfCars");
			%>
		</table>
	</div>
</body>
</html>