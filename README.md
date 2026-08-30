# Wedding website

An elegant, responsive, single-page wedding website for Lungelo Mpinga and Jacob Nyandoro, prepared for Azure Static Web Apps.

## Personalize

The names, date, venue, story, and travel details are in `index.html`. In `script.js`, replace `rsvp@example.com` with the email address that should receive replies.

## Publish to Azure Static Web Apps

1. Create a new Static Web App in the Azure portal.
2. Connect the repository that contains these files.
3. Choose **Custom** as the build preset.
4. Set the app location to `/` and leave the output location empty.
5. Save and let Azure publish the site.

The included `staticwebapp.config.json` provides single-page fallback behavior and security headers.
