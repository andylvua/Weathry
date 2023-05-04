import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <div className={"bg-black w-full h-full flex gap-5"}>
      <Navigation />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
