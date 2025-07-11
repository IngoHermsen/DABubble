  // 'Upload Image' function: This function is triggered by a change-event on the 'File Upload input' (type 'file')
  // Function first sets the imgLoading-boolean as "true". This boolean is binded to the view, so the user can see that the upload is running.
  // In the function the Input Element variable 'inputEl' is initialized with the html-Element from the passed event.
  // It is used to check if the user selected an actual file. In that case the Observable takes place (from(uploadBytes...))

  // Explanation in order of appearance in the code: 
  // The goal of the  observable 'from(uploadBytes)' is to get the selected User File and "write it" to the reference path in the Firebase Storage and then returns the final url that points to the uploaded image.
  // To reach that it passes the values of the ImageRef and the file and after upload process finished, it starts a second observable.
  // That second observable 'from(getDownloadURL...)' takes the result of the upload, and receives the storage reference from the first observable.
  // The second observable returns the final url of the uploaded file.

  // Important: The first observable code will not be passed until it is subscribed.
  // For that reason at the end of the second observable there is a ".subscribe" to initialize the code above that part. 
  // The subscribe is an "Observer" that handles the data that comes from its observed observable.
  // the next-method specifies what to do with this data. In our case it sets the previewImg variable to the received url.
  // finally it sets the 'imgLoading'-boolean to 'false' in order the user can see that the upload ist finished and can see the image in the preview.
