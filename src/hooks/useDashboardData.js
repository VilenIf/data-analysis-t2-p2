// src/hooks/useDashboardData.js
import { useEffect, useState, useRef } from "react";
import { getDashboardData } from "../services/dashboardService";

export default function useDashboardData() {
    const [data, setData] = useState([]);
    const loaded = useRef(false); // Fix: use useRef to preserve value across renders

    useEffect(() => {
        if (loaded.current) return; // Fix: use .current

        const fetchData = async () => {
            try {
                const result = await getDashboardData();
                setData(result);
                loaded.current = true; // Fix: use .current
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);
    const finishedDeliveries = data.filter(d => d.actual_datetime)
    const _finishedDeliveries = finishedDeliveries.length
    const totalOrders = data.length;

    const onTimeDeliveries = data.filter(d => d.on_time_flag == 'True').length;

    const onTimeRate =
        _finishedDeliveries > 0
            ? ((onTimeDeliveries / _finishedDeliveries) * 100).toFixed(1)
            : 0;

    const avgDetention =
        finishedDeliveries.reduce((acc, d) => acc + d.detention_minutes, 0) /
        (_finishedDeliveries || 1);

    let delivered = 0, undelivered = 0;
    [delivered, undelivered] = pieChartData();

    const barChartData = verticalBarChartData();
    console.log(barChartData);

    function pieChartData() {
        let a = data.filter(d => d.actual_datetime).length
        let b = data.filter(d => !d.actual_datetime).length
        return [(a / totalOrders).toFixed(2), (b / totalOrders).toFixed(2)]
    }
    function verticalBarChartData() {
        const monthlyMap = new Map();
        const dailyMap = new Map();
        finishedDeliveries.forEach(delivery => {
            if (delivery.scheduled_datetime) {
                // Parse the scheduled_datetime
                const date = new Date(delivery.scheduled_datetime);
                const month = date.toLocaleString('default', { month: 'short' });
                const year = date.getFullYear();
                const monthYear = `${month} ${year}`;
                const dayKey = date.toISOString().split('T')[0]; // YYYY-MM-DD

                // Count deliveries per month
                if (monthlyMap.get(monthYear)) {
                    let arr = monthlyMap.get(monthYear)
                    arr.push(delivery);
                    monthlyMap.set(monthYear, arr);
                } else {
                    let arr = []
                    arr.push(delivery)
                    monthlyMap.set(monthYear, arr);
                }
            }
        });

        let result = [];
        monthlyMap.forEach((value, key) => {
            const [monthName, year] = key.split(' ');
            const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
            const totalDaysInMonth = new Date(parseInt(year), monthIndex + 1, 0).getDate();
            let sum = value.length;
            let average = (sum / totalDaysInMonth).toFixed(2);
            result.push({
                month: key,      // Store the month name as a property
                average: average,
                total: sum
            })
        })
        return result;

    }


    return {
        data,
        totalOrders,
        onTimeRate,
        avgDetention: avgDetention.toFixed(1),
        finishedDeliveries,
        delivered,
        undelivered,
        barChartData,
        ready: true,
    };
}