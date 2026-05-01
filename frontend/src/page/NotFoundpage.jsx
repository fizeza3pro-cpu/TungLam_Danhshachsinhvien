const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-cyan-50">
      <img src="404NF.jpg" alt="404 Not Found" />

      <a
        href="/"
        className="inline-block transition-opacity text-white font-bold mt-10 px-5 py-5 bg-amber-300 hover:bg-amber-400 rounded-2xl"
      >
        Quay về HomePage
      </a>
    </div>
  );
};
export default NotFoundPage;
