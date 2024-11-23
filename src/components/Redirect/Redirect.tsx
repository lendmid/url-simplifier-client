import { useQuery } from "@tanstack/react-query";
import { createVisit, getUrl, getUserIp } from "../../supabase/requests";
import { useParams } from "react-router-dom";

const Redirect = () => {
  const { longUrl } = useParams<{longUrl: string}>();

  const { data } = useQuery({
    queryKey: ["url"],
    queryFn: async () => {
      const url = await getUrl(longUrl);
      const ip = await getUserIp()
      const origin = window.location.origin;
      await createVisit({ ip, origin, urlId: url.id })
      window.location.href = url.longUrl;
      return `Redirected to ${url.longUrl}`
    },
    staleTime: 60_000,
  });

  console.log("data: ", data)
  return null
}

export default Redirect;
