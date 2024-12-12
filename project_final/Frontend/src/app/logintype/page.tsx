import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-8">Choose an Option:</h1>
            <div className="mt-8">
                <Link href="/adminlogin">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Admin</button>
                </Link>
                <Link href="/userlogin">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">User</button>
                </Link>
            </div>
        </div>
    );
}
