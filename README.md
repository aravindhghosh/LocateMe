# LocateMe
LocateMe is a hybrid mobile application. It supports both iOS, Android and Web. It provides geographic location of an user per minute using GPS and stores the location with latitude, longitude and timestamp to a database using Firebase. The application shows the current location and marks location in map.

# Instructions to Run and deploy

To use the code add the following in your ionic project:

- Clone the project

- Place it in any location and extract it....

  '''
  npm install firebase @angular/fire
 
  npx cap add android
  npx cap add ios
  '''

- To run the code

  ```ionic serve or ionic serve -l //l stands for ionic labs```

- To build use the code 

  ```npm run build

  npx cap copy

  npx cap copy android [or] npx cap copy ios

  npx cap open android [or] npx cap open ios
  ```

- Then build the app according to your destination target.
