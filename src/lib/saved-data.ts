import type { SavedJob, SavedPost } from "../types/index.js";
import { jobs } from "./jobs-data.js";
import { posts, users } from "./data.js";

// Saved Jobs (references to existing jobs)
export const savedJobs: SavedJob[] = [
  {
    id: "saved-1",
    job: jobs[0], // Senior Product Designer at TechFlow Solutions
    savedDate: "2 days ago",
  },
  {
    id: "saved-2",
    job: jobs[1], // Lead UX Researcher at Global Connect
    savedDate: "5 days ago",
  },
  {
    id: "saved-3",
    job: jobs[2], // Interaction Designer at Designhaus
    savedDate: "1 week ago",
  },
  {
    id: "saved-4",
    job: jobs[3], // Visual Designer at WealthWise Fintech
    savedDate: "2 weeks ago",
  },
];

// Saved Posts (references to existing posts with authors)
export const savedPosts: SavedPost[] = [
  {
    id: "saved-post-1",
    post: {
      post: posts[0],
      author: users[0],
    },
    savedDate: "3 days ago",
  },
  {
    id: "saved-post-2",
    post: {
      post: posts[1],
      author: users[1],
    },
    savedDate: "1 week ago",
  },
];
