import { HomeTemplate } from "@/components/templates/HomeTemplate";
import { rooms } from "@/lib/data/rooms";

export default function HomePage() {
  return <HomeTemplate rooms={rooms} />;
}
