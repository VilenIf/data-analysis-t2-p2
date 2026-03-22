// src/components/VerticalBarChart.js
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card, CardBody, CardHeader, CardTitle } from "@progress/kendo-react-layout";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function VerticalBarChart({ data }) {
    // Check if data exists
    if (!data || data.length === 0) {
        return (
            <Card
                style={{
                    height: "100%",
                    borderRadius: "var(--kendo-border-radius-xxxl)",
                    boxShadow: "var(--kendo-elevation-2, 0 4px 6px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.12))",
                    overflow: "hidden",
                    cursor: "default"
                }}
            >
                <CardHeader
                    style={{
                        background: "linear-gradient(135deg, #f35800 0%, #ff8b47 100%)",
                        color: "var(--kendo-on-primary, #ffffff)",
                        padding: "var(--kendo-spacing-4, 1rem)",
                        borderBottom: "none"
                    }}
                >
                    <CardTitle
                        style={{
                            margin: 0,
                            fontSize: "var(--kendo-font-size-xl, 1.75rem)",
                            fontWeight: "var(--kendo-font-weight-medium, 500)",
                            textTransform: "uppercase",
                            letterSpacing: "var(--kendo-letter-spacing-wide, 0.5px)"
                        }}
                    >
                        Monthly Statistics
                    </CardTitle>
                </CardHeader>
                <CardBody
                    style={{
                        padding: "var(--kendo-spacing-6, 1.5rem)",
                        background: "var(--kendo-app-surface, #ffffff)",
                        height: "400px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <p style={{ color: "var(--kendo-subtle, #666666)" }}>No data available</p>
                </CardBody>
            </Card>
        );
    }

    let labels = [];
    let totals = [];
    let averages = [];

    data.forEach(d => {
        labels.push(d.month);
        totals.push(d.total);
        averages.push(parseFloat(d.average));
    });

    const chartData = {
        labels,
        datasets: [
            {
                label: "Total Deliveries",
                data: totals,
                backgroundColor: 'rgba(243, 88, 0, 0.7)',
                borderColor: 'rgba(243, 88, 0, 1)',
                borderWidth: 2,
                borderRadius: 8,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
            },
            {
                label: "Average Deliveries per Day",
                data: averages,
                backgroundColor: 'rgba(62, 164, 78, 0.7)',
                borderColor: 'rgba(62, 164, 78, 1)',
                borderWidth: 2,
                borderRadius: 8,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 12,
                        weight: '500'
                    },
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    boxWidth: 10,
                    boxHeight: 10
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const value = context.raw;
                        if (context.dataset.label === 'Average Deliveries per Day') {
                            return `${label}: ${value.toFixed(1)} deliveries/day`;
                        }
                        return `${label}: ${value} deliveries`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Deliveries',
                    font: {
                        weight: 'bold',
                        size: 12
                    },
                    color: 'var(--kendo-subtle, #666666)'
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                    drawBorder: false,
                },
                ticks: {
                    font: {
                        size: 11
                    },
                    color: 'var(--kendo-subtle, #666666)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Month',
                    font: {
                        weight: 'bold',
                        size: 12
                    },
                    color: 'var(--kendo-subtle, #666666)'
                },
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 11,
                        weight: '500'
                    },
                    color: 'var(--kendo-on-app-surface, #272727)'
                }
            }
        },
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            }
        }
    };

    return (
        <Card
            style={{
                height: "100%",
                borderRadius: "var(--kendo-border-radius-xxxl)",
                boxShadow: "var(--kendo-elevation-2, 0 4px 6px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.12))",
                transition: "transform var(--kendo-duration-rapid, 200ms) var(--kendo-easing-standard, cubic-bezier(0.42, 0, 0.58, 1))",
                overflow: "hidden",
                cursor: "default"
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "var(--kendo-elevation-4, 0 8px 10px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.12))";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--kendo-elevation-2, 0 4px 6px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.12))";
            }}
        >
            <CardHeader
                style={{
                    background: "linear-gradient(135deg, #f35800 0%, #ff8b47 100%)",
                    color: "var(--kendo-on-primary, #ffffff)",
                    padding: "var(--kendo-spacing-4, 1rem) var(--kendo-spacing-4, 1rem)",
                    borderBottom: "none"
                }}
            >
                <CardTitle
                    style={{
                        margin: 0,
                        fontSize: "var(--kendo-font-size-xl, 1.75rem)",
                        fontWeight: "var(--kendo-font-weight-medium, 500)",
                        textTransform: "uppercase",
                        letterSpacing: "var(--kendo-letter-spacing-wide, 0.5px)"
                    }}
                >
                    Monthly Statistics
                </CardTitle>
            </CardHeader>

            <CardBody
                style={{
                    padding: "var(--kendo-spacing-2, 1.5rem)",
                    background: "var(--kendo-app-surface, #ffffff)",
                }}
            >
                <Bar options={options} data={chartData} />
            </CardBody>
        </Card>
    );
}