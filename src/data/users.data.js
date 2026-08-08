export const password = "secret_sauce";

export const users = {
  standard: {
    username: "standard_user",
    password,
    description: "Normal user for happy path and baseline regression testing"
  },
  lockedOut: {
    username: "locked_out_user",
    password,
    description: "Blocked user for negative login testing"
  },
  problem: {
    username: "problem_user",
    password,
    description: "User with intentional functional bugs"
  },
  performanceGlitch: {
    username: "performance_glitch_user",
    password,
    description: "User with intentional slow responses"
  },
  error: {
    username: "error_user",
    password,
    description: "User with intentional interaction errors"
  },
  visual: {
    username: "visual_user",
    password,
    description: "User with intentional visual/layout defects"
  },
  invalid: {
    username: "invalid_user",
    password: "invalid_password",
    description: "Invalid credentials for negative login testing"
  }
};

export const acceptedUsernames = [
  users.standard.username,
  users.lockedOut.username,
  users.problem.username,
  users.performanceGlitch.username,
  users.error.username,
  users.visual.username
];
