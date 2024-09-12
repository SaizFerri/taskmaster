# TaskMaster

## Installation

1. Clone the repository
2. `cd` into the project
3. I used `pnpm` as my package manager, to install packages run `pnpm i`
4. Install packages in the mock server folder `cd server && pnpm i`
5. `cd ..` back into the root of the project
6. Create a `.env` file following the example of `.env.sample`

## Setup

The app can run in a few modes

- **Offline with no auth and local storage**

  For this, setup the env variables as follows:

```bash
VITE_APP_MODE=offline
VITE_STORAGE=local
```

In this mode, there is no authentication and the data is saved the in local storage. This is the easiest mode to get the app running.

- **Offline with no auth and mock server**

  For this, setup the env variables as follows:

```bash
VITE_APP_MODE=offline
VITE_STORAGE=server
```

In this mode, there is no authentication and the data is saved in a json file in `server/db.json`. For this mode to work properly, you need to open
a new terminal window and `cd` into `server`, then run `pnpm dev` so the mock server is running in the background.

- **Online with firebase auth**

  For this, setup the env variables as follows:

```bash
VITE_APP_MODE=online
VITE_STORAGE=server # or local ; As in the previous 2 modes, this variable just controls where the data is saved

# setup the firebase variables too
# ...
```

In this mode, there is firebase authentication. For this mode to work properly, you need to create a new firebase project
and get the project variables for web.

In the firebase project, enable authentication and activate the `Email/Password` provider.

## Running the app

After you chose a mode to run the app, run `pnpm dev` in the root of the project or if you want to run the production build, run `pnpm build` and then `pnpm preview`.

## Libraries

I wanted to go for a full component UI library like radix-ui or similar but found out too late that it was allowed. For this reason I built my UI components from the scratch with
`tailwind`, `focus-trap` and `vueuse`.

For validation I decided to go with `zod` as I'm very familiar with it and it is very minimal.

For dates I chose `date-fns` as it has quite some utilities to interact with dates.

## Design

I went for a task board instead of a task list as it made more sense for tasks that can change their status based on progress, like in trello or notion. The UI is very minimal and intuitive,
you can create tasks with the button in the top controls or directly in a specific status column.

The task stated to implement filtering by status, but with the board view it is not that useful as every column is already filtered by status.

When a task is created through the dialog, it can be edited through the dropdown menu on the task card. Editing the task opens the same form with the status select at the top and deleting opens a confirmation dialog.

## Technical architecture

I wanted to lift up the state as much as possible so the UI components like the board, cards or controls are free of any specific state logic. They just receive props and emit events. `Tasks.vue` is the
actual controller component that is connected to the tasks state and passes down the list of tasks. This allows for reusability of the board if we were to allow creating specific task lists.

Regarding the tasks pinia state, I used a service interface to create 2 different services for the 2 different modes. A local storage service and a remote service that communicates with the mock server
to demonstrate async fetching. This abstraction allows for the pinia state to work with 2 different sources of data.

A similar approach was chosen for the auth store. Depending on an env variable, we export a different store, either firebase or a noop store to allow using the app with no auth. This also allows for e2e testing without having to connect to a firebase project.

For the forms, I created my own simple composable (`useForm`) to handle the form state and errors. It creates the initial state from the `zod` schema and exposes some utility functions to interact with it.
This simplifies massively the handling of the forms.

## Extra features

- Auth with firebase
- Mock server
- Drag and drop to change the status of the tasks

## Testing

### Unit tests

I created a few unit tests for the critical parts and also for demonstration as I did not have much time left. Core parts such as `useForm` or the `LocalStorageTaskService` are covered by unit tests.

For the more complex UI components like forms and dialogs I went with storybook.

To run this tests, run `pnpm test:unit`

### Component tests

In storybook I added all the UI components and more complex components like forms.
The forms have interaction tests that check that the data that is emitted to the parent is actually the right shape.

To run this tests and see the storybook docs, run `pnpm storybook`

### E2E tests

For the critical flows of the app (in offline mode) I wrote some e2e tests in cypress. This cover adding, editing and removing a task.

To run this tests, make sure that you built the app previously with `pnpm build` and that your `.env` is set for `offline` and `local` mode. Then run `pnpm test:e2e`

## Things I would have liked to do but did not have the time

- Error handling with toasts (mostly for network errors)
- Visual testing with cypress to compare 2 screenshots of a rendered component to spot style differences
- E2E tests with a test firebase project to actually test login/registration
- More unit tests for components and more thorough storybook documentation
- A11Y tests with storybook
