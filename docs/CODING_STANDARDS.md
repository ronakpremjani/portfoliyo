# Coding Standards

## Language

JavaScript (ES Modules)

---

## Naming

PascalCase

Admin

Project

camelCase

createProject()

getProjects()

kebab-case

project.service.js

auth.controller.js

---

## API

GET /api/projects

POST /api/projects

PUT /api/projects/:id

DELETE /api/projects/:id

---

## Folder Structure

Feature Based

modules/

project/

auth/

contact/

---

## Error Handling

Use centralized error handling.

Never use try/catch inside routes.

Controllers call services.

Services contain business logic.

---

## Validation

Every POST and PUT request must be validated.

---

## Database

Never access MongoDB directly from controllers.

Always use services.

---

## Git

Commit messages

feat:

fix:

refactor:

docs:

style:

test: