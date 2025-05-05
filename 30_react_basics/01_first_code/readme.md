To start a React JSX project from scratch without using tools like Vite, Create React App, or any scaffolding tools, you'll need to set up everything manually — including Webpack and Babel.

Here’s a step-by-step guide:

# 1. Initialize your project

`npm init -y (in target folder)`

# 2. Install required dependencies

`npm install react react-dom`

# 3. Dev dependencies for Babel and Webpack

```
npm install -D webpack webpack-cli webpack-dev-server babel-loader \
@babel/core @babel/preset-env @babel/preset-react html-webpack-plugin
```

# 4. Set up your folder structure

my-react-app/
├── public/
│ └── index.html
├── src/
│ └── index.jsx
├── .babelrc
├── webpack.config.js
├── package.json

# 5. Create public/index.html

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

# 6. Create src/index.jsx

```
import React from "react";
import ReactDOM from "react-dom/client";

const App = () => <h1>Hello from React!</h1>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

# 7. Create .babelrc

```
{
"presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

# 8. Create webpack.config.js

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
entry: './src/index.jsx',
output: {
path: path.resolve(\_\_dirname, 'dist'),
filename: 'bundle.js',
clean: true,
},
module: {
rules: [
{
test: /\.jsx?$/,
exclude: /node_modules/,
use: 'babel-loader',
}
],
},
resolve: {
extensions: ['.js', '.jsx'],
},
plugins: [
new HtmlWebpackPlugin({
template: './public/index.html',
}),
],
devServer: {
static: './dist',
port: 3000,
open: true,
hot: true,
},
mode: 'development',
};
```

# 9. Add NPM scripts in package.json

```
"scripts": {
"start": "webpack serve",
"build": "webpack"
}
```

# 10. Run your project

```
npm start
```

Visit http://localhost:3000 — you should see “Hello from React!”
