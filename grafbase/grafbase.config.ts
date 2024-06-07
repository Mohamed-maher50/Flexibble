import { graph, config, connector } from "@grafbase/sdk";
const g = graph.Standalone();
const mongodb = connector.MongoDB("MongoDB", {
  url: process.env.MONGODB_URL as string,
  apiKey: process.env.MONGODB_API_KEY as string,
  dataSource: process.env.MONGODB_SOURCE as string,
  database: "toDos",
});

const User = mongodb
  .model("User", {
    name: g.string().length({
      min: 2,
      max: 20,
    }),
    email: g.string().unique(),
    avatarUrl: g.url(),
    description: g.string().optional(),
    githubUrl: g.url().optional(),
    linkedinUrl: g.url().optional(),
    projects: g.ref("projects").list().optional(),
  })
  .collection("users");
console.log("work");
const project = mongodb
  .model("Project", {
    title: g.string().length({ min: 3 }),
    description: g.string(),
    image: g.url(),
    liveSiteUrl: g.url(),
    githubUrl: g.url(),
    category: g.string(),
    createdBy: g.ref("users"),
  })
  .collection("projects");
g.datasource(mongodb);

export default config({
  graph: g,
});
