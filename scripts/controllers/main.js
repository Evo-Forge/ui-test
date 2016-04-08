'use strict';

filterApp.controller('filterAppCtrl', ['$scope', '$http',
	function ($scope, $http) {
		// Source for ng-repeat="entry in entries"
		// Read all data from json file and pase it to the scope
		$http.get('src/resources/MOCK_DATA_1000.json').success(function(data) {
			$scope.entries = data;
		});

		// Checkbox check and uncheck method
		$scope.check = function (event) {
			// Get the element either by a click event or by function call (for check all function)
			if (event.target)
				var selectedItem = event.target;
			else
				var selectedItem = event;

			// Get the TR Tag to select the whole line
			while (selectedItem.tagName !== "TR") {
				selectedItem = selectedItem.parentNode;
			}
			// Get the span Tag to check the checkbox
			var selectedCheckbox = selectedItem.childNodes[1].childNodes[1];

			// Actions done when a checked row is clicked
			if (selectedItem.classList.contains("selectedItem")) {
				selectedItem.classList.remove("selectedItem");
				selectedCheckbox.innerHTML = "";
				$scope.itemCount = $scope.itemCount - 1;
				if ($scope.itemCount === 0) {
					document.getElementById("itemCounter").style.visibility = "hidden";
					$scope.mainCheckboxVal = "";
				}
				else if ($scope.itemCount < $scope.limitLoads) {
					$scope.mainCheckboxVal = "-";
				}
			}
			// Actions to be done when an unchecked row is clicked
			else {
				selectedItem.classList.add("selectedItem");
				selectedCheckbox.innerHTML = "✓";
				if ($scope.itemCount === 0) {
					document.getElementById("itemCounter").style.visibility = "visible";
					$scope.mainCheckboxVal = "-";
				}
				$scope.itemCount = $scope.itemCount + 1;
				if ($scope.itemCount === $scope.limitLoads) {
					$scope.mainCheckboxVal = "✓";
				}
			}
		};

		// Main ckeck box method
		$scope.mainCheckbox = function () {
			// Decide if to select or deselect first
			if ($scope.mainCheckboxVal === "-" || $scope.mainCheckboxVal === "")
				var checkAll = true;
			else
				var checkAll = false;

			// Get all checked items
			var allRows = document.getElementsByClassName("selectedItem");
			var length = allRows.length;

			// Uncheck all elements
			for (var i = 0; i < length; i++) {
				$scope.check(allRows[0]);
			}

			if (checkAll) {
				// Check all unchecked items
				allRows = document.getElementsByClassName("tableItem");
				length = allRows.length;
				for (var i = 0; i < length; i++) {
					$scope.check(allRows[i]);
				}
			}
		}

		// Headerbutton functionality
		// Set limit for numbers of items displayed on the table, modify button styling and button text
		$scope.setTableLimit = function (limit) {
			// Unselect the selected items which are on no show
			if (limit < $scope.limitLoads) {
				var selectedItems = document.getElementsByClassName("selectedItem");
				var length = selectedItems.length;
				var counter = 0;
				for (var i = 0; i < length; i++) {
					if (selectedItems[i].id > limit) {
						selectedItems[i].classList.remove("selectedItem");
						counter++;
						i--;
						length--;
					}
				}
				$scope.itemCount = $scope.itemCount - counter;
			}

			// Set new limit
			$scope.limitLoads = limit;
			var allButtons = document.getElementsByClassName("headerButton");
			for (var i = 0; i < allButtons.length; i++) {
				// Set the new selected button
				if (allButtons[i].classList.contains("headerButton" + limit)) {
					allButtons[i].classList.add("selectedButton");
					allButtons[i].innerHTML = "Loaded " + limit + " rows";
				}
				// Unset the old selection
				else if (allButtons[i].classList.contains("selectedButton")) {
					allButtons[i].classList.remove("selectedButton");
					var innerText = allButtons[i].innerHTML;
					innerText = innerText.replace("Loaded", "Load");
					allButtons[i].innerHTML = innerText;
				}
			}
		};

		// Setting different filter limit for number or other types
		$scope.getFilterLength = function (filterText) {
			if (parseInt(filterText) == filterText) {
				$scope.filterLength = 1;
			}
			else
				$scope.filterLength = 3;
		}

		// Set initial values
		$scope.limitLoads = 20;
		$scope.itemCount = 0;
		$scope.mainCheckboxVal = "";
		$scope.filterLength = 3;
	}
]);
