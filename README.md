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
- **Dockerized** MongoDB and RabbitMQ for local development

---

## 🛠 Prerequisites
- [Node.js](https://nodejs.org/) >= 18
- [Docker](https://www.docker.com/)
- [NestJS CLI](https://docs.nestjs.com/cli/overview)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd panto-health-backend
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

### 3. Start Infrastructure (MongoDB + RabbitMQ)
```bash
docker-compose up -d
```

Services:
- RabbitMQ Management UI → `http://localhost:15672` (default user/pass: guest/guest)
- MongoDB → `mongodb://localhost:27017`

---

### 4. Install Dependencies
```bash
npm install
```

---

### 5. Run the Application
```bash
npm run start:dev
```

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
```

---

## 📌 Notes
- Producer can be run as a separate app or as part of this project.
- Ensure RabbitMQ and MongoDB are running before starting the app.
- Optional bonus tasks implemented: Swagger, Docker setup, and Unit Testing.

---

## 👨‍💻 Author
Backend implementation by @trueMNOX /Mehdi Beizavi.
