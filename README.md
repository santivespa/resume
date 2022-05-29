# ResuMe

ResuMe is an application that generates a pdf with the data entered by the user.
The application allows you to share your resume by link or by the generated pdf.

## Technologies

Backend: .NET CORE 5 and SQL database.<br />
Frontend: Angular 12.<br />
For the image storage it uses a Blob Container in Azure.

## How to run it locally

#### Backend: 
Configure your connection strings in the appsettings.json of the API project. <br />
In the Package Manager Console run ``` update-database ``` to generate the database.<br />
Start api project running ``` dotnet run ```

#### Frontend: 
Run ``` npm install ``` to install the dependencies and then run ``` ng serve -o ``` to start the app.

## License
[MIT](https://choosealicense.com/licenses/mit/)