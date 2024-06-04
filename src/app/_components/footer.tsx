export const Footer = () => {
  return (
    <footer className="max-w-md w-full fixed bottom-0 w-full px-3 py-1 bg-custom-blue z-40">
      <p className="text-center text-sm">
        &copy; {new Date().getFullYear()} sleep
      </p>
    </footer>
  );
};
