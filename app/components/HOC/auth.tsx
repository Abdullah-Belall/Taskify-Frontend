import { SERVER_COLLECTOR_REQ, PROFILE_SERVER_REQ } from "@/app/utils/requests-hub/server-requests";
import { redirect } from "next/navigation";

export default async function ProtectedComponent({ children }: { children: React.ReactNode }) {
  const response = await SERVER_COLLECTOR_REQ(PROFILE_SERVER_REQ);

  if (!response.done) {
    redirect("/log-in");
  }

  return <>{children}</>;
}
