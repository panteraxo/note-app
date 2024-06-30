# Note Web App

This project consists of a backend built with .NET Core and a frontend built with React. Below are the instructions and requirements to set up and run the application.

## Requirements

### Backend

- **.NET SDK**: The .NET SDK is required to build and run the backend. The specific version used in this project is:
  - .NET SDK 6.0 (you can download it from [here](https://dotnet.microsoft.com/download/dotnet/6.0))

- **Entity Framework Core**: The following EF Core packages are used:
  - `Microsoft.AspNetCore.Cors`  (version 2.2.0)
  - `Microsoft.EntityFrameworkCore` (version 8.0.6)
  - `Microsoft.EntityFrameworkCore.Design` (version 8.0.6)
  - `Microsoft.EntityFrameworkCore.Tools` (version 8.0.6)
  - `Pomelo.EntityFrameworkCore.MySql` (version 8.0.2)

- **MySQL**: The database used in this project is MySQL. Ensure you have MySQL installed on your system. The specific version used is:
  - MySQL 8.0.36 (you can download it from [here](https://dev.mysql.com/downloads/mysql/))

### Frontend

- **Node.js**: Node.js is required to run the frontend. The specific version used in this project is:
  - Node.js v20.11.0 (you can download it from [here](https://nodejs.org/))

- **npm**: npm is used to manage the frontend dependencies. The specific version used in this project is:
  - npm 10.2.4 (it comes bundled with Node.js)
  
**React Dependencies**: The following npm packages are used in the React frontend:
  - `@radix-ui/react-alert-dialog` (version 1.0.5)
  - `@radix-ui/react-dialog` (version 1.0.5)
  - `@radix-ui/react-slot` (version 1.0.2)
  - `axios` (version 1.7.2)
  - `class-variance-authority` (version 0.7.0)
  - `clsx` (version 2.1.1)
  - `lucide-react` (version 0.394.0)
  - `react` (version 18.2.0)
  - `react-dom` (version 18.2.0)
  - `react-hook-form` (version 7.51.5)
  - `react-icons` (version 5.2.1)
  - `react-router-dom` (version 6.23.1)
  - `tailwind-merge` (version 2.3.0)
  - `tailwindcss-animate` (version 1.0.7)

- **React Development Dependencies**: The following npm packages are used as development dependencies in the React frontend:
  - `@types/react` (version 18.2.66)
  - `@types/react-dom` (version 18.2.22)
  - `@vitejs/plugin-react-swc` (version 3.5.0)
  - `autoprefixer` (version 10.4.19)
  - `eslint` (version 8.57.0)
  - `eslint-plugin-react` (version 7.34.1)
  - `eslint-plugin-react-hooks` (version 4.6.0)
  - `eslint-plugin-react-refresh` (version 0.4.6)
  - `postcss` (version 8.4.38)
  - `tailwindcss` (version 3.4.4)
  - `vite` (version 5.2.0)
### Tools

- **Visual Studio 2022**: The IDE used for developing the backend. Ensure you have Visual Studio 2022 installed with the .NET workload.
- **Bash**: A bash shell is required to run the provided script. This is typically available on Linux and macOS systems by default. For Windows, you can use Git Bash or WSL (Windows Subsystem for Linux).

## Setup Instructions

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
2. **Navigate to appsettings.json**:
   change credentials from database for your current database credentials
3. **Instal Entity Framework tools**:
    apply dotnet tool install --global dotnet-ef
4. **Restore .NET dependencies**:
    dotnet restore
5. **Apply database migrations**:
    dotnet ef migrations add InitialCreate
    dotnet ef database update
6. **Build the backend**:
    dotnet build

### Frontend Setup

1. **Navigate to the frontend directory:**
    cd frontend
2. **Install npm dependencies:**
    npm install
3. **Build the frontend:**
    npm run build

## Notes
    -Ensure MySQL is running on your system before starting the application.
    -If you encounter any issues with missing dependencies or version mismatches, ensure you are using the exact versions specified above.

## Additional Information
-For detailed documentation on .NET and EF Core, visit the official .NET documentation.
-For more information on Node.js and npm, visit the official Node.js documentation.
-For MySQL documentation, visit the official MySQL documentation.

Thank you for using this application!