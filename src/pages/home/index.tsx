import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

interface IPost {
  id: string | number;
  title: string;
}

export default function Home() {
  const [posts, setPost] = useState<IPost[]>();
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=10s")
      .then((res) => {
        setPost(res.data);
      });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && <div>filter : {query}</div>}

      {!posts ? (
        <div>Loading</div>
      ) : (
        posts.map((post: any) => (
          <div key={post.id}>
            <div>{post.title}</div>
            <Link to={`post/${post.id}`}>
              <Button>{post.id}</Button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
