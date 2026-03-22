import { Card, CardBody, CardHeader, CardTitle } from "@progress/kendo-react-layout";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ delivered, undelivered }) {
    // Use the percentages directly
    delivered = (delivered || 0) * 100;
    undelivered = (undelivered || 0) * 100;

    const data = {
        labels: [`Delivered (${delivered}%)`, `Undelivered (${undelivered}%)`],
        datasets: [
            {
                data: [delivered, undelivered],
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',

                ],
                borderWidth: 2,
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 12,
                        weight: '500'
                    },
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw;
                        return `${label}: ${value}% of total deliveries`;
                    }
                }
            }
        },
        cutout: '60%',
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
                    background: "var(--kendo-primary, #f35800)",
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
                    Delivery Status
                </CardTitle>
            </CardHeader>

            <CardBody
                style={{
                    padding: "var(--kendo-spacing-6, 1.5rem)",
                    background: "var(--kendo-app-surface, #ffffff)",
                    height: "350px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Doughnut data={data} options={options} />
            </CardBody>
        </Card>
    );
}