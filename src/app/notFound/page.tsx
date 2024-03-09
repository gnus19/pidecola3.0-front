import Link from 'next/link';

export default function notFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 dark:bg-gray-800">
        <Link href={"/"}>
          <h1 className=" z-25 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-black text-blue-950 animate-fade-right drop-shadow-md">
              {"404 "}
          </h1>
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-yellow-400  to-orange-500 animate-pulse animate-duration-[2500ms]">
            {"Página no encontrada "}
          </span>
        </Link>
      </div>
    </>
  );
}
