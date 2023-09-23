import DashboardAdmin from "../../Components/Dashboard/DashboardAdmin"
import style from "../../Components/Dashboard/DashboardAdmin.module.css"

const Dashboard = () =>{
    return(
        <main className={style.main}>
            <DashboardAdmin className={style.dashboardContainer}/>
        </main>
    )
}


export default Dashboard;