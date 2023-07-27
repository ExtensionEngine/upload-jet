# VueUploadJet

A simple Vue component for easy file uploads with a drag and drop option.

# Installation

## Package manager

To install the VueUploadJet component in your project, run the following command:

`$ npm install vue-upload-jet --save`

## Importing the Component

### Usage Example:

In your Vue Component (ex. ParentComponent):

```javascript
<script>
  import VueUploadJet from 'vue-upload-jet';

  export default {
  name: "ParentComponent",
  components: {
    VueUploadJet,
  },
  data() {
    return {
      backendUrl: "" //User defines a URL to the server which is responsible for generating and returning post policy
    };
  },
  methods: {
    showSuccessDialog(){
      //User defines an action for success
      },
    showErrorDialog(){
      //User defines an action for error
      },
    },
  };
</script>

<template>
  <VueUploadJet
  :url="backendUrl"
  @success="showSuccessDialog"
  @error="showErrorDialog"
  />
</template>

<style></style>
```

## Props

List of all props and description:

| Props | Description                                                                                                                                               |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url   | Default: ""<br>Required: true<br>'Value of the backendUrl variable that defines URL of the server responsible for generating and returning a post policy' |

## Events

List of all events and description:

| Event    | Description                                                                                                                                                                      |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| @success | Event listener that listens for a custom event named 'success' emitted by the <br>VueUploadJet component<br>User defines the showSuccessDialog() method in the parent component. |
| @error   | Event listener that listens for a custom event named 'error' emitted by the <br>VueUploadJet component<br>User defines the showErrorDialog() method in the parent component.     |
