jQuery.expr[':'].contains = function(a, i, m) {
	return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

function getYear(year) {
	if(year) {
		return year.match(/[\d]{4}/); // This is regex: https://en.wikipedia.org/wiki/Regular_expression
	}
}

function mediaWikiPhotos(results, recordYear, recordMoreImages) {
	$.each(results.query.pages, function(pageID, page) {
		imageURL = page.imageinfo[0].url;
		recordMoreImages.append($("<img>").attr("src", imageURL));
	});
	recordYear.removeClass("loading");
	recordMoreImages.addClass("active");
}

function iterateRecords(results) {

	console.log(results);

	var recordTemplate = $(".record-template");

	$.each(results.result.records, function(recordID, recordValue) {

		var recordTitle = recordValue["dc:title"];
		var recordYear = getYear(recordValue["dcterms:temporal"]);
		var recordImage = recordValue["150_pixel_jpg"];
		var recordImageLarge = recordValue["1000_pixel_jpg"];
		var recordDescription = recordValue["dc:description"];

		if(recordTitle && recordYear && recordImage && recordDescription) {

			var clonedRecordTemplate = recordTemplate.clone();
			clonedRecordTemplate.attr("id", "record-" + recordID).removeClass("record-template");
			clonedRecordTemplate.appendTo("#records");

			$("#record-" + recordID + " h2").html(recordTitle);
			$("#record-" + recordID + " .description").html(recordDescription);
			$("#record-" + recordID + " img").attr("src", recordImage);
			$("#record-" + recordID + " img").attr("data-strip-caption", recordTitle);
			$("#record-" + recordID + " .record-content a").attr("href", recordImageLarge);
			$("#record-" + recordID + " .year span").html(recordYear);
			
			$("#record-" + recordID + " .record-content a").click(function(event) {
				Strip.show({
					url: recordImageLarge,
					caption: recordTitle
				});
				event.preventDefault();
			});

		}

	});

	$("#record-count strong").text($(".record:visible").length);

	$("#filter-text").keyup(function() {

		var searchTerm = $(this).val();
		console.log(searchTerm);
	
		$(".record").hide();
		$(".record:contains('" + searchTerm + "')").show();
	
		$("#record-count strong").text($(".record:visible").length);
	
	});

	setTimeout(function() {
		$("body").addClass("loaded");
	}, 300); // 300 millisecond delay

	// Optional: To save on MediaWiki API calls, you may like to get a shortlist of years first and make a large API call
	/*
	var years = [];
	$(".record").each(function() {
		recordYear = $(this).find(".year span").text();
		// Check if this year has already been found
		if(!years.includes(recordYear)) {
			years.push(recordYear);
		}
	});
	*/

	// Click the "More Images From Year" button to load images from MediaWiki API

	$(".record .year").click(function(event) {

		$(this).addClass("loading");

		record = $(this).parent();

		recordYear = $(this);
		recordYearText = recordYear.find("span").text();

		recordMoreImages = record.find(".more-images");
		recordMoreImages.html("");

		mediaWikiFromCache = JSON.parse(localStorage.getItem("mediaWikiData_" + recordYearText));

		if (mediaWikiFromCache) {

			mediaWikiPhotos(mediaWikiFromCache, recordYear, recordMoreImages);
			alert("Loaded MediaWiki data from localStorage");

		}

		else {

			// Calling MediaWiki API
			// This example incorporates the parameters into the URL
			$.ajax({
				url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url&generator=images&titles=" + recordYearText,
				dataType: "jsonp",
				cache: true,
				success: function (results) {
					localStorage.setItem("mediaWikiData_" + recordYearText, JSON.stringify(results));
					mediaWikiPhotos(results, recordYear, recordMoreImages);
					alert("Loaded MediaWiki data from API");
				}
			});

		}
		event.preventDefault();

	});

}

$(document).ready(function() {

	// Calling data.gov.au API
	// This example separates the parameters into its own object

	var data = {
		resource_id: "9eaeeceb-e8e3-49a1-928a-4df76b059c2d",
		limit: 1000
	}
	
	slqFromCache = JSON.parse(localStorage.getItem("slqData_" + data.resource_id)); 
	if (slqFromCache) { 
		iterateRecords(slqFromCache); 
		alert("Loaded SLQ data from localStorage");
	} else {
		$.ajax({
			url: "https://data.qld.gov.au/api/3/action/datastore_search",
			data: data,
			dataType: "jsonp", // We use "jsonp" to ensure AJAX works correctly locally (otherwise it'll be blocked due to cross-site scripting).
			cache: true,
			success: function(results) {
				localStorage.setItem("slqData_" + data.resource_id, JSON.stringify(results)); 
				iterateRecords(results); 
				alert("Loaded SLQ data from API");;
			}
		});
	}

});