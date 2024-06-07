import Image from "next/image";
import Dashboard from "./component/Dashboard.tsx/page";
import WeatherDashboard from './weather';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <WeatherDashboard/>
    </main>
  );
}
