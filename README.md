# Proposal Craft

## Overview

This is a web app where companies can create proposal for bidding RFPs(Request for Proposal). This app will take the information from users (companies proposal writer) that will be stored in database for future use and current rfp-pdfs and create a draft proposal using LLM. 

### Problem

This app will be useful for proposal writers because they don't have to write proposals manually from scratch. Currently, the companies have to hire and allocate a separate resource to bid on multiple RFPs and Tenders.

### User Profile

Companies who want to bid on released Government contracts.

### Features

- As a user, I can Sign Up/Login.
- When I am logged in I can store and reuse company details for any number of RFPs for bidding on contracts or applying to grants.
- I can upload the RPF files to the application.
- The application will use the RFP provided and company historical information to generate draft proposals.
- I can use the draft generated in any way I want (Download the generated proposal to Word Document/copy paste into my choice of word processor.)

## Implementation

### Tech Stack

Technologies
- React
- Express Js
- Node Js
- Mysql
- Mantine UI for styling
- FontAwesomeIcon for icons
- npm react-pdftotext for converting pdf to string.

### APIs

- Google Gemini LLM api to generate proposal. To rerun this package, first you need to obtain a GOOGLE API KEY from the link below:

    [Google Gemini Key Creating Page](https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Faistudio.google.com%2Fapp%2Fapikey&followup=https%3A%2F%2Faistudio.google.com%2Fapp%2Fapikey&ifkv=Ab5oB3qdXYtlo-gkXqkoy4knfWkg5bMwmdARI1emibLghlyVLklLFwQyxnIK1naDIAem-2flyvj25A&passive=1209600&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-669309505%3A1724112150559400&ddm=0)

- Alternatively, you can use OLLAMA (llama3.1) as a local LLM to generate the proposal. The app allows a toogle switch to choose between OLLAMA and GOOGLE GEMINI.

### Sitemap

- Home page
- Sign up/Login page
- Company Profile page
- Add/Edit Company page
- Add/Edit Employee page
- Upload pdf and generate proposal Page

### Mockups
#### Home Page
<img width="1280" alt="homePage" src="https://github.com/user-attachments/assets/0cd6f78e-12a6-4941-b27b-7096aff85cc5">

#### Login Page
<img width="1280" alt="login" src="https://github.com/user-attachments/assets/8408622c-4948-4f98-9575-266544f85883">

#### Generate Proposal Page
<img width="1280" alt="generateProposal" src="https://github.com/user-attachments/assets/967c6c61-20e3-496c-a2ce-484f66e95669">

### Data

![ER Diagram for the database structure](https://github.com/user-attachments/assets/8355abbd-8eae-4066-a9a2-f6be17d9619e)

### Endpoints

- http://localhost:PORT/user => get/post/put
- http://localhost:PORT/user/:id => delete
- http://localhost:PORT/user/login => post (for login)
- http://localhost:PORT/employee/ => post
- http://localhost:PORT/employee/:company_id/employees => get
- http://localhost:PORT/employee/:id => get/put/delete
- http://localhost:PORT/company/ => get/post
- http://localhost:PORT/company/:company_id/update => put
- http://localhost:PORT/company/:user_id => get
- http://localhost:PORT/company/:user_id/companyAndEmployees => get
- http://localhost:PORT/generate/ => post
- http://localhost:PORT/generate/summarize => post
- http://localhost:PORT/ollama/generate/ => post
- http://localhost:PORT/ollama/generate/summarize => post

### Auth

- Using JWT Token system and sessionStorage

## Roadmap

- Make basic project with all the minimum requirements.
- Create/Test apis.
- Add company detail page.
- Add employee detail page.
- Add upload pdf and generate proposal pages.
- Add sign-up/login pages

## Nice-to-haves
- DIVING DEEPER: Authentication using JWT Token system
- DIVING DEEPER: Deployment to AWS/Azure/GCP
- DIVING DEEPER: Stripe api for payment handling
