const fs = require("fs");
require("dotenv").config();

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const USE_GITHUB_DATA = process.env.USE_GITHUB_DATA;
const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME;

const PROFILE_FILE = "./public/profile.json";
const BLOGS_FILE = "./public/blogs.json";
const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

const LANGUAGE_COLORS = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  "C++": "#f34b7d",
  "C#": "#178600",
  PHP: "#4F5D95",
  Ruby: "#701516",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Dockerfile: "#384d54"
};

const ERR = {
  noUserName:
    "Github Username is missing. Skipping GitHub fetch and using fallback data.",
  requestFailed:
    "GitHub request failed. Skipping GitHub fetch and using fallback data.",
  requestFailedMedium:
    "Medium request failed. Skipping Medium fetch and using fallback data."
};

function saveJson(filePath, payload, successMessage) {
  const content =
    typeof payload === "string" ? payload : JSON.stringify(payload, null, 2);
  fs.writeFileSync(filePath, content);
  console.log(successMessage);
}

function sortEdgesByCreatedAt(edges) {
  return [...edges].sort((a, b) => {
    const aDate = new Date(a?.node?.createdAt || 0).getTime();
    const bDate = new Date(b?.node?.createdAt || 0).getTime();
    return bDate - aDate;
  });
}

function buildProfilePayload(user, edges) {
  return {
    data: {
      user: {
        id: String(user.id || "local-fallback-user"),
        name: user.name || GITHUB_USERNAME || "",
        bio: user.bio || "",
        avatarUrl: user.avatarUrl || user.avatar_url || "",
        location: user.location || null,
        pinnedItems: {
          totalCount: edges.length,
          edges
        }
      }
    }
  };
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeRestRepo(repo) {
  const languageName = repo.language || null;
  const languageColor = languageName
    ? LANGUAGE_COLORS[languageName] || "#586069"
    : null;
  return {
    node: {
      id: `rest-${repo.id}`,
      name: repo.name,
      description: repo.description,
      forkCount: repo.forks_count,
      stargazers: {
        totalCount: repo.stargazers_count
      },
      url: repo.html_url,
      diskUsage: repo.size,
      createdAt: repo.created_at,
      primaryLanguage: languageName
        ? {
            name: languageName,
            color: languageColor
          }
        : null
    }
  };
}

function writeFallbackProfileData() {
  if (fs.existsSync(PROFILE_FILE)) {
    console.warn(
      "Keeping existing public/profile.json because fresh GitHub data could not be fetched."
    );
    return;
  }
  const fallbackProfile = buildProfilePayload(
    {
      id: "local-fallback-user",
      name: GITHUB_USERNAME || "",
      bio: "",
      avatarUrl: "",
      location: null
    },
    []
  );
  saveJson(
    PROFILE_FILE,
    fallbackProfile,
    "saved fallback file to public/profile.json"
  );
}

function writeFallbackBlogsData() {
  if (fs.existsSync(BLOGS_FILE)) {
    console.warn(
      "Keeping existing public/blogs.json because fresh Medium data could not be fetched."
    );
    return;
  }
  saveJson(BLOGS_FILE, {items: []}, "saved fallback file to public/blogs.json");
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const raw = await response.text();
  let data = null;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    data = null;
  }
  return {
    ok: response.ok,
    status: response.status,
    data,
    raw
  };
}

async function fetchPinnedReposViaGraphql() {
  const query = `
{
  user(login:"${GITHUB_USERNAME}") {
    id
    name
    bio
    avatarUrl
    location
    pinnedItems(first: 6, types: [REPOSITORY]) {
      totalCount
      edges {
        node {
          ... on Repository {
            id
            name
            description
            forkCount
            stargazers {
              totalCount
            }
            url
            diskUsage
            createdAt
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
}`;
  const result = await fetchJson(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "Node"
    },
    body: JSON.stringify({query})
  });
  if (!result.ok) {
    throw new Error(`GraphQL status ${result.status}: ${result.raw}`);
  }
  if (result.data && result.data.errors && result.data.errors.length > 0) {
    throw new Error(result.data.errors[0].message);
  }
  const user = result.data?.data?.user;
  if (!user) {
    throw new Error("No user payload found in GraphQL response.");
  }
  const edges = sortEdgesByCreatedAt(user.pinnedItems?.edges || []);
  return buildProfilePayload(user, edges);
}

async function fetchPinnedRepoNamesFromProfilePage() {
  const profileResult = await fetchJson(`https://github.com/${GITHUB_USERNAME}`);
  if (!profileResult.ok) {
    throw new Error(
      `Profile page status ${profileResult.status}: ${profileResult.raw}`
    );
  }
  const html = profileResult.raw;
  const escapedUser = escapeRegExp(GITHUB_USERNAME);
  const itemRegex =
    /<li[^>]*class=\"[^\"]*js-pinned-item-list-item[^\"]*\"[\s\S]*?<\/li>/g;
  const repoLinkRegex = new RegExp(`href="/${escapedUser}/([^"/?#]+)"`);
  const items = html.match(itemRegex) || [];
  const names = [];
  for (const item of items) {
    const match = item.match(repoLinkRegex);
    if (match && match[1]) {
      names.push(match[1]);
    }
  }
  return [...new Set(names)];
}

async function fetchPinnedReposViaPublicApi() {
  const userResult = await fetchJson(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
  if (!userResult.ok) {
    throw new Error(`User endpoint status ${userResult.status}: ${userResult.raw}`);
  }

  const pinnedNames = await fetchPinnedRepoNamesFromProfilePage();
  if (pinnedNames.length === 0) {
    throw new Error("No pinned public repositories found on GitHub profile page.");
  }

  const repoResults = await Promise.all(
    pinnedNames.map(name =>
      fetchJson(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${name}`)
    )
  );
  const repos = repoResults
    .filter(result => result.ok && result.data)
    .map(result => result.data);

  if (repos.length === 0) {
    throw new Error("Pinned repos were detected but repo details could not be fetched.");
  }

  const edges = sortEdgesByCreatedAt(repos.map(normalizeRestRepo));
  return buildProfilePayload(userResult.data, edges);
}

async function writeGithubProfileData() {
  if (USE_GITHUB_DATA !== "true") {
    return;
  }
  if (!GITHUB_USERNAME) {
    console.warn(ERR.noUserName);
    writeFallbackProfileData();
    return;
  }

  try {
    if (GITHUB_TOKEN) {
      console.log(`Fetching pinned profile data for ${GITHUB_USERNAME}`);
      const pinnedPayload = await fetchPinnedReposViaGraphql();
      saveJson(PROFILE_FILE, pinnedPayload, "saved file to public/profile.json");
      return;
    }
    console.warn(
      "REACT_APP_GITHUB_TOKEN is missing. Falling back to pinned public repositories."
    );
  } catch (error) {
    console.warn(`${ERR.requestFailed} ${String(error)}`);
    console.warn("Falling back to pinned public repositories.");
  }

  try {
    console.log(`Fetching pinned public repositories for ${GITHUB_USERNAME}`);
    const latestReposPayload = await fetchPinnedReposViaPublicApi();
    saveJson(
      PROFILE_FILE,
      latestReposPayload,
      "saved file to public/profile.json (pinned public repositories)"
    );
  } catch (error) {
    console.warn(`${ERR.requestFailed} ${String(error)}`);
    writeFallbackProfileData();
  }
}

async function writeMediumBlogsData() {
  if (MEDIUM_USERNAME === undefined || MEDIUM_USERNAME === "") {
    return;
  }
  try {
    console.log(`Fetching Medium blogs data for ${MEDIUM_USERNAME}`);
    const result = await fetchJson(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`
    );
    if (!result.ok) {
      throw new Error(`Medium status ${result.status}: ${result.raw}`);
    }
    saveJson(BLOGS_FILE, result.data, "saved file to public/blogs.json");
  } catch (error) {
    console.warn(`${ERR.requestFailedMedium} ${String(error)}`);
    writeFallbackBlogsData();
  }
}

(async () => {
  await writeGithubProfileData();
  await writeMediumBlogsData();
})();
