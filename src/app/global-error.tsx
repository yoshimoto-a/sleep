"use client";
import { useEffect, useCallback } from "react";
import { useApi } from "./_hooks/useApi";
import { PostRequest } from "./_types/apiRequests/error/PostRequest";
import { PostResponse } from "./_types/apiRequests/error/PostResponse";
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const fetcher = useApi();
  const post = useCallback(async () => {
    try {
      console.log("post");
      const resp = await fetcher.post<PostRequest, PostResponse>("/api/error", {
        message: error.message,
      });
      console.log(resp);
    } catch (error) {
      console.error(error);
    }
  }, [fetcher, error]);
  useEffect(() => {
    if (!error) return;
    console.log(post);
    post();
  }, [error, post]);

  return (
    <html>
      <body>
        <h2>エラーが発生しました。</h2>
        <button onClick={() => reset()}>再実行</button>
        <div></div>
      </body>
    </html>
  );
}
