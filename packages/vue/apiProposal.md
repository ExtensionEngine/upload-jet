# VueUploadJet

A simple Vue component for easy file uploads with a drag and drop option.

# Installation

## Package manager

To install the UploadJet component in your project, run the following command:

`$ npm install @upload-jet/vue`

## Importing the Component

### Usage Example:

In your Vue Component (ex. ParentComponent) using Composition API in Vue:

```vue
<script setup lang="ts">
import { UploadJet } from '@upload-jet/vue';
import '@upload-jet/vue/style.css';

const URL = 'ENDPOINT_URL'

showSuccessDialog(data) {
    console.log('Success: ', data);
  };
showErrorDialog(data) {
  console.log('Error: ', data);
  };
</script>

<template>
  <UploadJet
    @upload-complete="showSuccessDialog"
    @upload-error="showErrorDialog"
    :url="URL"
    :maxFileCount="1"
    fileType="image" />
</template>
```

## Props

List of all props and description:

| Props        | Description                                                                                                                                                                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url          | <br>Required: true<br>Endpoint responsible for returning post policy for uploaded files.                                                                                                                                                                                                      |
| maxFileCount | <br>Required: false<br>Default: 1<br>Number of files allowed to be uploaded. If the number is greater then 1, multiple files are allowed.                                                                                                                                                     |
| fileType     | <br>Required: false<br>Specifies the type of files allowed to be uploaded. <br>Accepts a valid MIME type or one of the predefined types from the component's list: "image," "audio," "video," "pdf," or "text." <br>If "fileType" is not provided, all types of files are allowed for upload. |

## Events

List of all events and description:

| Event            | Type            |
| ---------------- | --------------- |
| @upload-complete | [Event, result] |
| @upload-error    | [Event, error]  |

### Event parameters

Event parameters are being passed through the result or error payload object

| Payload | Event parameters                                                                    |
| ------- | ----------------------------------------------------------------------------------- |
| result  | { <br>&nbsp;fileName: string;<br>&nbsp;fileKey:string; <br> }                       |
| error   | { <br>&nbsp;fileName: string;<br>&nbsp;message:string;<br>&nbsp;code:string; <br> } |
