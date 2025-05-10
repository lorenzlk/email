# Slack Email Summarizer (Google Apps Script)

This project integrates Slack, Gmail, and OpenAI to summarize your recent emails via a Slack command.

## Features
- Slack slash command to trigger email summarization
- Fetches emails from Gmail (last 24 hours)
- Uses OpenAI GPT for summarization
- (Optional) Integrates with Pinecone and Supabase for advanced memory/search

## Project Structure
```
slack-email-summarizer/
├── slackWebhook.gs      # Slack webhook handler
├── emailFetcher.gs      # Gmail fetching logic
├── summarizer.gs        # OpenAI summarization logic
├── utils.gs             # Shared helpers
├── .gitignore           # Git ignore file
├── README.md            # This file
```

## Getting Started
1. Clone this repo and set up with [clasp](https://github.com/google/clasp).
2. Add your API keys and config to Apps Script project properties.
3. Deploy as a web app and configure your Slack app to point to the endpoint.

## Scripts
- `clasp push` — Deploy local changes to Apps Script
- `clasp pull` — Sync latest from Apps Script

## Security
- Never commit secrets or API keys to git.
- Use Apps Script Properties for all credentials.

## License
MIT
