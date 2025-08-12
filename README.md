# PANTO Health Backend Developer Technical Assessment

IoT Data Management System with RabbitMQ Integration using NestJS.

This project processes x-ray data from IoT devices via RabbitMQ, stores processed information in MongoDB, and exposes RESTful API endpoints for data retrieval and analysis.

---

## 📌 Features
- **RabbitMQ Module** for message queue integration
- **MongoDB + Mongoose** for data storage
- **Data Processing** to extract and calculate key metrics
- **Signals CRUD API** with optional filtering
- **Producer Application** to simulate IoT device data
- **Swagger API Documentation**
- **Unit Tests** for key services
- **Dockerized** MongoDB, RabbitMQ, and NestJS application for local development and deployment

---

## 🛠 Prerequisites
- [Node.js](https://nodejs.org/) >= 18 (only if running locally without Docker)
- [Docker](https://www.docker.com/)
- [NestJS CLI](https://docs.nestjs.com/cli/overview) (optional for development)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <https://github.com/trueMNOX/PANTOhealth.git>
cd PANTOhealth
```

### 2. Setup Environment
Copy `.env.example` to `.env` and configure values if needed:
```bash
cp .env.example .env
```

**Default Environment Variables:**
```env
RABBITMQ_DEFAULT_USER=guest
RABBITMQ_DEFAULT_PASS=guest
RABBITMQ_URL=amqp://guest:guest@localhost:5672

MONGO_INITDB_ROOT_USERNAME=mongo
MONGO_INITDB_ROOT_PASSWORD=changeme
MONGO_DB_NAME=panto
MONGO_URI=mongodb://mongo:changeme@localhost:27017/panto?authSource=admin
```

---

### 3. Run Infrastructure Only (MongoDB + RabbitMQ)
If you want to run only the databases and message queue via Docker (and start NestJS manually):
```bash
docker-compose up -d mongo rabbitmq
```
Then run the app locally:
```bash
npm install
npm run start:dev
```

---

### 4. Run the Entire System with Docker
To run **MongoDB**, **RabbitMQ**, and **NestJS** together via Docker Compose:
```bash
docker-compose up --build
```
This will start:
- **NestJS App** → http://localhost:3000
- **RabbitMQ Management UI** → http://localhost:15672
- **MongoDB** → mongodb://localhost:27017

Once running:
- Swagger API Docs → http://localhost:3000/api
- Producer Endpoint → http://localhost:3000/send

---

## 📡 API Endpoints

### Signals
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/signals` | Get all signals |
| GET    | `/signals/:id` | Get signal by ID |
| POST   | `/signals` | Create a new signal |
| PUT    | `/signals/:id` | Update a signal |
| DELETE | `/signals/:id` | Delete a signal |
| GET    | `/signals/filter?deviceId=xxx&from=timestamp&to=timestamp` | Filter signals |

---

### Producer
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/send` | Sends sample x-ray data to RabbitMQ |

---

## 📑 Swagger Documentation
Once the app is running, open:
```
http://localhost:3000/api
```

---

## 🧪 Running Tests
```bash
npm run test
```

---

## 📂 Project Structure
```
src/
├── app.module.ts
├── app.controller.ts
├── rabbitmq/
│   ├── rabbitmq.module.ts
│   ├── rabbitmq.service.ts
├── signals/
│   ├── signals.module.ts
│   ├── signals.service.ts
│   ├── signals.controller.ts
│   └── schemas/signal.schema.ts
├── producer/
│   ├── producer.module.ts
│   ├── producer.service.ts
│   └── sample-data.json
Dockerfile
docker-compose.yml
```

---

## 🐳 Docker Compose Services
```yaml
services:
  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - mongo
      - rabbitmq
```

---

## 📌 Notes
- Producer can be run as a separate app or as part of this project.
- Ensure RabbitMQ and MongoDB are running before starting the app.
- Optional bonus tasks implemented: Swagger, Docker setup, and Unit Testing.

---

## 👨‍💻 Author
Backend implementation by @trueMNOX // MehdiBeizavi.
