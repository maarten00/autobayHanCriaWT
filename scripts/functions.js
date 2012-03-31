/**
 * @author Maarten Kuiper
 */
var loginValue;

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
		goToHomePage();
	});
	$("#loginBtn").click(function() {
		$('.login-form').slideToggle('slow');
	});
	$("#carSelectBtn").click(function() {
		goToCarSearch();
	});
	$("#allCarsBtn").click(function() {
		goToAllCars();
	})
	$("#controlPanelBtn").click(function() {
		goToControlPanel();
	})
	loginValue = document.getElementById("loginValue").value;
}

function closeAllDivs() {
	$('.carSelector').hide();
	$('.allCars').hide();
	$('.carViewer').hide();
	$('.homeText').hide();
	$('.controlPanel').hide();
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
	getAllCarsRequest();
}

function goToControlPanel() {
	closeAllDivs();
	$('.controlPanel').show();
	getAllReservationsRequest();
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

function getAllCarsRequest() {
	getCars = getXmlHttpRequestObject();
	if(getCars.readyState == 4 || getCars.readyState == 0) {
		var params = "method=getAllCars";
		getCars.open("GET", 'backend/getCars.php?' + params, true);
		getCars.onreadystatechange = getAllCarsResponse
		getCars.send(null);
	}
}

function getAllCarsResponse() {
	if(getCars.readyState == 4) {
		var responseArray = eval("(" + getCars.responseText + ")");
		generateCarList(responseArray);
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
		generateControlPanel(responseArray);
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
		$reserveForm.append($('$<p>Uw reservering is geplaatst</p>'));
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

function generateCarReserveForm() {
	$reserveCarFieldset = $('<fieldset id="reserveCarFieldSet"><legend>Auto reserveren</legend>');
	$carViewer.append($reserveCarFieldset);
	$form = $reserveCarFieldset.append('<form id="reserveCar" onsubmit="validateReservation(this)">')
	$priceInput = $form.append('Prijs: <input id="priceInput" type="number" placeholder="€"><br />');
	$nameInput = $form.append('Naam: <input id="nameInput" type="text" placeholder="Naam"><br />');
	$telephoneInput = $form.append('Telefoonnummer:<input id="telephoneInput" type="tel" placeholder="1234-123456">');
	$submitBtn = $('<input type="submit" name="submit" value="Plaats Reservering">');
	$form.append($submitBtn);
	$submitBtn.click(function() {
		validateReservation($('#priceInput').val(), $('#nameInput').val(), $('#telephoneInput').val(), $('#carId').text());
	})
}

function generateSelectBox(inputData, type) {
	if(type == "brand") {
		$("#brandSelector").remove();
		var brandList = $('<select id="brandSelector"></select>');
		brandList.appendTo($('.carSelector'));
		brandList.append('<option value="-">Selecteer Merk</option>');
		for(i in inputData) {
			brandList.append('<option value="' + inputData[i]["Merk"] + '">' + inputData[i]["Merk"] + '</option>');
		}
		$("#brandSelector").change(function() {
			getModelsRequest($("#brandSelector").val());
		});
	}
	if(type == "models") {
		$("#modelSelector").remove();
		var modelList = $('<select id="modelSelector"></select>');
		modelList.appendTo($('.carSelector'));
		modelList.append('<option value="-">Selecteer Model</option>');
		for(i in inputData) {
			modelList.append('<option value="' + inputData[i]["Type"] + '">' + inputData[i]["Type"] + '</option>');
		}
	}
}

function generateCarList(inputData) {
	$('#carList').find("tr:gt(0)").remove();
	for(i in inputData) {
		$tr = $("<tr id='" + inputData[i]["id"] + "'></tr>").appendTo($('#carList'));
		$tdMerk = $("<td></td>").appendTo($tr);
		$tdType = $("<td></td>").appendTo($tr);
		$tdBouwjaar = $("<td></td>").appendTo($tr);
		$tdMerk.append(inputData[i]["merk"]);
		$tdType.append(inputData[i]["type"]);
		$tdBouwjaar.append(inputData[i]["bouwjaar"]);
		$tr.click(function() {
			getCarRequest(this.id, "customer");
		})
	}
}

function generateCarView(inputData, method) {
	$carViewer = $('.carViewer');
	$carViewer.find("tr:gt(0)").remove();
	emptyCarView();
	$carViewer.show();
	for(i in inputData) {
		$carDetails = $("<div id='carDetails'>");
		$carIdField = $('<input type="hidden" id="carId"></input>');
		$carIdField.append(inputData[i]["id"]);
		$carDetails.append($carIdField);
		$carDetails.append("Merk: " + inputData[i]["merk"] + "<br />Type: " + inputData[i]["type"] + "<br />");
		$carDetails.append("Brandstofsoort: " + inputData[i]["brandstof"] + "<br />");
		$carDetails.append("Motorinhoud: " + inputData[i]["motorinhoud"] + "CC<br />");
		$carDetails.append("Bouwjaar: " + inputData[i]["bouwjaar"] + "<br />Kleur: " + inputData[i]["kleur"] + "<br />");
		if(method != "controlPanel") {
			$carImg = $("<img id='carImg' src='images/auto" + inputData[i]["id"] + ".jpg' alt='carImg'/>");
			$carImg.insertBefore($('#carReservations'));
		}
		if(loginValue == "1") {
			getCarReservationsRequest(inputData[i]["id"]);
			$carDetails.insertBefore($('#carReservations'))
		} else {
			$carViewer.append($carDetails);
			$carViewer.append($carImg);
			generateCarReserveForm();

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
			$tr = $("<tr id='" + inputData[i]["carId"] + "'></tr>").appendTo($carReservationsTable);
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

function generateControlPanel(inputData) {
	$('#reservationsTable').find("tr:gt(0)").remove();
	for(i in inputData) {
		$tr = $("<tr id='" + inputData[i]["carId"] + "'></tr>").appendTo($('#reservationsTable'));
		$tdAutoId = $("<td></td>").appendTo($tr);
		$tdPrijs = $("<td></td>").appendTo($tr);
		$tdNaam = $("<td></td>").appendTo($tr);
		$tdTelefoonnummer = $("<td></td>").appendTo($tr);
		$tdDatum = $("<td></td>").appendTo($tr);
		$tdAutoId.append(inputData[i]["carId"]);
		$tdPrijs.append(inputData[i]["price"]);
		$tdNaam.append(inputData[i]["name"]);
		$tdTelefoonnummer.append(inputData[i]["telephone"]);
		$tdDatum.append(inputData[i]["time"]);
		$tr.click(function() {
			getCarRequest(this.id, "controlPanel");
		})
	}
}