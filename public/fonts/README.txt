Place the Revamped font files here so the site will use them.

Recommended filenames (the CSS in styles/globals.css expects these):
  - Revamped-Regular.woff2
  - Revamped-Regular.woff
  - Revamped-Regular.otf

If you downloaded a ZIP (e.g. revamped.zip) that contains Revamped.otf, extract it and copy the .otf into this folder.

PowerShell example (run from your user Downloads folder):
# Replace USERNAME and ZIPNAME as needed; run from project root or adjust paths accordingly
# 1) Extract the zip (if needed)
Expand-Archive -Path "$env:USERPROFILE\Downloads\revamped.zip" -DestinationPath "$env:USERPROFILE\Downloads\revamped_extracted" -Force

# 2) Create the fonts folder in the project (if not present)
New-Item -ItemType Directory -Force -Path "e:\TemplateWebsite\public\fonts"

# 3) Copy the OTF into the project fonts folder (example)
Copy-Item -Path "$env:USERPROFILE\Downloads\revamped_extracted\Revamped.otf" -Destination "e:\TemplateWebsite\public\fonts\Revamped-Regular.otf" -Force

# Optional: if you have a tool to convert to woff2, place the generated woff2/woff files here too.

After placing the file(s), restart the dev server:
npm run dev

Then open http://localhost:3000 to verify the hero uses the Revamped font.
