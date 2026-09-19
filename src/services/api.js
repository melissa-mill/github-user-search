import { Octokit } from "octokit";

const octokit = new Octokit();

export const searchUser = async (username) => {
  const response = await octokit.request("GET /users/{username}", {
    username: username
  });

  return response;
};
