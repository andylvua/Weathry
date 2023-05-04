import Navigation from "./navigation/Navigation";

const Layout = ({ children }) => {
  return (
    <div className={"bg-black w-full h-full flex gap-3"}>
      <Navigation />
      <main className={"mt-3"}>{children}</main>
    </div>
  );
};

export default Layout;
