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
const uploadJet = new UploadJet({ apiKey: API_KEY });
```

### Registering a new route

Following example demonstrates registering a new route:

```javascript
app.use('/api/upload', uploadJet.createUploadRoute());
```

This example will generate a simple policy with no restrictions on upload files.
You can create restrictions by passing cconfig object to createUploadRoute method.
Below you can see an example of upload route with multiple restrictions.

```javascript
const createUploadRoute = new UploadJet({ apiKey });

const route = createUploadRoute({
  fileType: 'image',
  maxFileSize: '2MB',
  maxFileCount: 6,
  public: true,
  setFileName: (req, file) => {
    return file.originalName;
  }
});

router.post('/profile/images', route);
```

Created policy will have following properties:

- File tipe must me image
- Maximum file size is 2MB
- Maximum number of files that can be uploaded is 6
- Uploaded files will be visible to public

User can alo specifiy own method for generating file names as shown above.
If no method is specified file name will be derived from original file name
and random seed.

Condition value that ends with “\*” specifies a “starts with” condition that will
allow all results starting with that string.
For example .fileType(image/\*”) will allow image/jpg, image/gif, image/png...

Leaving the condition value empty specifies “match any” condition that will allow any result.

> Note: Only some of the conditions allow using “starts with” values.
