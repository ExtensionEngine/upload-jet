# Upload Jet

## Table of Contents

1. [Introduction](#Introduction)
2. [Prerequisites](#Prerequisites)
3. [Authentication](#Authentication)
4. [Installing libraries](#Installinglibraries)
5. [Uploading files](#Uploadingfiles)

## Introduction

Welcome to Upload Jet, a full-stack file-sharing application that allows you to securely upload and share files to Amazon S3. This guide will walk you through the process of creating your account and setting up the libraries to enable secure and efficient file sharing."

## Prerequisites

Make sure you have the following prerequisites:

- An active [GitHub](https://github.com/) account for authentication.
- [Node.js](https://nodejs.org/) v18+ and npm installed on your system.

## Authentication

### Create an account:

Before you can begin using Upload Jet, you'll need to follow these steps to create an account:
Visit the [Upload Jet Login Page](http://localhost:8080/).

Login with GitHub: Click on the "Login with GitHub" button to login with your Github account. If you don't have a GitHub account, you can easily sign up for one.

Once you've successfully logged in you can redirect to the dashboard by clicking the button "Go to dashboard".

### Generating an API key:

The next step is to create an application, which will allow you to obtain an API key:

- Navigate to Applications page within the Upload Jet Dashboard.
- Inside the Application page, create a new application. This application will represent your integration with Upload Jet.
- After creating the application, generate an API key associated with the application.
- Save your API key as it is a crucial component for securely interacting with the Upload Jet server.

Now, with your API key in hand, you're ready to dive into the process of setting up and utilizing Vue.js and Express.js libraries to enable secure and efficient file sharing.

## Installing libraries

### Server side:

Open your terminal and navigate to your Express server directory.
Use npm to install the Express.js library:

```
$ npm install @upload-jet/express
```

### Client side:

Open your terminal and navigate to your Vue client directory.
Use npm to install the Vue library:

```
$ npm install @upload-jet/vue
```

## Uploading files

### Server-side:

1. **Install dependencies:** Make sure you have the necessary dependencies installed in your Express.js project.
2. **Import UploadJet:** In your Express server code, import the UploadJet class from the upload-jet/express module.
3. **Create UploadJet Instance:** Create a new instance of the UploadJet class, and insert your generated API key as a constructor parameter.<br />
   `const uploadJet = new UploadJet({ apiKey: 'YOUR_API_KEY' });`.<br />
   The API key is used to authorize the user to obtain the upload policy for uploading files to Amazon S3.
4. **Define Upload Routes:** Define appropriate routes on your Express.js server to handle file uploads. Configure file upload settings as UploadOptions for each route.<br /> Consult the UploadJet API documentation for guidance on setting up these routes and UploadOptions.

### Client side:

1. **Install dependencies:** Make sure you have the necessary dependencies installed in your Vue.js project.
2. **Import UploadJet Component:** In your client-side Vue component, import the UploadJet component from the upload-jet/vue module.
3. **Configure the Component:** Configure the UploadJet component by providing the necessary options as per the upload-jet/vue API documentation. These options may include specifying the maximum file count, configuring event listeners, and more.
4. **Connect to Express Server:** Connect the UploadJet component to your Express server by specifying the appropriate URL of your Express server where file uploads will be handled.

Now, you are fully prepared to upload files to Amazon S3 effortlessly, right from within your Vue application. You can do so by either browsing for files or simply dragging and dropping them into the designated area."
