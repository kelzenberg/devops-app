# DevOps App

**_The DevOps app to be deployed with [Infrastructure as Code (repo)](https://github.com/kelzenberg/devops-app-infra)._**

- [NodeJS](https://nodejs.org/) [TypeScript](https://www.typescriptlang.org) [ExpressJS](https://expressjs.com) backend server
- [PostgreSQL](https://www.postgresql.org) database with [Sequelize](https://sequelize.org) ORM and [Flyway](https://flywaydb.org/documentation/concepts/migrations.html) migrations
- [Dockerfile](https://docs.docker.com/engine/reference/builder) and [Compose](https://docs.docker.com/compose/compose-file) for containerization
- Using [GitHub Workflows](https://docs.github.com/en/actions/using-workflows) ([here](./.github/workflows)) and [self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners) ([here](https://github.com/kelzenberg/devops-app-infra)) for CI/CD.

## Develop the project

Run `yarn install` once to install dependencies.

- Start app in TS execution environment

  ```sh
  yarn dev
  ```

- Lint project

  ```sh
  yarn lint
  # or
  yarn lint:fix
  ```

- Format project

  ```sh
  yarn format
  ```

- Build project

  ```sh
  yarn compile # transpile TS in watch-mode
  # or
  yarn build # build deployable artefacts
  ```

- Run unit tests

  ```sh
  yarn test
  ```

- Create and start containers

  ```sh
  yarn up
  ```

- Clean artefacts
  ```sh
  yarn clean
  ```

**Note:** Branch protection for main/master branch is active and prevents direct pushes to it. Open a new pull request and merge/rebase the PR into the main/master branch.

## Backend API

### Public Routes

All "publicly" accessible routes (e.g. within K8s cluster).

- `GET /` Static served HTML page (Displaying all `Message` rows in the database)
- `GET /liveness` App-is-alive probe for Kubernetes (Express server running)
- `GET /readiness` App-is-ready probe for Kubernetes (Database connection established)

### Protected Routes

To access these routes, the request needs to authenticate with an `x-api-key` API key which value needs to match an environment variable in the app's environment starting with `API_KEY_*` .

For local development, run `cp .env.dist .env` and use/replace the `API_KEY_DEV` value in the `.env` file.

- `POST /message` Create a new `Message` (Stores it in the database)  
  Example JSON body:
  ```json
  {
    "author": "Dev-Ops Kenobi",
    "content": "Hello There!"
  }
  ```
- `GET /hello` When in need of a friendly British 👋
- `GET /fail` A on-purpose error-throwing endpoint for more chaos in life.

## CI / CD Workflows

### Continuous Integration Workflow ([ci.yml](./.github/workflows/ci.yml))

The continuous integration workflow to build (TypeScript) and unit-test (Jest) the app will be run if GitHub Actions recognizes...

- push on any branch
- pull request reopened

### Continuous Integration & Deployment Workflow ([ci-cd.yml](./.github/workflows/ci-cd.yml))

The continuous integration and deployment workflow to build, unit-test the app as well as build the container image and push it to the [ghcr.io](https://github.com/kelzenberg/devops-app/pkgs/container/devops-app) container registry will be run if GitHub Actions recognizes...

- a semver version tagged commit

To trigger a new deployment, simply tag a commit `git tag v*.*.*` with a semver version compatible tag e.g. `v1.33.7` and push the tag `git push --tags`.
