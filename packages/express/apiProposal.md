# Installation

## Package manager

`$ npm install upload-jet`

Once the package is installed, you can import the library by using import or
require approach:

```javascript
import UploadJet from 'upload-jet';

// or

const UploadJet = require('upload-jet');
```

## Usage

To use the uploader it is required to provide an api key when creating
a new instance of EzeeUploader class.

```javascript
const uploadJet = new UploadJet(API_KEY);
```

### Registering a new route

Following example demonstrates registering a new route:

```javascript
app.use('/api/upload', uploadJet.maxSize(15).generate());
```

This example will generate a policy that limits the file size to maximum 15MB.
You can create a policy using as many conditions as you like and combine them.
Generate method takes all conditions previously specified and processes them to
create the policy.

Below you can see an example of a route using multiple conditions.

```javascript
app.use(
  '/api/users/images',
  uploadJet
    .minSize(0)
    .maxSize(15)
    .key('content/*')
    .key('media/*')
    .contentType('image/jpg')
    .generate()
);
```

Created policy will have following properties:

- Minimum file size is 0MB
- Maximum file size is 15MB
- File name name must start with “content/” or “media/”
- Content type must be “image/jpg”

Condition value that ends with “_” specifies a “starts with” condition that will
allow all results starting with that string.
For example .key(“media/_”) will allow “media/picture.jpg”.

Leaving the condition value empty specifies “match any” condition that will allow any result.

> Note: Only some of the conditions allow using “starts with” values.
