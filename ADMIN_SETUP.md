# Admin Panel Setup Instructions

## Overview
The admin panel allows you to edit site content without touching code. Changes are stored in Cloudflare KV and appear instantly on the live site.

## Setup on Cloudflare Pages

### 1. Create a KV Namespace

In your Cloudflare dashboard:

1. Go to **Workers & Pages** → **KV**
2. Click **Create a namespace**
3. Name it: `SITE_CONTENT`
4. Copy the namespace ID

### 2. Bind KV to Your Pages Project

1. Go to **Workers & Pages** → Select your project
2. Go to **Settings** → **Functions**
3. Scroll to **KV namespace bindings**
4. Click **Add binding**:
   - Variable name: `SITE_CONTENT`
   - KV namespace: Select the `SITE_CONTENT` namespace you created
5. Click **Save**

### 3. Deploy Your Site

Push your code to GitHub and Cloudflare Pages will automatically deploy.

## Using the Admin Panel

1. Visit: `https://your-site.pages.dev/admin`
2. Enter PIN: `5555`
3. Edit any text fields
4. Click **Publish Changes**
5. Changes appear instantly on the live site!

## Security Notes

- The PIN is currently hardcoded as `5555`
- To change it, edit `/app/admin/page.tsx` line where `pin === '5555'`
- Consider using environment variables for production
- Session expires when you close the browser

## Editable Content

- **Hero Section**: Title, subtitle, description, patent info
- **Problem/Solution**: Titles and closing statement
- **Research**: Title, subtitle, highlights footer
- **Purchase**: Button text, company info, phone, email, copyright

## Troubleshooting

**Changes not appearing?**
- Check that KV binding is correctly set up
- Verify the binding variable name is exactly `SITE_CONTENT`
- Check browser console for errors

**Can't access admin panel?**
- Ensure you deployed after adding the admin files
- Try clearing browser cache
- Check that `/admin` route is accessible

**KV storage limits (Free tier):**
- 100,000 reads per day
- 1,000 writes per day
- More than enough for a content management system!
