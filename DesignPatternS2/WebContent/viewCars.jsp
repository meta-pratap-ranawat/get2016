<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql" %>
<%@page import="java.util.ArrayList"%>
<%@page import="com.model.vo.CarVO"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Cars</title>
</head>
<body>
<a href='edit.jsp'> Add Car</a>


	<table>
		<tr>
			<th> Company Name </th>
			<th> Model Number </th>
			<th> engine InCC </th>
			<th> Fuel Capacity</th>
			<th> Price </th>
			<th> Road Tax </th>
			<th> AC </th>
			<th> Power Steering </th>
			<th> Accessory Kit </th>
			<th> Milage </th>
			<th> Milage </th>
		</tr>
		
		 <c:forEach items="${cars}" var="car">
        <tr>
                       
            <td> <c:out value="${car.make}"/> </td>
			<td> <c:out value="${car.model}"/> </td>
			<td> <c:out value="${car.engineInCC}"/> </td>
			<td> <c:out value="${car.fuelCapacity}"/> </td>
			<td> <c:out value="${car.price}"/></td>
			<td> <c:out value="${car.roadTax}"/></td>
			<td> <c:out value="${car.ac}"/></td>
			<td> <c:out value="${car.powerSteering}"/></td>
			<td> <c:out value="${car.accessoryKit}"/></td>
			<td> <c:out value="${car.milage}"/></td>
			<td><a href="ViewcarsController?carId=<c:out value="${car.id}"/>">Edit</a></td>
			<td><a href="DeleteController?carId=<c:out value="${car.id}"/>">Delete</a></td>
			
            
        </tr>
    </c:forEach>
	</table>







</body>
</html>