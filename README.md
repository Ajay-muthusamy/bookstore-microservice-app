# Bookstore Application using Microservices Architecture

## Overview
This project is a full-stack, cloud-deployed bookstore application built using the microservices architectural style. Each service is independently developed, containerized, and deployed. It leverages CI/CD pipelines for automation and scales efficiently.

## Architecture

![Architecture Diagram](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*KE0i3zbYbjYLl4agpWiXfQ.png)

## WorkFlow
![Workflow Diagram](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*uqXQ13hrJqzkVQzFw11hoA.png)
**Service Routing via Nginx:**
- `/` → React Frontend
- `/api/login/` → Login Service (Express.js)
- `/api/cart/` → Cart Service (Spring Boot)
- `/api/recommend/` → Recommendation Service (Flask)

## Tech Stack

### Frontend
- **React (Vite)**
- Axios for API communication
- Served through Nginx on port 80

### Backend Microservices

#### 1. Login Service (Express.js + MongoDB)
- Handles user authentication
- Uses MongoDB Atlas for persistence

#### 2. Cart Service (Spring Boot + PostgreSQL)
- Manages shopping cart functionality
- Persists data in PostgreSQL

#### 3. Recommendation Service (Flask + Python)
- Content-based book recommendation system
- Processes book metadata and returns similar books

## CI/CD Pipeline with Jenkins
- GitHub Webhook triggers Jenkins on every code push
- Jenkins pipeline builds Docker images and redeploys services using Docker Compose


## Deployment Steps on AWS EC2
- Install Docker, Docker Compose, Jenkins, and Nginx
- Open required ports: 22, 80, 3030, 7080, 5001
- Pull code and run via `docker-compose up -d`
- Connect MongoDB Atlas with EC2 IP whitelisted

## Lessons Learned
- Proper routing is crucial in microservices communication
- CORS issues are common but fixable with correct headers
- CI/CD automation speeds up development and deployment
- Nginx simplifies reverse proxy setup for multiple backend services
