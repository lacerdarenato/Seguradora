# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command, to install dependencies
2. Create a file .env on root and setup parameters like in .env.example
3. Setup database settings inside `data-source.ts` file (synchronize perigoso! :D)
4. Install [docker-compose](https://docs.docker.com/compose/install/)
5. Run `docker-compose up -d` to initialize database in a container
6. Run `npm start` command
