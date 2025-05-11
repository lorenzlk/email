function doPost(e) {
  if (!verifySlackRequest(e)) {
    return ContentService.createTextOutput('Invalid signature').setMimeType(ContentService.MimeType.TEXT);
  }
  var params = e.parameter;
  var slackSignature = e.parameter['X-Slack-Signature'];
  var responseUrl = params.response_url;
  var userId = params.user_id;
  // Call main summarization logic
  var summary = summarizeRecentEmails();
  // Post summary back to Slack
  postToSlack(responseUrl, summary);
  return ContentService.createTextOutput('OK');
}

function verifySlackRequest(e) {
  var signingSecret = getScriptProperty('SLACK_SIGNING_SECRET');
  var timestamp = e.parameter['X-Slack-Request-Timestamp'];
  var slackSignature = e.parameter['X-Slack-Signature'];
  var body = e.postData.contents;
  if (!timestamp || !slackSignature) return false;
  // Prevent replay attacks (5 min window)
  if (Math.abs((Date.now() / 1000) - parseInt(timestamp, 10)) > 60 * 5) return false;

  var sigBasestring = 'v0:' + timestamp + ':' + body;
  var hash = Utilities.computeHmacSha256Signature(sigBasestring, signingSecret);
  var hexHash = 'v0=' + hash.map(function(b) {
    var hex = (b < 0 ? b + 256 : b).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
  return Utilities.base64EncodeWebSafe(hexHash) === Utilities.base64EncodeWebSafe(slackSignature);
}
