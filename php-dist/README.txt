WAYPOINT INNOVATION — Konsole Hosting Deployment
=================================================

FILES TO UPLOAD (via cPanel File Manager or FTP)
-------------------------------------------------
php-dist/index.php     → public_html/index.php
public/Images/         → public_html/Images/
  - Logo.png
  - IndustrialSilo .jpg   (note the space in the filename)
  - Tractor.jpg
  - Factory.JPG
  - Tools.jpg

STRUCTURE ON THE SERVER
-----------------------
public_html/
├── index.php
└── Images/
    ├── Logo.png
    ├── IndustrialSilo .jpg
    ├── Tractor.jpg
    ├── Factory.JPG
    └── Tools.jpg

CONTACT FORM
------------
The form uses PHP mail(). Most Konsole shared hosting plans support this
out of the box. Messages are sent to info@waypointinnovation.co.za.
If mail() is not available, replace the mail() call in index.php with
your preferred transactional email service (e.g. Mailgun, SMTP).

TODO BEFORE GO-LIVE
--------------------
1. Replace phone number: search for "TODO: replace with real phone number"
2. Replace location: search for "TODO: update with actual city/province"
3. Confirm email address: info@waypointinnovation.co.za
4. Add real project photos to Images/projects/ and update the photo grids
5. Set draftPending to false for Automotive & Industrial once copy is approved
