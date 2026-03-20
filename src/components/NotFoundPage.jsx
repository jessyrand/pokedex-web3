import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4 background">
      <h1 className="text-5xl font-bold text-red-700 font-mono">404 NotFound</h1>
      <h3 className="text-3xl font-bold font-name">Sorry, this page does not exist, please return home page.</h3>
      <div className="rounded-4xl">
        <img className="w-50 h-50" src="/sorry.png" alt="pokemon" />
      </div>
      <Link to="/" className="w-25 h-15 text-2xl text-center font-semibold rounded-2xl border-2 p-2 hover:bg-black 
      hover:text-white font-name duration-300">Home</Link>
    </div>
  )
}

