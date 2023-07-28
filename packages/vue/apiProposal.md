# VueUploadJet

A simple Vue component for easy file uploads with a drag and drop option.

# Installation

## Package manager

To install the VueUploadJet component in your project, run the following command:

`$ npm install vue-upload-jet --save`

## Importing the Component

### Usage Example:

In your Vue Component (ex. ParentComponent) using Options API in Vue:

```vue
<script>
import VueUploadJet from 'vue-upload-jet';

type UploadData {
  fileName: string;
  fileUrl: string;
  fileKey: string;
}

type UploadFailedError {
  fileName: string;
  message: string;
  code: string
}

export default {
  name: 'ParentComponent',
  components: {
    VueUploadJet
  },
  data() {
    return {
      backendUrl: 'server url'
      console.log(User defines a URL to the server which is responsible for generating and returning post policy)
    };
  },
  methods: {
    showSuccessDialog(uploadData: UploadData) {
      console.log(User defines an action for success)
    },
    showErrorDialog(error: UploadFailedError) {
      console.log(User defines an action for error)
    }
  }
};
</script>

<template>
  <VueUploadJet
    :url="backendUrl"
    @upload-complete="showSuccessDialog"
    @upload-error="showErrorDialog" />
</template>

<style></style>
```

In your Vue Component (ex. ParentComponent) using Composition API in Vue:

```vue
<script setup>
import { ref } from 'vue';
import VueUploadJet from 'vue-upload-jet';

type UploadData {
  fileName: string;
  fileUrl: string;
  fileKey: string;
}

type UploadFailedError {
  fileName: string;
  message: string;
  code: string
}

const backendUrl = ref('server url');
console.log(User defines a URL to the server which is responsible for generating and returning post policy)

showSuccessDialog(uploadData: UploadData) {
  console.log(User defines an action for success)
  };
showErrorDialog(error: UploadFailedError) {
  console.log(User defines an action for error)
  };
</script>

<template>
  <VueUploadJet
    :url="backendUrl"
    @upload-complete="showSuccessDialog"
    @upload-error="showErrorDialog" />
</template>

<style></style>
```

## Props

List of all props and description:

| Props | Description                                                                              |
| ----- | ---------------------------------------------------------------------------------------- |
| url   | <br>Required: true<br>Endpoint responsible for returning post policy for uploaded files. |

## Events

List of all events and description:

| Event            | Type                |
| ---------------- | ------------------- |
| @upload-complete | [Event, uploadData] |
| @upload-error    | [Event, error]      |

### Event parameters

Event parameters are being passed through the uploadData or error payload object

| Payload    | Event parameters                                        |
| ---------- | ------------------------------------------------------- |
| uploadData | fileName: string;<br>fileUrl:string;<br>fileKey:string; |
| error      | fileName: string;<br>message:string;<br>code:string;    |
