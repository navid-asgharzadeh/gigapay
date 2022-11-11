## How to start the project without Docker

1. Run `yarn install` to install all dependencies
2. Run `yarn dev` to start the development server

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to start the project using Docker

> **Note:** Docker is required to run the project using Docker.
> It can be downloaded from [here](https://www.docker.com/products/docker-desktop).

> The command bellow will create a **production build** of the project and run it in a Docker container.

1. Run `docker-compose up` to start the development server
2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> **Note:** Alternatively you can take a look at the deployed version of the app [here](https://gigapay.vercel.app/) 🚀

## what would I do next?

- Add authentication for login and register
- Create a separate DB for development and production environment
- Add a better UI
- Add E2E tests
- Define different roles for users and give them proper access
- Add separate docker files for development and production environment
- Add form validation using `react-hook-form` and `zod`
