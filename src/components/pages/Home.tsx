import Header from "../../components/Header";
import Counter from "../../components/Counter";
import LoginForm from "../../components/LoginForm";

function Home() {
  return (
    <div>
      <Header />
      <h1>Home Page</h1>
      <Counter />
      <LoginForm />
    </div>
  );
}

export default Home;