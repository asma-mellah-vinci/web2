import Footer from "./components/Footer";
import PageTitle from "./components/PageTitle";
import UserCard from "./components/UserCard";

const App = () => {
  const title = "Welcome to My App";

  const users = [
    {name : "Alice",   age  : 25},
    {name : "Bob"  ,   age  : 30},
    {name : "Charlie", age  : 35},
  ];

  const footerText = "© 2023 My App";

  return (
    <div>
     <PageTitle title={title} />

     {users.map((user,index) => (
      <UserCard key={index} name={user.name} age={user.age} />
     ))}


     <Footer footerText={footerText} />
    </div>
  );
};

export default App;
