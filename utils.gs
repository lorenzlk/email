function getScriptProperty(key) {
  return PropertiesService.getScriptProperties().getProperty(key);
}

function postToSlack(responseUrl, message) {
  var payload = {
    text: message
  };
  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };
  UrlFetchApp.fetch(responseUrl, options);
}

function summarizeRecentEmails() {
  var emails = fetchEmailsFromLast24Hours();
  if (emails.length === 0) {
    return 'No emails found from the last 24 hours.';
  }
  return summarizeEmailsOpenAI(emails);
}
