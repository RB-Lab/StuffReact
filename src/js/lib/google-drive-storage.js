/* global gapi */
const CLIENT_ID = '380997850508-m80qot6o9nuh6i4ios6u8isvrdsdrjrm.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/drive';



/**
* Called when authorization server replies.
*
* @param {Object} authResult Authorization result.
*/
function handleAuthResult(authResult) {
	console.log(authResult);
	if (authResult && !authResult.error) {

	} else {

	}
}

function checkAuth() {
	gapi.auth.authorize({
		'client_id': CLIENT_ID,
		'scope': SCOPES,
		'immediate': true
	}, handleAuthResult);
}

function uploadFile(body, callback) {
	gapi.client.load('drive', 'v2', function() {
		var request = gapi.client.request({
				'path': '/upload/drive/v2/files',
				'method': 'POST',
				'params': {'uploadType': 'multipart'},
				'headers': {
					'Content-Type': 'text/plain'
				},
				'body': body});
		request.execute(callback);
	});
}

module.exports = {
	checkAuth: checkAuth,
	uploadFile: uploadFile
};
