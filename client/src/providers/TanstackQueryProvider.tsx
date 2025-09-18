import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { toast } from "react-hot-toast";

export default function TanstackQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            console.error("A query failed globally:", error);
            toast.error(
              `데이터를 가져오는 중 오류가 발생했습니다: ${error.message}`
            );
          },
        }),

        defaultOptions: {
          mutations: {
            onError: (error: Error) => {
              console.error("A mutation failed:", error);
              toast.error("요청에 실패했습니다. 잠시 후 다시 시도해주세요.");
            },
          },
          queries: {
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
