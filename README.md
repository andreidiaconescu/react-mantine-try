# Mantine Vite template

## Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Vitest](https://vitest.dev/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

## npm scripts

## Build and dev scripts

- `dev` – start development server
- `build` – build production version of the app
- `preview` – locally preview production build

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `vitest` – runs vitest tests
- `vitest:watch` – starts vitest watch
- `test` – runs `vitest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier

## Demo basic Citizen create profile

1. start up the API: `make start`
2. start up the frontend app if necessary
3. Access in browser the url (EXAMPLE): http://localhost:5173/citizen/create-profile/initial-carousel?registerEmail=diaconescu.stefanandrei@gmail.com&initialOperatorId=65ef22bd01fcf503bb27d121
4. follow the steps which will store in the react context the preferences selected in the interface, and also the initial email from url and the culturalOperatorId from url;
5. on the url http://localhost:5173/citizen/create-profile/choose-email, when submitting the citizen is created and it's preferences are saved, but the account is not yet active
6. on the page http://localhost:5173/citizen/create-profile/share-profile-with-operator the user has possibility to give access to it's account to the cultural operator whose id was received in the url initially for example: initialOperatorId=65ef22bd01fcf503bb27d121;
   1. here is something a bit special: the mutation the add the culturalOperator to the citizen account is done without the user being autherticated, because he cannot do this yet because his account is not activated yet; so the mutation uses the activationCode to identify the user;
7. on the next step http://localhost:5173/citizen/create-profile/activate-account-email-sent the user sees his info that an email to activate his account was sent; in this email there is a link that goes to the React app (http://localhost:5173/citizen/create-profile/activate-citizen?citizenEmail=diaconescu.stefanandrei@gmail.com&citizenActivationCode=29ce3c9b).
   1. the component that responds to that url calls the mutation to activate the the citizen, and then should redirect to http://localhost:5173/citizen/create-profile/success
