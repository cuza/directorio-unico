

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import OrdersOverview from "./components/OrdersOverview";
// Dashboard components
import Tabs from "../../components/Tabs/Tabs"
import React,{useState, useEffect} from "react";
function Dashboard() {
 
  const [data, setData] = useState([]);

  async function fetchData() {
    const response = await fetch("coincidences/totales");
    setData(await response.json());
    const dato = await response.json();

    console.log(dato);
  }
  useEffect(() => {
    fetchData();
  }, []);
  const [chartbar, setCharbar] = useState([]);
  useEffect(() => {
    async function fetchDato() {
      const response = await fetch("coincidences/totales_modalidad");
      const dato = await response.json();
      setCharbar(dato);
    }
    fetchDato();
  }, []);

  const datchart = {
    labels: ["E-D", "C-E", "C-D", "CC-D", "CC-E"],
    datasets: {
      label: "Total",
      data: [
        chartbar.length >= 1 ? chartbar[1].cantidad : "0",
        chartbar.length >= 1 ? chartbar[0].cantidad : "0",
        chartbar.length >= 1 ? chartbar[2].cantidad : "0",
        chartbar.length >= 1 ? chartbar[3].cantidad : "0",
        chartbar.length >= 1 ? chartbar[4].cantidad : "0",
      ],
    },
  };

  const [linebar, setLinebar] = useState([]);
  useEffect(() => {
    async function fetchDato1() {
      const response = await fetch("coincidences/totales_situacion");
      const dato = await response.json();
      setLinebar(dato);
    }
    fetchDato1();
  }, []);
  const line = {
    labels: ["In", "Pr", "Re", "Tr", "Re", "Con", "N-P"],
    datasets: {
      label: "Total",
      data: [
        linebar.length >= 1 ? linebar[1].cantidad : "0",
        linebar.length >= 1 ? linebar[0].cantidad : "0",
        linebar.length >= 1 ? linebar[3].cantidad : "0",
        linebar.length >= 1 ? linebar[6].cantidad : "0",
        linebar.length >= 1 ? linebar[4].cantidad : "0",
        linebar.length >= 1 ? linebar[9].cantidad : "0",
        linebar.length >= 1 ? linebar[5].cantidad : "0",
      ],
    },
  };

  const line2 = {
    labels: ["Danger", "Warning", "Info", "Safe"],
    datasets: {
      label: "Desktop apps",
      data: [
        data.length >= 1 ? data[0].num_danger_totales : "0",
        data.length >= 1 ? data[0].num_warn_totales : "0",
        data.length >= 1 ? data[0].num_info_totales : "0",
        data.length >= 1 ? data[0].num_safe_totales : "0",
      ],
    },
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="error"
                title="Danger"
                count={data.length >= 1 ? data[0].num_danger_totales : "0"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Estudiantes con Prioridad Alta",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
              color="warning"
                icon="warning"
                title="Warning"
                count={data.length >= 1 ? data[0].num_warn_totales : "0"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Estudiantes con Prioridad Media",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="info"
                title="Info"
                count={data.length >= 1 ? data[0].num_info_totales : "0"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Estudiantes con Prioridad Baja",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="person"
                title="Safe"
                count={data.length >= 1 ? data[0].num_safe_totales : "0"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Informativo",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Modalidades de Estudio"
                  description=""
                  date="Informacion actualizada"
                  chart={datchart}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Situacion academica"
                  date="Informacion actualizada"
                  chart={line}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Coincidencias"
                  date="Informacion actualizada"
                  chart={line2}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Tabs />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
