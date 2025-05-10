function fetchEmailsFromLast24Hours() {
  var now = new Date();
  var yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  var query = 'after:' + Math.floor(yesterday.getTime() / 1000);
  var threads = GmailApp.search(query);
  var emails = [];
  threads.forEach(function(thread) {
    var msgs = thread.getMessages();
    msgs.forEach(function(msg) {
      if (msg.getDate() > yesterday) {
        emails.push({subject: msg.getSubject(), body: msg.getPlainBody()});
      }
    });
  });
  return emails;
}
