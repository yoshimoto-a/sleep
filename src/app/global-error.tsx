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
  console.log(error);
  const fetcher = useApi();
  const post = useCallback(async () => {
    try {
      await fetcher.post<PostRequest, PostResponse>("/api/error", {
        message: error.message,
      });
    } catch (error) {
      console.error(error);
    }
  }, [fetcher, error]);
  useEffect(() => {
    if (!error) return;
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
