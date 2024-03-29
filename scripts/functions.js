/**
 * @author Maarten Kuiper
 */
var loginValue;
var managed;

function getXmlHttpRequestObject() {
	if(window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else {
		if(window.ActiveXObject) {
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
}

function attachHandlers() {
	$("#homeBtn").click(function() {
		window.history.pushState('home', null, 'home');
		goToHomePage();
	});
	$("#loginBtn").click(function() {
		$('.login-form').slideToggle('slow');
	});
	$("#carSelectBtn").click(function() {
		window.history.pushState('search', null, 'search');
		goToCarSearch();
	});
	$("#allCarsBtn").click(function() {
		window.history.pushState('allCars', null, 'allcars');
		goToAllCars();
	})
	$("#controlPanelBtn").click(function() {
		goToControlPanel();
	})
	$("#reservationsBtn").click(function() {
		window.history.pushState('reservations', null, 'allReservations');
		goToReservations();
	})
	$("#manageCarsBtn").click(function() {
		window.history.pushState('manageCars', null, 'manageCars');
		goToManageCars();
	})
	$("#newCarBtn").click(function() {
		window.history.pushState('newCar', null, 'newCar');
		goToNewCar();
	})
	window.addEventListener("popstate", function(e) {
		if(history.state == "allCars")
			history.back(goToAllCars());
		if(history.state == "Search")
			history.back(goToCarSearch());
		if(history.state == "reservations")
			history.back(goToReservations());
		if(history.state == "home")
			history.back(goToHomePage());
		if(history.state == "manageCars")
			history.back(goToManageCars())
		if(history.state == "newCar")
			goToNewCar();
	})
	loginValue = document.getElementById("loginValue").value;
}

function closeAllDivs() {
	$('.carSelector').hide();
	$('.allCars').hide();
	$('.carViewer').hide();
	$('.homeText').hide();
	$('.reservations').hide();
	$('.newCar').hide();
}

function goToHomePage() {
	closeAllDivs();
	$('.homeText').show();
}

function goToCarSearch() {
	closeAllDivs();
	$('.carSelector').show();
	$('#modelSelector').remove();
	getBrandsRequest();
}

function goToAllCars() {
	closeAllDivs();
	$('.allCars').show();
	getAllCarsRequest('getAllCars');
}

function goToControlPanel() {
	closeAllDivs();
	$('#controlPanel').slideToggle('fast');
}

function goToReservations() {
	closeAllDivs();
	$('.reservations').show();
	getAllReservationsRequest();
}

function goToManageCars() {
	closeAllDivs();
	$('.manageCars').show();
	getAllCarsRequest('manageCars');
	$('.allCars').show();
}

function goToNewCar() {
	closeAllDivs();
	$('.newCar').show();
	$('#newCarSubmit').click(function() {
		validateNewCar($('#newBrand').val(), $('#newModel').val(), $('#newFuel').val(), $('#newCapacity').val(), $('#newPower').val(), $('#newYear').val(), $('#newColor').val(), $('#newPrice').val());
	})
}

function getBrandsRequest() {
	getBrands = getXmlHttpRequestObject();
	if(getBrands.readyState == 4 || getBrands.readyState == 0) {
		var params = "method=getBrands";
		getBrands.open("GET", 'backend/getCars.php?' + params, true);
		getBrands.onreadystatechange = getBrandsResponse
		getBrands.send(null);
	}
}

function getBrandsResponse() {
	if(getBrands.readyState == 4) {
		var responseArray = eval("(" + getBrands.responseText + ")");
		generateSelectBox(responseArray, "brand");
	}
}

function getModelsRequest(brand) {
	getModels = getXmlHttpRequestObject();
	if(getModels.readyState == 4 || getModels.readyState == 0) {
		var params = "method=getModels&brand=" + brand;
		getModels.open("GET", 'backend/getCars.php?' + params, true);
		getModels.onreadystatechange = getModelsResponse
		getModels.send(null);
	}
}

function getModelsResponse() {
	if(getModels.readyState == 4) {
		var responseArray = eval("(" + getModels.responseText + ")");
		generateSelectBox(responseArray, "models");
	}
}

function getAllCarsRequest(method) {
	getCars = getXmlHttpRequestObject();
	if(getCars.readyState == 4 || getCars.readyState == 0) {
		var params = "method=" + method;
		getCars.open("GET", 'backend/getCars.php?' + params, true);
		getCars.onreadystatechange = function() {
			getAllCarsResponse(method);
		}
		getCars.send(null);
	}
}

function getAllCarsResponse(method) {
	if(getCars.readyState == 4) {
		var responseArray = eval("(" + getCars.responseText + ")");
		generateCarList(responseArray, method);
	}
}

function getCarRequest(carId, method) {
	getCar = getXmlHttpRequestObject();
	if(getCar.readyState == 4 || getCar.readyState == 0) {
		var params = "method=getCar&carId=" + carId;
		getCar.open("GET", 'backend/getCars.php?' + params, true);
		getCar.onreadystatechange = function() {
			getCarResponse(method);
		}
		getCar.send(null);
	}
}

function getCarResponse(method) {
	if(getCar.readyState == 4) {
		var responseArray = eval("(" + getCar.responseText + ")");
		generateCarView(responseArray, method);
	}
}

function getAllReservationsRequest() {
	getAllReservations = getXmlHttpRequestObject();
	if(getAllReservations.readyState == 4 || getAllReservations.readyState == 0) {
		var params = "method=getAllReservations";
		getAllReservations.open("GET", 'backend/getReservations.php?' + params, true);
		getAllReservations.onreadystatechange = getAllReservationsResponse
		getAllReservations.send(null);
	}
}

function getAllReservationsResponse() {
	if(getAllReservations.readyState == 4) {
		var responseArray = eval("(" + getAllReservations.responseText + ")");
		generateAllReservationsTable(responseArray);
	}
}

function getCarReservationsRequest(carId) {
	getCarReservations = getXmlHttpRequestObject();
	if(getCarReservations.readyState == 4 || getCarReservations.readyState == 0) {
		var params = "method=getCarReservations&carId=" + carId;
		getCarReservations.open("GET", 'backend/getReservations.php?' + params, true);
		getCarReservations.onreadystatechange = getCarReservationsResponse
		getCarReservations.send(null);
	}
}

function getCarReservationsResponse() {
	if(getCarReservations.readyState == 4) {
		var responseArray = eval("(" + getCarReservations.responseText + ")");
		generateCarReservationsTable(responseArray);
	}
}

function getCarSearchRequest(brand, model) {
	if(brand != "-") {
		getCarSearch = getXmlHttpRequestObject();
		if(getCarSearch.readyState == 4 || getCarSearch.readyState == 0) {
			var params = "method=carSearch&brand=" + brand;
			if(model != "-")
				params += "&model=" + model;
			getCarSearch.open("GET", 'backend/getCars.php?' + params, true);
			getCarSearch.onreadystatechange = getCarSearchResponse
			getCarSearch.send(null);
		}
	}
}

function getCarSearchResponse() {
	if(getCarSearch.readyState == 4) {
		var responseArray = eval("(" + getCarSearch.responseText + ")");
		generateCarList(responseArray, "getAllCars");
	}
}

function postCarReservationReq(price, name, telephone, carId) {
	postCarReservation = getXmlHttpRequestObject();
	if(postCarReservation.readyState == 4 || postCarReservation.readyState == 0) {
		var params = "method=postReservation&price=" + price + "&name=" + name + "&telephone=" + telephone + "&carId=" + carId;
		postCarReservation.open("POST", 'backend/postReservation.php?', true);
		postCarReservation.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		postCarReservation.onreadystatechange = postCarReservationResponse
		postCarReservation.send(params);
	}
}

function postCarReservationResponse() {
	if(postCarReservation.readyState == 4) {
		$reserveForm = $('#reserveCarFieldSet');
		$reserveForm.empty();
		$reserveForm.append($('<p>Uw reservering is geplaatst</p>'));
	}
}

function postCarReservationDeleteReq(reservationId) {
	postCarReservationDelete = getXmlHttpRequestObject();
	if(postCarReservationDelete.readyState == 4 || postCarReservationDelete.readyState == 0) {
		var params = "method=postCarReservationDelete&reservationId=" + reservationId;
		postCarReservationDelete.open("POST", 'backend/postReservation.php?', true);
		postCarReservationDelete.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		postCarReservationDelete.onreadystatechange = function() {
			postCarReservationDeleteResponse(reservationId);
		}
		postCarReservationDelete.send(params);
	}
}

function postCarReservationDeleteResponse(reservationId) {
	if(postCarReservationDelete.readyState == 4) {
		$row = $('#reservationId' + reservationId).parent();
		$row.remove();
	}
}

function postNewCarRequest(brand, model, fuel, capacity, power, year, color, price) {
	postNewCar = getXmlHttpRequestObject();
	if(postNewCar.readyState == 4 || postNewCar.readyState == 0) {
		var params = "method=newCar&brand=" + brand + "&model=" + model + "&fuel=" + fuel + "&capacity=" + capacity + "&power=" + power + "&year=" + year + "&color=" + color + "&price=" + price + "";
		postNewCar.open("POST", 'backend/postCar.php?', true);
		postNewCar.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		postNewCar.onreadystatechange = postNewCarResponse
		postNewCar.send(params);
	}
}

function postNewCarResponse() {
	if(postNewCar.readyState == 4) {
		$newCar = $('.newCar');
		$newCar.empty();
		$newCar.append($('<p>De auto is geplaatst</p>'));
	}
}

function postCarDeleteRequest(carId) {
	postCarDelete = getXmlHttpRequestObject();
	if(postCarDelete.readyState == 4 || postCarDelete.readyState == 0) {
		var params = "method=carDelete&carId=" + carId;
		postCarDelete.open("POST", 'backend/postCar.php?', true);
		postCarDelete.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		postCarDelete.onreadystatechange = function() {
			postCarDeleteResponse(carId);
		}
		postCarDelete.send(params);
	}
}

function postCarDeleteResponse(carId) {
	if(postCarDelete.readyState == 4) {
		$('#carId' + carId).remove();
	}
}

function postCarSoldRequest(carId) {
	postCarSold = getXmlHttpRequestObject();
	if(postCarSold.readyState == 4 || postCarSold.readyState == 0) {
		var params = "method=carSold&carId=" + carId;
		postCarSold.open("POST", 'backend/postCar.php?', true);
		postCarSold.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		postCarSold.onreadystatechange = function() {
			postCarSoldResponse(carId);
		}
		postCarSold.send(params);
	}
}

function postCarSoldResponse(carId) {
	if(postCarSold.readyState == 4) {
		$('#status' + carId).text("verkocht");
	}
}

function validateReservation(price, name, telephone, carId) {
	if(price == "" || price == null) {
		alert("Geen prijs ingevuld!");
	} else if(name == "" || name == null) {
		alert("Geen naam ingevuld!");
	} else if(telephone == "" || telephone == null) {
		alert("Geen telefoonnummer ingevuld!");
	} else {
		postCarReservationReq(price, name, telephone, carId);
	}
}

function validateNewCar(brand, model, fuel, capacity, power, year, color, price) {
	if(brand == "" || brand == null) {
		alert("Geen merk ingevuld!");
	} else if(model == "" || model == null) {
		alert("Geen model ingevuld!");
	} else if(fuel == "" || fuel == null) {
		alert("Geen brandstof ingevuld!");
	} else if(capacity == "" || capacity == null) {
		alert("Geen motorinhoud ingevuld!");
	} else if(power == "" || power == null) {
		alert("Geen vermogen ingevuld!");
	} else if(year == "" || year == null) {
		alert("Geen bouwjaar ingevuld!");
	} else if(color == "" || color == null) {
		alert("Geen kleur ingevuld!");
	} else if(price == "" || price == null) {
		alert("Geen prijs ingevuld!");
	} else {
		postNewCarRequest(brand, model, fuel, capacity, power, year, color, price);
	}
}

function generateCarReservationForm() {
	$reserveCarFieldset = $('<fieldset id="reserveCarFieldSet"><legend>Auto reserveren</legend>');
	$carViewer.append($reserveCarFieldset);
	$form = $reserveCarFieldset.append('<form id="reserveCar" onsubmit="validateReservation(this)">')
	$priceInput = $form.append('Prijs: <input id="priceInput" type="number" placeholder="€"><br />');
	$nameInput = $form.append('Naam: <input id="nameInput" type="text" placeholder="Naam"><br />');
	$telephoneInput = $form.append('Telefoonnummer:<input id="telephoneInput" type="tel" placeholder="1234-123456">');
	$submitBtn = $('<input type="submit" name="submit" value="Plaats Reservering">');
	$form.append($submitBtn);
	$submitBtn.click(function() {
		var carId = $('#carIdView').val();
		carId.slice(5);
		validateReservation($('#priceInput').val(), $('#nameInput').val(), $('#telephoneInput').val(), carId);
	})
}

function generateSelectBox(inputData, type) {
	if(type == "brand") {
		$(".carSelector").empty();
		var brandList = $('<select id="brandSelector"></select>');
		brandList.appendTo($('.carSelector'));
		brandList.append('<option value="-">Selecteer Merk</option>');
		var submit = $('<br /><input id="searchSubmit" type="submit" value="Zoeken"/>').appendTo($('.carSelector'));
		for(i in inputData) {
			brandList.append('<option value="' + inputData[i]["Merk"] + '">' + inputData[i]["Merk"] + '</option>');
		}
		$("#brandSelector").change(function() {
			getModelsRequest($("#brandSelector").val());
		});
		$("#searchSubmit").click(function() {
			getCarSearchRequest($('#brandSelector').val(), $('#modelSelector').val());
		});
	}
	if(type == "models") {
		$("#modelSelector").remove();
		var modelList = $('<select id="modelSelector"></select>');
		modelList.insertBefore($('#searchSubmit'));
		modelList.append('<option value="-">Selecteer Model</option>');
		for(i in inputData) {
			modelList.append('<option value="' + inputData[i]["Type"] + '">' + inputData[i]["Type"] + '</option>');
		}
	}
}

function generateCarList(inputData, method) {
	$('#carList').find("tr:gt(0)").remove();
	$('.allCars').show();
	if(method == "manageCars")
		if(managed != 1) {
			$('#carListHeaders').append($('<th id="statusTh">status</th>'));
			$('#carListHeaders').append($('<th id="idTh">Auto Id</th>'));
			managed = 1;
		}
	for(i in inputData) {
		if(method == "getAllCars") {
			if(managed == 1) {
				$('#statusTh').remove();
				$('#idTh').remove();
				managed = 0;
			}
		}
		$tr = $("<tr id='carId" + inputData[i]["id"] + "'></tr>").appendTo($('#carList'));
		$tdMerk = $("<td></td>").appendTo($tr);
		$tdType = $("<td></td>").appendTo($tr);
		$tdBouwjaar = $("<td></td>").appendTo($tr);
		$tdMerk.append(inputData[i]["merk"]);
		$tdType.append(inputData[i]["type"]);
		$tdBouwjaar.append(inputData[i]["bouwjaar"]);
		if(method == "getAllCars") {
			$tr.click(function() {
				getCarRequest(this.id.slice(5), "customer");
			})
		} else if(method == "manageCars") {
			$tdStatus = $("<td id=status" + inputData[i]["id"] + "></td>").appendTo($tr);
			$tdStatus.append(inputData[i]["status"]);
			$tdId = $("<td></td>").appendTo($tr);
			$tdId.append(inputData[i]["id"]);
			$tdDeleteBtn = $("<td id=carId" + inputData[i]["id"] + "><img src='images/delete.gif' alt='delete'></td>").appendTo($tr);
			$tdSoldBtn = $("<td id=carId" + inputData[i]["id"] + "><img src='images/sold.png' alt='sold'></td>").appendTo($tr);
			$tdDeleteBtn.click(function() {
				postCarDeleteRequest(this.id.slice(5));
			})
			$tdSoldBtn.click(function() {
				postCarSoldRequest(this.id.slice(5));
			})
		}
	}
}

function generateCarView(inputData, method) {
	$carViewer = $('.carViewer');
	$carViewer.find("tr:gt(0)").remove();
	emptyCarView();
	$carViewer.show();
	for(i in inputData) {
		$carDetails = $("<div id='carDetails'>");
		$carIdField = $('<input type="hidden" id="carIdView" value="' + inputData[i]["id"] + '">');
		$carDetails.append($carIdField);
		$carDetails.append("Merk: " + inputData[i]["merk"] + "<br />Type: " + inputData[i]["type"] + "<br />");
		$carDetails.append("Brandstofsoort: " + inputData[i]["brandstof"] + "<br />");
		$carDetails.append("Motorinhoud: " + inputData[i]["motorinhoud"] + "CC<br />");
		$carDetails.append("Vermogen: " + inputData[i]["vermogen"] + "PK <br />");
		$carDetails.append("Bouwjaar: " + inputData[i]["bouwjaar"] + "<br />Kleur: " + inputData[i]["kleur"] + "<br />");
		$carDetails.append("Vraagprijs: €" + inputData[i]["vraagprijs"])
		if(method != "controlPanel") {
			$carImg = $("<img id='carImg' src='images/autos/auto" + inputData[i]["id"] + ".jpg' alt='carImg'/>");
			$carImg.insertBefore($('#carReservations'));
		}
		if(loginValue == "1") {
			getCarReservationsRequest(inputData[i]["id"]);
			$carDetails.insertBefore($('#carReservations'))
		} else {
			$carViewer.append($carDetails);
			$carViewer.append($carImg);
			generateCarReservationForm();

		}
	}
}

function emptyCarView() {
	$('#carDetails').remove();
	$('#carImg').remove();
	$('#reserveCarFieldSet').remove();
}

function generateCarReservationsTable(inputData) {
	$carReservationsTable = $('#carReservationsTable');
	if(inputData.length == 0) {
		$tr = $("<tr></tr>").appendTo($carReservationsTable);
		$tdPrijs = $('<td colspan="3">Geen Reserveringen</td>').appendTo($tr);
	} else {
		for(i in inputData) {
			$tr = $("<tr></tr>").appendTo($carReservationsTable);
			$tdPrijs = $("<td></td>").appendTo($tr);
			$tdNaam = $("<td></td>").appendTo($tr);
			$tdTelefoonnummer = $("<td></td>").appendTo($tr);
			$tdDatum = $("<td></td>").appendTo($tr);
			$tdPrijs.append(inputData[i]["price"]);
			$tdNaam.append(inputData[i]["name"]);
			$tdTelefoonnummer.append(inputData[i]["telephone"]);
			$tdDatum.append(inputData[i]["time"]);
		}
	}
}

function generateAllReservationsTable(inputData) {
	$('#reservationsTable').find("tr:gt(0)").remove();
	for(i in inputData) {
		$tr = $("<tr></tr>").appendTo($('#reservationsTable'));
		$tdAutoId = $("<td></td>").appendTo($tr);
		$tdPrijs = $("<td></td>").appendTo($tr);
		$tdNaam = $("<td></td>").appendTo($tr);
		$tdTelefoonnummer = $("<td></td>").appendTo($tr);
		$tdDatum = $("<td></td>").appendTo($tr);
		$tdDelete = $("<td id='reservationId" + inputData[i]["id"] + "'><img src='images/delete.gif' alt='delete'></td>").appendTo($tr);
		$tdAutoId.append(inputData[i]["carId"]);
		$tdPrijs.append(inputData[i]["price"]);
		$tdNaam.append(inputData[i]["name"]);
		$tdTelefoonnummer.append(inputData[i]["telephone"]);
		$tdDatum.append(inputData[i]["time"]);
		$tdDelete.click(function() {
			postCarReservationDeleteReq(this.id.slice(13));
		})
	}
}