"use client";
import Link from "next/link";
import { useEffect, useCallback } from "react";
import { Button } from "./_components/Button";
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
      <body className="h-screen flex flex-col justify-center items-center bg-blue-200 text-gray-800">
        <h2 className="text-center">エラーが発生しました。</h2>
        <div className="h-10 w-32 flex justify-center">
          <Button onClick={() => reset()} variant="contained-blu500">
            再実行
          </Button>
        </div>
        <div className="mt-5">
          <p>
            再実行しても解消しない場合、しばらく経ってから再度ログインしてください。
            <br />
            それでも解決しない場合は、お問い合わせください。
            <br />
            お問い合わせは
            <Link href="https://www.instagram.com/sleep_app_info?igsh=enp1ZnprOThtbXFp&utm_source=qr">
              InstagramのDMから
            </Link>
            お願いいたします。
          </p>
        </div>
      </body>
    </html>
  );
}
