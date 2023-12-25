import Header from "./Header";

const Main = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};
export default Main;
