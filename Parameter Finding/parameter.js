window.addEventListener('load', function () {
	document.querySelector('button').addEventListener('click', function () {
		window.open(redirect('http://www.thisisfake.com/', 'PARAM_'));
	})
})

//Build dynamic redirect URL based on values in form
function redirect (url, paramPrefix) {
	var redir  = url,
		nodes  = returnIds(),
		prefix = paramPrefix.length,
		i;
	//Check for '?' append if necessary
	redir += url.indexOf('?') == -1 ? '?' : '';
	//Only build those that start with paramPrefix,
	//and have content associated with their values
	for (i = 0; i < nodes.length; i++) {
		if (nodes[i].substring(0,prefix) === paramPrefix 
			&& document.getElementById(nodes[i]).value !== "") {
			redir += buildParam(nodes[i], prefix);
		}
	}
	//Return Built URL
	return redir;
}

//Return all ID names from DOM tree
function returnIds () {
	var DOM = document.body.getElementsByTagName('*'),
		ids = [],
		node,
		i;
	//Push all DOM ID's to ids array	
	for (i = 0; i < DOM.length; i++) {
		node = DOM[i];
		if (node.id) {
			ids.push(node.id);
		}
	}
	return ids;
}

//Build parameters based on ID's
function buildParam (id, prefix) {
	//remove prefix from ID to get parameter name.
	//Leave prefix on for elementById to get the value of that ID
	//Account for non standard characters
	return "&" + id.substring(prefix) + "=" + encodeURIComponent(document.getElementById(id).value);
}