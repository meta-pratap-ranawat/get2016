<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="com.carDekho.Car" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Insert title here</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
<body>
	<div class="container">
		<table class="table table-bordered">
			<%
			Car car = (Car)application.getAttribute("carDetails");
			%>
			<tr>
				<th>Make</th>
				<td><%= car.getMake() %></td>
			</tr>
			<tr>
				<th>Model</th>
				<td><%= car.getModel() %></td>
			</tr>
			<tr>
				<th>Engine In CC</th>
				<td><%= car.getEngineInCC() %></td>
			</tr>
			<tr>
				<th>Fuel Capacity</th>
				<td><%= car.getFuelCapacity() %></td>
			</tr>
			<tr>
				<th>Milage</th>
				<td><%= car.getMilage() %></td>
			</tr>
			<tr>
				<th>Price</th>
				<td><%= car.getPrice() %></td>
			</tr>
			<tr>
				<th>Road Tax</th>
				<td><%= car.getRoadTax() %></td>
			</tr>
			<tr>
				<th>AC</th>
				<td><%= car.getAc() %></td>
			</tr>
			<tr>
				<th>Power Steering</th>
				<td><%= car.getPowerSteering() %></td>
			</tr>
			<tr>
				<th>Accessory Kit</th>
				<td><%= car.getAccessoryKit() %></td>
			</tr>
			<% application.removeAttribute("carDetails"); %>
		</table>
		<a href="carlist">Back To List</a>
	</div>
</body>
</html>