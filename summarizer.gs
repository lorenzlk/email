function summarizeEmailsOpenAI(emails) {
  var OPENAI_API_KEY = getScriptProperty('OPENAI_API_KEY');
  var prompt = 'Summarize the following emails from the last 24 hours:\n\n';
  emails.forEach(function(email, idx) {
    prompt += (idx+1) + '. Subject: ' + email.subject + '\n' + email.body + '\n\n';
  });
  var payload = {
    model: 'gpt-3.5-turbo',
    messages: [{role: 'user', content: prompt}],
    max_tokens: 256
  };
  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: { 'Authorization': 'Bearer ' + OPENAI_API_KEY },
    payload: JSON.stringify(payload)
  };
  var response = UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', options);
  var data = JSON.parse(response.getContentText());
  return data.choices[0].message.content.trim();
}
