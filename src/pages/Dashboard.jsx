import { TileLayout, TileLayoutRepositionEvent } from "@progress/kendo-react-layout";
import { useState } from "react";
import useDashboardData from "../hooks/useDashboardData";
import TotalDeliveries from "../components/TotalDeliveries";
import OnTimeRate from "../components/OnTimeRate";
import FinishedDeliveries from '../components/FinishedDeliveries';
import AverageDetention from '../components/AverageDetention';
import PieChart from '../components/PieChart';
import VerticalBarChart from '../components/VerticalBarChart';

function Dashboard(data) {
    const dashboardData = useDashboardData();
    if (!dashboardData.ready) {
        return <div>Loading dashboard data...</div>;
    }

    // Make sure finishedDeliveries is a number, not an array
    const finishedCount = Array.isArray(dashboardData.finishedDeliveries) 
        ? dashboardData.finishedDeliveries.length 
        : dashboardData.finishedDeliveries;

    const tiles = [
        {
            defaultPosition: { col: 1, colSpan: 1, rowSpan: 1, order: 1 },
            item: <FinishedDeliveries value={finishedCount} />,
            style: { borderRadius: "var(--kendo-border-radius-xxxl)" }
        },
        {
            defaultPosition: { col: 2, colSpan: 1, rowSpan: 1, order: 1 },
            item: <TotalDeliveries value={dashboardData.totalOrders} />,
            style: { borderRadius: "var(--kendo-border-radius-xxxl)" }
        },
        {
            defaultPosition: { col: 3, colSpan: 1, rowSpan: 1, order: 1 },
            item: <OnTimeRate value={dashboardData.onTimeRate} />,
            style: { borderRadius: "var(--kendo-border-radius-xxxl)" }
        },
        {
            defaultPosition: { col: 4, colSpan: 1, rowSpan: 1, order: 1 },
            item: <AverageDetention value={dashboardData.avgDetention} />,
            style: { borderRadius: "var(--kendo-border-radius-xxxl)" }
        },
        {
            defaultPosition: { col: 1, colSpan: 2, rowSpan: 2, order: 5 },
            item: <PieChart delivered={dashboardData.delivered} undelivered={dashboardData.undelivered} />,
            style: { borderRadius: "var(--kendo-border-radius-xxxl)" }
        },
        {
            defaultPosition: { col: 3, colSpan: 2, rowSpan: 2, order: 6 },
            item: <VerticalBarChart data={dashboardData.barChartData} />,
            style: { borderRadius: "var(--kendo-border-radius-xxxl)" }
        },
    ];

    return (
        <div style={{ padding: "0px", maxWidth: "1400px", margin: "0 auto" }}>
            <h1 style={{ marginBottom: "24px", color: "#2d3748" }}>Dashboard</h1>
            <TileLayout
                columns={4}
                rowHeight={200}
                items={tiles}
            />
        </div>
    );
}

export default Dashboard;