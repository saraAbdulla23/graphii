import axios from "axios";

const GRAPHQL_API = "https://learn.reboot01.com/api/graphql-engine/v1/graphql";

// Function to fetch user details
export async function retrieveUserDetails() {
  try {
    const userQuery = `query {
      user {
        id
        login
        email
        campus
        profile
        lastName
        firstName
        auditRatio
        totalUp
        totalDown
        timeline: transactions(
          where: {type: {_eq: "xp"}, _or: [{attrs: {_eq: {}}}, {attrs: {_has_key: "group"}}], _and: [{path: {_nlike: "%/piscine-js/%"}}, {path: {_nlike: "%/piscine-go/%"}}]}
        ) {
          amount
          createdAt
          path
        }
      }
    }`;

    const requestData = {
      query: userQuery,
    };

    const requestHeaders = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    // Fetch user data
    return axios
      .post(GRAPHQL_API, requestData, requestHeaders)
      .then((response) => response.data.data.user[0])
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
}

// Function to format bytes into a human-readable format
export function convertBytes(bytes, precision = 2) {
  if (bytes === 0) return "0 B";

  const sizeUnits = ["B", "kB", "MB"];
  const exponent = Math.floor(Math.log(bytes) / Math.log(1000));
  const sizeValue = (bytes / Math.pow(1000, exponent)).toFixed(precision);

  return `${sizeValue} ${sizeUnits[exponent]}`;
}

// Function to fetch user's current level
export async function retrieveUserLevel(username) {
  try {
    const levelQuery = `
    query UserLevel($login: String) {
      event_user(
        where: {
          userLogin: { _eq: $login }
          event: { path: { _eq: "/bahrain/bh-module" } }
        }
      ) {
        level
      }
    }`;

    const requestData = {
      query: levelQuery,
      variables: { login: username },
    };

    const requestHeaders = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(GRAPHQL_API, requestData, requestHeaders);
    return response.data.data.event_user[0].level;
  } catch (error) {
    console.error(error);
  }
}

// Function to fetch total XP from transactions
export async function retrieveXP() {
  const xpQuery = {
    query: `query {
      transaction_aggregate(
        where: {
          event: { path: { _eq: "/bahrain/bh-module" } }
          type: { _eq: "xp" }
        }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }
    }`,
  };

  const response = await axios.post(GRAPHQL_API, xpQuery, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  const xpData = response.data;
  console.log(xpData);
  return convertBytes(xpData.data.transaction_aggregate.aggregate.sum.amount, 2);
}
