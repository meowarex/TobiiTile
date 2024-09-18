# Accessible GUI

Accessible GUI is an Electron-based application designed to provide an accessible graphical user interface. This README provides instructions on how to set up, run, test, and build the application.

## Table of Contents

- [Accessible GUI](#accessible-gui)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running in Development Mode](#running-in-development-mode)
  - [Testing](#testing)
  - [Building the Electron App](#building-the-electron-app)
    - [Packaging the Application](#packaging-the-application)
    - [Distributing the Application](#distributing-the-application)
  - [Usage](#usage)
    - [Development Mode](#development-mode)
    - [Zoom Controls](#zoom-controls)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or later): [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/accessible-gui.git
   cd accessible-gui
   ```

2. **Install Dependencies**

   Install the necessary dependencies using npm:

   ```bash
   npm install
   ```

## Running in Development Mode

To run the application in development mode:

```bash
npm run start
```

This command will launch the Electron application. Any changes you make to the source files will require restarting the application.

## Testing

Currently, there are no automated tests set up for this project. To add tests, consider integrating a testing framework like [Jest](https://jestjs.io/) or [Mocha](https://mochajs.org/).

## Building the Electron App

### Packaging the Application

To package the Electron application for Linux using Electron Packager:

```bash
npm run package
```

This command uses [Electron Packager](https://github.com/electron/electron-packager) to package the app. The output will be in a directory named `AccessibleGUI-linux-x64` within your project folder.

**Note:** Ensure you have an `icon.png` file in the root directory for the application icon.

### Distributing the Application

For more advanced packaging and distribution using Electron Builder:

1. **Build with Electron Builder**

   ```bash
   npm run dist
   ```

   This command uses [Electron Builder](https://www.electron.build/) to create a distributable `AppImage` in the `dist` folder.

2. **Locate the Built Application**

   After running the above command, find the `AppImage` in the `dist` directory:

   ```bash
   cd dist
   ```

3. **Run the AppImage**

   Make the AppImage executable and run it:

   ```bash
   chmod +x AccessibleGUI-*.AppImage
   ./AccessibleGUI-*.AppImage
   ```

## Usage

### Development Mode

- **Start the App:**

  ```bash
  npm run start
  ```

- **Code Structure:**
  - **Main Process:** `main.js`
  - **Renderer Process:** Located in the `src` directory.
  - **Preload Scripts:** `preload.js`

### Zoom Controls

The application includes zoom controls integrated into the top bar, allowing you to adjust the browser's native zoom level.

- **Increase Zoom:** Click the `+` button.
- **Decrease Zoom:** Click the `-` button.
- **Current Zoom Level:** Displayed between the zoom buttons.

**Note:** Adjusting the zoom level may affect the layout. Ensure responsive design practices are followed to maintain usability.
