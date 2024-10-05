# Next all you need --- Full Stack TypeScript Boilerplate 

<img src="./public/images/logo.png" alt="icon"/>

## Frontend - Next.js 14.x, TailwindCSS 3.4, Zustand 4.5
## Backend - Express 4.x, Prisma 5.18

🚀 This is a monoreop of full stack typeScript Boilerplate based on turborepo. It includes almost all you need of elements for making a web application. If you're looking for a full stack typeScript Boilerplate, then this repo is your needs. The repo includes frontend(admin) and backend(gateway). You can use them all together, or you can use only a part of them feel free.


## Features & Roadmap
Based on popular & excellent open source, for developers provided outstanding experience 

### Repo
- [x] A monorepo based on [Turborepo](https://turbo.build) 
- [x] Type checking [TypeScript](https://www.typescriptlang.org)
- [ ] CI/CD based on Github Actions
- [ ] gRPC
  
### Frontend
- [x] [Next.js](https://nextjs.org) with App Router support
- [x] Integrate with [Tailwind CSS](https://tailwindcss.com)
- [x] Use Daisyui [Daisyui](https://daisyui.com)
- [x] State management with [Zustand](https://zustand-demo.pmnd.rs/) 
- [x] Http Client with [Axios](https://axios-http.com/) 
- [x] Unit test with [Jest](https://jestjs.io/) + [testing-library](https://testing-library.com/)

### Backend
- [x] Node.js web application framework with [Express.js](https://expressjs.com/) 
- [x] ORM with [Prisma](https://www.prisma.io/)
- [x] xss protection with  [xxs-filters](https://github.com/YahooArchive/xss-filters)
- [x] data vulidator with [Joi](https://joi.dev/) 
- [x] logger middleware with [morgan](github.com/expressjs/morgan) + [winston](github.com/winstonjs/winston) 
- [x] Unit test with [Jest](https://jestjs.io/) + [supertest](github.com/ladjs/supertest)

### Project structure

```shell
.
├── README.md                    # README file
├── .github                      # GitHub folder
├── .vscode                      # VSCode configuration
├── public                       # Public assets folder
├── apps
│   ├── admin                       # Frontend admin
│   │   ├── __tests__                   # Unit tests
│   │   ├── src                         # src folder
│   │   │   ├── app                         # Next JS App (App Router)
│   │   │   ├── components                  # React components
│   │   │   ├── stores                      # Zustand stores
│   └── gateway                     # Backend
│   │   └──  __tests__                  # Unit tests
│   │   └──  prisam                     # prisma folder, include schema and migrations 
│   │   └──  src                        # src folder

```


### The repo refer to below repository, thanks to these excellent contributors

- [prisma-express-typescript-boilerplate](https://github.com/antonio-lazaro/prisma-express-typescript-boilerplate)
- [api-gateway](https://github.com/JanssenBrm/api-gateway)
- [admin-dashboard-nextjs-typescript-daisyui-template](https://github.com/robbins23/admin-dashboard-nextjs-typescript-daisyui-template)


### Contributions

Everyone is welcome to contribute to this project. Feel free to open an issue if you have any questions or find a bug. Totally open to suggestions and improvements.

### License

Licensed under the MIT License, Copyright © 2024