# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js 20 LTS- [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker Desktop - [Download & Install Docker Desktop](https://www.docker.com/products/docker-desktop/)

### BEFORE GET STARTED: PLEASE, CLEAN THE DOCKER FILES (IMAGES, CONTAINERS, VOLUMES, ETC)

## Downloading

```bash
# clone using ssh or by another way
git clone git@github.com:h3nnessey/nodejs2024Q1-service.git

# change dir to the repo
cd nodejs2024Q1-service

# checkout dev branch
git checkout dev
```

## Installing NPM modules

```bash
npm install
```

## Setting up env

- create `.env` file based on `.env.example` or just rename it (take care about comment nearby `DATABASE_HOST`)

## Run Docker Desktop and Sign In (for docker scout purposes)

```bash
# can also sign in by this command (still need to run Docker Desktop)
docker login
```

## Running application

```bash
# detached mod
docker compose up -d

# view active containers
docker ps

# view builded images (rest-service is less than 500 MB)
docker images

# create tables in postgresql based on initial migrations and app is ready to work now
npm run start docker:migration:migrate
```

## Logs

```bash
# view logs directory information

# output example where 51241, 18688, 31878 file size in bytes

# 52 -rw-r--r-- 1 h3nnessey 197121 51241 Apr  1 19:55 1711983304505_common-logs.txt
# 20 -rw-r--r-- 1 h3nnessey 197121 18688 Apr  1 19:55 common-logs.current.txt
# 32 -rw-r--r-- 1 h3nnessey 197121 31878 Apr  1 19:55 error-logs.current.txt
npm run docker:logs

# read specified log file (replace <filename> with filename of log file)
npm run docker:logs:read ./logs/<filename>
```

## Docker scout (vulnerability check)

```bash
# check entire app including database on vulnerabilities
npm run docker:scout
```

## Testing

```bash
# To run auth tests
npm run test:auth

# To run only one of all test suites
npm run test -- <path to suite>
```

### Auto-fix and format

```bash
# ESlint
npm run lint

# prettier
npm run format

```
