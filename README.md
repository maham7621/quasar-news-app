# Quasar News App (quasar-project)

The Quasar News App is a simple web application that allows users to search for and view news articles using the [News API](https://newsapi.org/).

## Features

- Search for news articles by keyword.
- View a list of news articles with titles and descriptions.
- Click on the title of an article to view its details, including title, description, source, and publication date.
- Navigate between the home page and article details pages.
- Handle API errors gracefully and display user-friendly error messages.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your development machine.
- A free News API key. You can obtain one by signing up at [News API](https://newsapi.org/).

## Setup

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/quasar-news-app.git
   ```

## Install the dependencies

```bash
yarn
# or
npm install
```

## Create a .env file in the project root directory and add your News API key:

VUE_APP_NEWS_API_KEY=your_api_key_here

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
yarn dev
```

Open your browser and visit http://localhost:9000 to use the Quasar News App.

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

## Acknowledgments

- This app was created as a learning exercise using the Quasar framework.
- Thanks to the News API for providing access to news articles.
- Inspiration and guidance from online tutorials and the Quasar documentation.
