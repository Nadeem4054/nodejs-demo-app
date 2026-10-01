# nodejs-demo-app: CI/CD Pipeline with GitHub Actions

A simple Node.js web app with a fully automated CI/CD pipeline. On every push to `main`, GitHub Actions runs the tests, builds a Docker image and pushes it to DockerHub.

## Tools Used

- **GitHub**: source code hosting
- **GitHub Actions**: CI/CD automation
- **Node.js**: application runtime
- **Docker**: containerization
- **DockerHub**: image registry

## Project Structure

```
nodejs-demo-app/
├── .github/workflows/main.yml   # CI/CD pipeline
├── test/app.test.js             # automated test
├── app.js                       # Node.js web server
├── package.json
├── Dockerfile
├── .dockerignore
└── screenshots/
```

## How the Pipeline Works

Trigger: every push to the `main` branch.

1. **Job 1: test**
   - Checkout code
   - Setup Node.js 20
   - Install dependencies (`npm install`)
   - Run tests (`npm test`)
2. **Job 2: build-and-push** (runs only if `test` passes, using `needs: test`)
   - Checkout code
   - Login to DockerHub using GitHub Secrets
   - Build the Docker image from the `Dockerfile`
   - Push the image to DockerHub

```
push to main -> test -> build image -> push to DockerHub
```

## Secrets Required

Added in: Repo Settings -> Secrets and variables -> Actions

| Secret | Description |
|---|---|
| `DOCKERHUB_USERNAME` | DockerHub username |
| `DOCKERHUB_TOKEN` | DockerHub access token (Read & Write) |

## Run Locally

```bash
npm install
npm test
npm start
```
Open http://localhost:3000

### With Docker

```bash
docker build -t nodejs-demo-app .
docker run -p 3000:3000 nodejs-demo-app
```

Or pull the image built by the pipeline:

```bash
docker pull nadeem599/nodejs-demo-app:latest
docker run -p 3000:3000 nadeem599/nodejs-demo-app:latest
```

## Screenshots

### GitHub Actions run
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/cbf293be-bf94-472b-84f0-b27b8363f1ee" />


### Image on DockerHub
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/bd0a7475-7e60-48ff-bcbf-e771e4e2efb5" />


### App output
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/296a9adf-2367-46d3-a64b-75dcae529d0d" />


## What I Learned

- What CI/CD is and how GitHub Actions works
- Jobs, steps and runners
- Securing credentials with GitHub Secrets
- Docker build and push workflow
- Debugging a failed pipeline (fixed an authentication error by correcting the DockerHub username and token)
