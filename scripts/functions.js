/**
 * @author Maarten Kuiper
 */

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
	$("#homeBtn").click( function() {
		goToHomePage();
	});
	$("#loginBtn").click( function() {
		$('.login-form').slideToggle('slow');
	});
	$("#carSelectBtn").click( function() {
		goToCarSearch();
	});
	$("#allCarsBtn").click( function() {
		goToAllCars();
	})
	$("#controlPanelBtn").click( function() {
		goToControlPanel();
	})
}

function closeAllDivs() {
	$('.carSelector').hide();
	$('.allCars').hide();
	$('.carViewer').hide();
	$('.homeText').hide();
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
	generateControlPanel();
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

function getCarRequest(carId) {
	getCar = getXmlHttpRequestObject();
	if(getCar.readyState == 4 || getCar.readyState == 0) {
		var params = "method=getCar&carId=" + carId;
		getCar.open("GET", 'backend/getCars.php?' + params, true);
		getCar.onreadystatechange = getCarResponse
		getCar.send(null);
	}
}

function getCarResponse() {
	if(getCar.readyState == 4) {
		var responseArray = eval("(" + getCar.responseText + ")");
		generateCarView(responseArray);
	}
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
		$("#brandSelector").change( function() {
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
		$tr.click( function() {
			getCarRequest(this.id);
		})
	}
}

function generateCarView(inputData) {
	$carViewer = $('.carViewer');
	$carViewer.empty();
	$carViewer.show();
	for(i in inputData) {
		$carDetails = $("<div id='carDetails'>");
		$carViewer.append($carDetails);
		$carDetails.append("Merk: " + inputData[i]["merk"] + "<br />");
		$carDetails.append("Type: " + inputData[i]["type"] + "<br />");
		$carDetails.append("Brandstofsoort: " + inputData[i]["brandstof"] + "<br />");
		$carDetails.append("Motorinhoud: " + inputData[i]["motorinhoud"] + "CC<br />");
		$carDetails.append("Bouwjaar: " + inputData[i]["bouwjaar"] + "<br />");
		$carDetails.append("Kleur: " + inputData[i]["kleur"] + "<br />");
		$carImg = $("<img id='carImg' src='images/auto" + inputData[i]["id"] + ".jpg' alt='carImg'/>");
		$carViewer.append($carImg);
	}
}


function generateControlPanel(){
	generatePanel();
}