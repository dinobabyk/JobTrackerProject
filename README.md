# JobTrackerProject
Technical Test Datacom - DINO

**Used Versions**
Backend : .NET 8 Core (Visual Studion 2022)
FrontEnd : Angular 19 (VS Code)
Database : SQL (SSMS 20)

**Project Details**
Extract "Datacom_Test file"
Angular Project : Datacom_Test > JobAppTrack
.NET API Project : Datacom_Test > JobAppTrackAPI

**Steps**
1.Open the API project and update the data base connection string in "appsettings.json"
2.Execute the migration process for database execution
3.Run the .NET API project
4.Open angular project execute npm install (node_modules not uploaded) and run using "ng serve"
5.If there any change in API url, Update the Base API url in "environments > environments.ts"
6.Login with the value from database "Users" table
7.Process the Job Application from menu "Jobs > Job Application"

**Additional Packages Installed in Application**
Backend : Entity Framework Core, JwtBearer for authentication
FrontEnd : AdminLTE (For Design), Angular Form Material and SweetAlert popup 
