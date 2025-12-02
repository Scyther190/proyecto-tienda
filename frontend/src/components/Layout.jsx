import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className="container my-4">
                {children}
            </main>
            <Footer />
        </>
    );
}
export default Layout;