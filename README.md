### Alerting System for Monitoring Failed POST Requests
## Backend
This backend system monitors a specific POST endpoint (/api/submit) for failed requests caused by invalid headers or incorrect access tokens. It tracks the number of failed requests from each IP address within a configurable time window (e.g., 10 minutes). When a threshold of failed attempts is exceeded, the system triggers email alerts to notify the relevant team. The system also logs and stores failed request metrics such as IP address, timestamp, and reason for failure in a MongoDB database.

# Features:
Monitors failed requests at the /api/submit endpoint.
Tracks invalid requests based on the IP address within a configurable time window.
Sends email alerts if a threshold of failed requests from the same IP is exceeded.
Logs metrics of failed requests to MongoDB.
Exposes an endpoint to fetch failed request metrics.

# Tech stack- 
Backend: Node.js, Express.js
Database: MongoDB (used for logging metrics of failed requests)
Email Alerts: Gmail SMTP Server (to send email notifications)
Frontend: React.js (to display the logs of failed requests)  -- ## optional
API: RESTful API built with Express.js

# Frontend is Optional

** Clone Repo - 
git clone https://github.com/your-username/alerting-system.git
cd alerting-system/backend

** Install Dependencies:
npm install

** .env Setup - 
PORT=000
MONGO_URI=''
ACCESS_TOKEN=your_access_token
EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
ALERT_EMAIL=alert_recipient_email@gmail.com

** Start the server - 
node server.js

** frontend -
npm run dev

** Conclusion
This project implements a robust alerting system to monitor and track failed POST requests, sending timely email alerts when unusual activity is detected.
