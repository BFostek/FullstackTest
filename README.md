# Full Stack Test

## Introduction

The Fullstack Weather App is a weather application designed with a focus on optimizing OpenWeather API usage by implementing a caching mechanism with a local database. This strategic approach aims to enhance performance, reduce latency, and ensure a seamless user experience.

### Key Features:

- **OpenWeather API Integration:** Utilizes the OpenWeather API to fetch real-time weather data.

- **Local Database Caching:** Implements a local database to store and retrieve frequently accessed weather information, reducing reliance on the OpenWeather API for repetitive requests.

- **Frontend (Next.js):** The frontend, built with Next.js, provides a responsive and user-friendly interface for accessing weather details.

- **Backend (Nest.js):** The backend, powered by Nest.js, manages the integration with the OpenWeather API, handles caching in the local database, and serves data to the frontend.

- **City Autocomplete Dataset:** Utilizes a dataset of cities' names for autocomplete functionality in the frontend. The dataset is hosted on a MongoDB Atlas server. [Download Dataset](https://drive.google.com/file/d/1IMSnKybjmCt3rHL8L2jJzuB3kwNHrLeO/view?pli=1)


## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Development](#development)
- [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

### Installation

1. Clone the repository:

```bash
git clone [https://github.com/BFostek/fullstacktest](https://github.com/BFostek/fullstacktest)
```

2. Navigate to the project directory:

```bash
cd fullstacktest
```

3. Install dependencies:

```bash
npm install
```

## Configuration

### Frontend

In the `frontend/` directory, create a `.env.local` file and set the following environment variables:

```env
MONGO_URI=<your_mongo_uri>
NEXT_PUBLIC_API_URL=<your_api_url>
```

### Backend

In the `backend/` directory, create a `.env` file and set the following environment variables:

```env
DB_TYPE=postgres
DB_HOST=<your_host>
DB_PORT=<your_port>
DB_USERNAME=<your_username>
DB_PASSWORD=<your_password>
DB_DATABASE=<your_dbname>
OPEN_WEATHER_API_KEY=<your_open_weather_api_key>
```

## Development

To run the project in development mode, use the following commands:

### Frontend

```bash
npm run dev
```

### Backend

```bash
docker-compose up -d
npm run start:dev
```

## Troubleshooting

### Configuring SSL for AWS

If hosting in an AWS environment, you may need to configure SSL. Follow these steps:

1. Open `backend/typeOrm.config.ts` and configure SSL with your Certificate Authority (CA):

   ```typescript
   import { ConnectionOptions } from 'typeorm';

   const connectionOptions: ConnectionOptions = {
     // existing configurations...
     ssl: {
       ca: '<path_to_your_ca_file>',
     },
   };

   export = connectionOptions;
   ```

2. Open `backend/src/app.module.ts` and ensure SSL is configured:

   ```typescript
   import { Module } from '@nestjs/common';
   import { AppController } from './app.controller';
   import { AppService } from './app.service';
   import { TypeOrmModule } from '@nestjs/typeorm';
   import * as config from './typeOrm.config';

   @Module({
     imports: [
       TypeOrmModule.forRoot({
   ...
   ssl: {
       ca: '<path_to_your_ca_file>',
     },
   }),
       // other modules...
     ],
     controllers: [AppController],
     providers: [AppService],
   })
   export class AppModule {}
   ```

Make sure to replace `<path_to_your_ca_file>` with the actual path to your CA file.
