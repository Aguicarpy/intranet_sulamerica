import Content from "../../Components/Home/Content/Content";
import Footer from "../../Components/Home/Footer/Footer";
import NavBar from "../../Components/Home/NavBar/NavBar";


const Home = () => {
    return(
        <div>
            <header>
                <NavBar />
            </header>
            <main>
                <Content />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Home;