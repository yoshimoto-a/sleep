export const IsLoading = () => {
  return (
    <div className="h-screen relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="animate-pulse inline-flex items-center space-x-2 flex-shrink-0 mr-4"
          aria-hidden="true"
        >
          <span className="h-2.5 w-2.5 bg-gray-500 rounded-full dark:bg-gray-300" />
          <span className="h-2.5 w-2.5 bg-gray-500 rounded-full dark:bg-gray-300" />
          <span className="h-2.5 w-2.5 bg-gray-500 rounded-full dark:bg-gray-300" />
        </div>
        {/* <p className="text-gray-500 dark:text-gray-300">読み込んでいます</p> */}
      </div>
    </div>
  );
};
