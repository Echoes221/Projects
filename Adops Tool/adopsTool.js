(function init() {
	this.string       = document.getElementById("string");
	this.stringHolder = [];
	this.changeList   = document.getElementById("changes");
	this.listCreated  = false;
}());

function toRelative() {
	var regURL = /https?:\/\//g,
		relative;
	//Check if URLs in String
	if (regURL.test(string.value)) {
		pushToArray(stringHolder, string.value);
		//Make Relative
		relative = decodeURIComponent(string.value).replace(regURL, "//");
		string.value = relative;
		//If list is visible, refresh list with new changes
		listCreated === true ? showChanges() : false;
	} else {
		alert ("No URLs to make relative!");
	}
}

//Check if selection has been made
function checkEscapeSelection() {
	var newRange;
	//Chrome selection defaults is start|start 
	//Firefox selection defaults is end|end
	//Check if start ! end to see if selection
	if(string.selectionStart !== string.selectionEnd) { // Chrome/Firefox
		escapeSelection();

	} else if(document.selection) { // IE
		string.focus();
		//Cannot store createRange() at top of function
		//Creates undefined errors in other browsers
		newRange = document.selection.createRange().text;
		//Check if anything is in IE text selection object
		newRange.length !== 0 ? escapeSelection() : alert("Please highlight text to escape!");

	} else {
		alert("Please highlight text to escape!");
	}
}

//Make this function modular 'do something with selection'
//args(field, array, method, regex) ... may be a bit overboard
function escapeSelection() {
	//RegEx for all non-alphanumeric characters
	var regNonAlphaNum = new RegExp(/[^a-zA-Z0-9\s]/g),
		replaceWith    = encodeURIComponent(getSelectionText(string));

	//Check if punctuation to escape in selection
	if (regNonAlphaNum.test(replaceWith)){
		pushToArray(stringHolder, string.value);
		//Make Selection Escaped
		replaceSelection(string, replaceWith);
		removeSelection();
		//If list is visible, refresh list with new changes
		listCreated === true ? showChanges() : false;
	} else {
		alert("No non-alphanumeric characters to escape!");
	}
}

//Escape Entire text area
//Doesn't protocol relative
function unEscapeAll() {
	var regEsc = /\%/;
	//check if escaped?
	if (regEsc.test(string.value)) {
		pushToArray(stringHolder, string.value);
		//Ecape All text in holder
		string.value = decodeURIComponent(string.value);
		//If list is visible, refresh list with new changes
		listCreated === true ? showChanges() : false;
	} else {
		alert("There are no characters to unescape!");
	}
}

//Print stored array items (history) to changes <div>
function showChanges() {
	var i, listNode, listValue;
	//Clear list items to prevent list duplication
	changeList.innerHTML = "";
	//Show 'Change' Div
	changeList.style.display = "block";

	for (i = 0; i < stringHolder.length; i++) {
		//Create Nodes and vlaues
		listNode  = document.createElement("li");
		listValue = document.createTextNode(stringHolder[i]);

		//Append list value to nodes
		listNode.appendChild(listValue);
		changeList.appendChild(listNode);
	}
	//ShowChanges() has run, change flag
	listCreated = true;
}

//Finish this function 
function listenForChange() {
	var wrapper = document.getElementById('textArea');

	wrapper.addEventListener('click', function(callback) {
		//Bubble Events Here
	});
}

function revertChange() {
	if (stringHolder.length >= 1) {
		string.value = stringHolder.pop();
		//If list is visible, refresh list with new changes
		listCreated === true ? showChanges() : false;
	} else {
		alert("No changes left to revert!");
	}
}
/*
* Push items to Array 
* Extra checks == safety net
*/
function pushToArray(array, field) {
	var lastEntry = array.length -1;

	if (field.length !== 0 && array[lastEntry] !== field) {
		array.push(field);
	}
}

//Reset all
function clearText() {
	string.value = "";
	stringHolder = [];
	changeList.innerHTML = "";
	//Hide Change Div
	changeList.style.display = "none";
	//Reset global flag
	listCreated = false;
}

//Get selected area of text
function getSelectionText(field) {
    var sel, text;

    if (document.selection) { // IE
        field.focus();
        sel = document.selection.createRange();
        console.log(sel);
        text = sel.text;
    } else if (field.selectionStart >= 0) { // Chrome/Firefox
        text = field.value.substring(field.selectionStart, field.selectionEnd);
    }
    return text;
}

//Clear Selection to prevent duplication on escape (safety net)

//Fix Safari...
function removeSelection() {
	if (document.selection) { // Chrome/Firefox
		document.selection.empty();
	} else if (window.getSelection) { // IE & Safari
		window.getSelection().removeAllRanges();
		window.getSelection().empty();
	}
}
/*
* Replace Selection 
* Relies on checks from checkEscapeSelection()
*/
function replaceSelection(field, replaceWith) {
    var sel, text, start, stop;
    
    if (document.selection) { // IE
        field.focus();
        sel = document.selection.createRange();

        text = sel.text;
    } else if (field.selectionStart >= 0) { // Chrome/Firefox
        start = field.selectionStart;
        stop = field.selectionEnd;

        text = field.value.substring(start, stop);
    }
    if (text) {
      field.value = field.value.replace(text, replaceWith);
   }
}