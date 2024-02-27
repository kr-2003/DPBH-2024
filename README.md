## Overview
In our endeavor to safeguard online users from deceptive practices, our project focuses on identifying and mitigating ten prevalent dark patterns. This report outlines the technical strategies, methodologies, and technologies we employed to address this challenge. Our approach integrates advanced machine learning (ML) models, browser extension development, and a scalable microservices architecture, ensuring a comprehensive and efficient solution.

### Features
- _Browser Extension_: A real-time webpage analyzer that alerts users to the presence of dark patterns.
- _Machine Learning Model_: Advanced NLP and deep learning algorithms identify both text and behavior-based dark patterns.
- _Crowd-Review Portal_: A community platform for reporting and reviewing dark patterns, promoting collective vigilance.

### Installation Steps:

#### 1. Machine Learning Model and Backend Server:

- First, clone the project repository to your local machine.
```
git clone https://github.com/kr-2003/DPBH-2024 && cd DPBH-2024-main
```


- Install Python Dependencies
```
pip install -r requirements.txt
```


#### 2.Docker Deployment:

- With Docker and Docker Compose installed, deploy the backend services:
```
docker-compose up --build
```
This command will set up the ML model server and the admin portal.

### Browser Extension Installation:

1. Load the Extension into Chrome
2. Navigate to chrome://extensions/ in your Chrome browser.
3. Enable "Developer mode" at the top-right corner.
4. Click "Load unpacked" and select the extension's folder from the cloned repository.
5. The extension icon should now appear in your browser toolbar, indicating it's ready to use.
6. _Using the Crowd-Review Portal_ : Access the portal through the link in the browser extension's popup. This platform allows users to submit and review reports of dark patterns, fostering a knowledgeable and vigilant community.

### Usage:
After installation, the browser extension will automatically analyze sites you visit. When a dark pattern is detected, an alert popup will appear, detailing the type of dark pattern recognized. The popup also includes a link to the crowd-review portal, where you can learn more about the pattern or report a new one.
