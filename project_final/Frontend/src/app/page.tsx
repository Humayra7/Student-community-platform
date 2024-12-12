import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to My Website</h1>
      <div>
        <Link href="/logintype">
          <button>Login</button>
        </Link>
        <Link href="/signup">
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
