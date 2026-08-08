# SauceDemo UI Automation

UI automation framework for [SauceDemo](https://www.saucedemo.com/) using Playwright, JavaScript, Page Object Model, tagged test suites, and GitHub Actions CI/CD.

This repository covers an end-to-end QA automation workflow: test case design, automation candidate selection, POM implementation, tagged execution, test reporting, and CI execution.

## Coverage Summary

- 84 automated Playwright tests
- Test case source: `SauceDemo_UI_Test_Cases.xlsx`
- Automated scope is based on test cases marked `Automation Candidate = Yes`
- Coverage includes positive, negative, and edge cases
- Main areas covered:
  - Login and authentication validation
  - Inventory product listing, sorting, add/remove cart behavior
  - Product detail page behavior
  - Cart validation and cart persistence
  - Checkout information validation
  - Checkout overview totals, payment, shipping, and finish flow
  - Checkout complete confirmation
  - Navigation menu, logout, reset app state, and protected page access
  - User type behavior for standard, locked out, problem, and performance glitch users
  - End-to-end order flows across multiple pages

## Tech Stack

- Playwright Test
- JavaScript ES Modules
- Page Object Model
- Playwright fixtures
- GitHub Actions
- Playwright HTML report

## Project Structure

```text
.
+-- .github/workflows/playwright.yml
+-- SauceDemo_UI_Test_Cases.xlsx
+-- playwright.config.js
+-- package.json
+-- src
|   +-- data
|   +-- fixtures
|   +-- pages
|   +-- tests
|   +-- utils
+-- README.md
```

## Test Design

The test case workbook is the source of truth. Each automated test maps back to a test case ID from `SauceDemo_UI_Test_Cases.xlsx`.

Test titles follow this convention:

```text
<tag(s)> <test case id> <scenario title>
```

Example:

```text
@smoke @regression SD-UI-TC-001 valid standard user can log in successfully
```

## Test Tags

Only these execution tags are used:

- `@smoke` - critical happy path checks for fast feedback
- `@sanity` - focused checks for important validation and navigation behavior
- `@regression` - complete automated coverage from the automation candidate list

Every automated test is included in `@regression`.

## Setup

Install dependencies:

```bash
npm install
```

Install Playwright browser binaries:

```bash
npx playwright install
```

Optional environment setup:

```bash
cp .env.example .env
```

The default target is:

```text
https://www.saucedemo.com/
```

You can override it with `BASE_URL`.

## Run Tests

Run all tests:

```bash
npm test
```

Run smoke tests:

```bash
npm run test:smoke
```

Run sanity tests:

```bash
npm run test:sanity
```

Run regression tests:

```bash
npm run test:regression
```

Run the CI suite locally:

```bash
npm run test:ci
```

Run headed mode for debugging:

```bash
npm run test:headed
```

## Test Report

This project uses Playwright HTML report because it provides screenshots, videos, traces, failures, timing, and test details in one place.

After running tests locally, open the HTML report:

```bash
npm run report
```

Report output:

```text
playwright-report/
```

This folder is not committed because it is a generated artifact. In GitHub Actions, it is uploaded as a workflow artifact.

## CI/CD

GitHub Actions workflow:

```text
.github/workflows/playwright.yml
```

The workflow runs on:

- Push to `main` or `master`
- Pull request to `main` or `master`
- Manual dispatch from GitHub Actions

Default push and pull request execution runs the smoke suite for fast feedback:

```bash
npm run test:ci
```

Manual dispatch supports:

- `smoke`
- `sanity`
- `regression`
- `all`

CI artifacts:

- `playwright-html-report`

## Page Object Model

Page objects are stored in `src/pages/`.

The framework keeps locators and page actions together per page. This makes handover easier because each page file contains the selectors and behavior for that page in one maintainable place.

Shared test setup is handled through `src/fixtures/pages.fixture.js`, so test files can focus on scenario intent instead of repeated page object construction.

Test flow is intentionally written directly inside each spec case. This keeps the preconditions, actions, and validations visible for QA review and manual test case traceability.
