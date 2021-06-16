<p align="center">
  <h1 align="center">Show Split 🍿</h1>

  <p align="center">
    An e-commerce web app built on microservice architecture
    <br />
    <a href="https://documenter.getpostman.com/view/8816927/TzeWG7yi"><strong>Explore the API docs in postman »</strong></a>
    <br />
    <br />
  </p>
</p>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

![Show Split in action](https://i.imgur.com/O5D42qr.gif)

After learning basic monolithic backend development, I was looking for a course which would teach me how professional developers actually write backend code. After researching, I came across Stephen Grider's "Microservices with Node JS and React" course. Show Split is a small e-commerce web app I made while learning from the beforementioned course.

Here's what I learnt:
* Express backend with Typescript and two different database (MongoDB, Redis)
* Next.js (React) based frontend for Server-side Rendering
* Sharing events across the services using NATS-streaming
* Running the app in Docker containers via Kubernetes cluster

This project is no way finished and I will add more features and tools as I learn new languages, frameworks and databases. Read the roadmap below to know what I am going to implement next. 

### Built With

* [Typescript](https://www.typescriptlang.org/)
* [Next.js](https://nextjs.org/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Redis](https://redis.io/)
* [Docker](https://www.docker.com/)
* [Kubernetes](https://kubernetes.io/)
* [Skaffold](https://skaffold.dev/)
* [NATS Streaming](https://nats.io/)
* [Stripe](https://stripe.com/en-in)

## Getting Started

### Prerequisites

You will need Docker, Kubernetes, Skaffold and ingress-nginx installed to run the project. Also Node.js need to be installed locally to run the tests.

### Installation

1. Get an API Key at [Stripe](https://stripe.com/en-in)
2. Clone the repo
   ```sh
   git clone https://github.com/41x3n/ShowSplit.git
   ```
3. Create an organization in NPM and publish the common folder as a npm package and replace "@showsplit/common" across the project with your package name. Else any changes made to common folder (you need to push the changes to NPM) won't appear on other services as all the service depneds "@showsplit/common" for shared code in this repo.
4. Run the below command to set env variables
   ```sh
   kubectl create secret generic jwt-secret --from-literal JWT_KEY=<secret code>
   kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=<secret code>
   ```
5. Go to each folder containing Dockerfile (they are your services), build and push them to docker.
   ```sh
   docker build -t <docker username>/<folder name>
   docker push <docker username>/<folder name>
   ```
6. Replace image names in all the yaml files (skaffold file and the files inside infra folder) with your image names.
7. Run this command in root directory to start the project
   ```sh
   skaffold dev
   ```

## Roadmap

- [x] Auth, Tickets, Orders, Payment service with MongoDB
- [x] Expiration service with Redis
- [x] SSR with Next.js
- [x] API Documentation with Postman
- [ ] Updating the Next.js frontend with getServerSideProps
- [ ] More documentation with TSdoc
- [ ] Migrate to JetStream
- [ ] Services with Go and PostgreSQL

## Contact

Anindya Chowdhury - [@41x3n](https://twitter.com/41x3n) - anindya.chowdhury@protonmail.com
