import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>This is the home Page of this website</h1>
      <NavLink to='/admin'>Go to admin panel</NavLink>
    </div>
  );
};

export default HomePage;
