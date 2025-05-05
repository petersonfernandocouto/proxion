
import Login from "../app/login/page";
import BGIMG from "../app/IMG/BG.png";

export default function Home() {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center overflow-y-auto"
      style={{
        backgroundImage: `url(${BGIMG.src})`,
      }}
    >
      <Login />
    </div>
  );
}
