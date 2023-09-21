import DashboardAdmin from "../../Components/Dashboard/DashboardAdmin"
import NavBar from "../../Components/Home/NavBar/NavBar";
import Footer from "../../Components/Home/Footer/Footer";

const Dashboard = () =>{
    return(
        <div>
            <NavBar></NavBar>
            <DashboardAdmin />
            <Footer></Footer>
        </div>
    )
}


export default Dashboard;