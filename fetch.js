fs = require("fs");
const https = require("https");
process = require("process");
require("dotenv").config();

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const USE_GITHUB_DATA = process.env.USE_GITHUB_DATA;
const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME;

const PROFILE_FILE = "./public/profile.json";
const BLOGS_FILE = "./public/blogs.json";

const ERR = {
  noUserName:
    "Github Username is missing. Skipping GitHub fetch and using fallback data.",
  requestFailed:
    "GitHub request failed. Skipping GitHub fetch and using fallback data.",
  requestFailedMedium:
    "Medium request failed. Skipping Medium fetch and using fallback data."
};

function saveJson(filePath, payload, successMessage) {
  fs.writeFile(filePath, payload, function (err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(successMessage);
  });
}

function writeFallbackProfileData() {
  if (fs.existsSync(PROFILE_FILE)) {
    console.warn(
      "Keeping existing public/profile.json because fresh GitHub data could not be fetched."
    );
    return;
  }
  const fallbackProfile = JSON.stringify({
    data: {
      user: {
        id: "local-fallback-user",
        name: GITHUB_USERNAME || "",
        bio: "",
        avatarUrl: "",
        location: null,
        pinnedItems: {
          totalCount: 0,
          edges: []
        }
      }
    }
  });
  saveJson(PROFILE_FILE, fallbackProfile, "saved fallback file to public/profile.json");
}

function writeFallbackBlogsData() {
  if (fs.existsSync(BLOGS_FILE)) {
    console.warn(
      "Keeping existing public/blogs.json because fresh Medium data could not be fetched."
    );
    return;
  }
  const fallbackBlogs = JSON.stringify({items: []});
  saveJson(BLOGS_FILE, fallbackBlogs, "saved fallback file to public/blogs.json");
}

if (USE_GITHUB_DATA === "true") {
  if (!GITHUB_USERNAME) {
    console.warn(ERR.noUserName);
    writeFallbackProfileData();
  } else if (!GITHUB_TOKEN) {
    console.warn(
      "REACT_APP_GITHUB_TOKEN is missing. GitHub GraphQL requires auth, so fallback data will be used."
    );
    writeFallbackProfileData();
  } else {
    console.log(`Fetching profile data for ${GITHUB_USERNAME}`);
    var data = JSON.stringify({
      query: `
{
  user(login:"${GITHUB_USERNAME}") { 
    name
    bio
    avatarUrl
    location
    pinnedItems(first: 6, types: [REPOSITORY]) {
      totalCount
      edges {
          node {
            ... on Repository {
              name
              description
              forkCount
              stargazers {
                totalCount
              }
              url
              id
              diskUsage
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
}
`
    });
    const default_options = {
      hostname: "api.github.com",
      path: "/graphql",
      port: 443,
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "User-Agent": "Node"
      }
    };

    const req = https.request(default_options, res => {
      let responseData = "";

      console.log(`GitHub statusCode: ${res.statusCode}`);
      res.on("data", d => {
        responseData += d;
      });
      res.on("end", () => {
        if (res.statusCode !== 200) {
          console.warn(ERR.requestFailed);
          console.warn(`GitHub response: ${responseData}`);
          writeFallbackProfileData();
          return;
        }
        saveJson(PROFILE_FILE, responseData, "saved file to public/profile.json");
      });
    });

    req.on("error", error => {
      console.warn(`${ERR.requestFailed} ${String(error)}`);
      writeFallbackProfileData();
    });

    req.write(data);
    req.end();
  }
}

if (MEDIUM_USERNAME !== undefined && MEDIUM_USERNAME !== "") {
  console.log(`Fetching Medium blogs data for ${MEDIUM_USERNAME}`);
  const options = {
    hostname: "api.rss2json.com",
    path: `/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`,
    port: 443,
    method: "GET"
  };

  const req = https.request(options, res => {
    let mediumData = "";

    console.log(`Medium statusCode: ${res.statusCode}`);
    res.on("data", d => {
      mediumData += d;
    });
    res.on("end", () => {
      if (res.statusCode !== 200) {
        console.warn(ERR.requestFailedMedium);
        console.warn(`Medium response: ${mediumData}`);
        writeFallbackBlogsData();
        return;
      }
      saveJson(BLOGS_FILE, mediumData, "saved file to public/blogs.json");
    });
  });

  req.on("error", error => {
    console.warn(`${ERR.requestFailedMedium} ${String(error)}`);
    writeFallbackBlogsData();
  });

  req.end();
}
