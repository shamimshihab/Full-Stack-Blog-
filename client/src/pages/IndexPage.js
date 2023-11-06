import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
  return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
}
