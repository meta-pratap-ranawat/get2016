<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="com.carDekho.Car" %>    
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Insert title here</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
<body>
	<div class="container">
		<h1 class="text-center">Car Details</h1>
		<% 
		Car car = (Car)application.getAttribute("carvo"); 
		%>
		<form action="submitform" method="POST">
			<input type="number" value=<% if(car!=null) {out.println(car.getId());} %> name="id" id="id" hidden/>
			<div class="row">
				<div class="form-group col-xs-12">
				    <label class="col-xs-3 text-right" for="make">Make</label>
				    <div class="col-xs-5">
				        <input type="text" name="make" class="form-control" id="make" value="<% if(car!=null) {out.println(car.getMake());} %>" required>
				    </div>
				</div>
			</div>
			<div class="row">
				<div class="form-group col-xs-12">
				    <label class="col-xs-3 text-right" for="model">Model</label>
				    <div class="col-xs-5">
				        <input type="text" name="model" class="form-control" id="model" value="<% if(car!=null) {out.println(car.getModel());} %>" required>
				    </div>
				</div>
			</div>
			<div class="row">
				<div class="form-group col-xs-12">
				    <label class="col-xs-3 text-right" for="engine">Engine In CC</label>
				    <div class="col-xs-5">
				        <input type="number" name="engine" step=".01" class="form-control" id="engine" value=<% if(car!=null) {out.println(car.getEngineInCC());} %> required>
				    </div>
				</div>
			</div>
			<div class="row">
				<div class="form-group col-xs-12">
				    <label class="col-xs-3 text-right" for="fuel">Fuel Capacity</label>
				    <div class="col-xs-5">
				        <input type="number" name="fuel" step=".01" class="form-control" id="fuel" value=<% if(car!=null) {out.println(car.getFuelCapacity());} %> required>
				    </div>
				</div>
			</div>
			<div class="row">
				<div class="form-group col-xs-12">
				    <label class="col-xs-3 text-right" for="milage">Milage</label>
				    <div class="col-xs-5">
				        <input type="number" name="milage" step=".01" class="form-control" id="milage" value=<% if(car!=null) {out.println(car.getMilage());} %> required>
				    </div>
				</div>
			</div>
			<div class="row">
				<div class="form-group col-xs-12">
				    <label class="col-xs-3 text-right" for="price">Price</label>
				    <div class="col-xs-5">
				        <input type="number" name="price" step=".1" class="form-control" id="price" value=<% if(car!=null) {out.println(car.getPrice());} %> required>
				    </div>
				</div>
			</div>
			<div class="row">
				<div class="form-group col-xs-12">
				    <label class="col-xs-3 text-right" for="tax">Road Tax</label>
				    <div class="col-xs-5">
				        <input type="number" name="tax" step=".1" class="form-control" id="tax" value=<% if(car!=null) {out.println(car.getRoadTax());} %> required>
				    </div>
				</div>
			</div>
			<div class="row">
				<div class="form-group col-xs-12">
				    <label class="col-xs-3 text-right" for="ac">AC</label>
				    <div class="col-xs-5">
				        <select class=form-control id="ac" name="ac" value="<% if(car!=null) {out.println(car.getAc());} %>" required>
				        	<option value="">Select</option>
				        	<option value="Yes">Yes</option>
				        	<option value="No">No</option>
				        </select>
				    </div>
				</div>
			</div>
			<div class="row">
				<div class="form-group col-xs-12">
				    <label class="col-xs-3 text-right" for="steering">PowerSteering</label>
				    <div class="col-xs-5">
				        <select class=form-control id="steering" name="steering" value="<% if(car!=null) {out.println(car.getPowerSteering());} %>" required>
				        	<option value="">Select</option>
				        	<option value="Yes">Yes</option>
				        	<option value="No">No</option>
				        </select>
				    </div>
				</div>
			</div>
			<div class="row">
				<div class="form-group col-xs-12">
				    <label class="col-xs-3 text-right" for="kit">Accessory Kit</label>
				    <div class="col-xs-5">
				        <select class=form-control id="kit" name="kit" value="<% if(car!=null) {out.println(car.getAccessoryKit());} %>" required>
				        	<option value="">Select</option>
				        	<option value="Yes">Yes</option>
				        	<option value="No">No</option>
				        </select>
				    </div>
				</div>
			</div>
			<div class="row">
				<div class="form-group col-xs-12">
				    <div class="col-xs-offset-3 col-xs-5">
				       <input type="submit" value="Submit"/>
				       <input type="reset"/>
				    </div>
				</div>
			</div>
		</form>
		<% if(car!=null) {application.removeAttribute("carvo");} %>
	</div>
</body>
</html>