// src/pages/DeliveryRecords.js
import { Card, CardBody, CardHeader, CardTitle } from "@progress/kendo-react-layout";
import { useState } from "react";
import useDashboardData from "../hooks/useDashboardData";

export default function DeliveryRecords() {
    const dashboardData = useDashboardData();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    if (!dashboardData.ready) {
        return <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>;
    }

    // Calculate pagination
    const totalItems = dashboardData.data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = dashboardData.data.slice(startIndex, endIndex);

    return (
        <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
            <h1 style={{ marginBottom: "24px", color: "#2d3748" }}>Delivery Records</h1>
            
            <Card style={{
                borderRadius: "var(--kendo-border-radius-xxxl)",
                boxShadow: "var(--kendo-elevation-2, 0 4px 6px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.12))",
                overflow: "hidden"
            }}>
                <CardHeader style={{
                    background: "linear-gradient(135deg, #f35800 0%, #ff8b47 100%)",
                    color: "white",
                    padding: "16px",
                    borderBottom: "none"
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <CardTitle style={{ margin: 0, fontSize: "20px", fontWeight: "500" }}>
                            All Deliveries
                        </CardTitle>
                        <div style={{ fontSize: "14px" }}>
                            Total: {totalItems} deliveries
                        </div>
                    </div>
                </CardHeader>

                <CardBody style={{ padding: "20px", overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ background: "#f5f5f5", borderBottom: "2px solid #ddd" }}>
                                <th style={{ padding: "10px", textAlign: "left" }}>Event ID</th>
                                <th style={{ padding: "10px", textAlign: "left" }}>Load ID</th>
                                <th style={{ padding: "10px", textAlign: "left" }}>Scheduled</th>
                                <th style={{ padding: "10px", textAlign: "left" }}>Actual</th>
                                <th style={{ padding: "10px", textAlign: "right" }}>Detention</th>
                                <th style={{ padding: "10px", textAlign: "center" }}>On Time</th>
                                <th style={{ padding: "10px", textAlign: "left" }}>City</th>
                                <th style={{ padding: "10px", textAlign: "left" }}>State</th>
                             </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((delivery, index) => (
                                <tr key={delivery.event_id || index} style={{
                                    borderBottom: "1px solid #eee",
                                    background: index % 2 === 0 ? "white" : "#fafafa"
                                }}>
                                    <td style={{ padding: "8px" }}>{delivery.event_id}</td>
                                    <td style={{ padding: "8px" }}>{delivery.load_id}</td>
                                    <td style={{ padding: "8px" }}>{formatDate(delivery.scheduled_datetime)}</td>
                                    <td style={{ padding: "8px" }}>{formatDate(delivery.actual_datetime)}</td>
                                    <td style={{ padding: "8px", textAlign: "right" }}>{delivery.detention_minutes || 0}</td>
                                    <td style={{ padding: "8px", textAlign: "center" }}>
                                        <span style={{
                                            padding: "2px 8px",
                                            borderRadius: "12px",
                                            fontSize: "11px",
                                            background: delivery.on_time_flag === 'True' ? "#e8f5e9" : "#ffebee",
                                            color: delivery.on_time_flag === 'True' ? "#2e7d32" : "#c62828"
                                        }}>
                                            {delivery.on_time_flag === 'True' ? "Yes" : "No"}
                                        </span>
                                    </td>
                                    <td style={{ padding: "8px" }}>{delivery.location_city}</td>
                                    <td style={{ padding: "8px" }}>{delivery.location_state}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                            marginTop: "20px",
                            padding: "10px"
                        }}>
                            <button
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                                style={{
                                    padding: "6px 12px",
                                    background: currentPage === 1 ? "#ccc" : "#f35800",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: currentPage === 1 ? "not-allowed" : "pointer"
                                }}
                            >
                                First
                            </button>
                            
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                style={{
                                    padding: "6px 12px",
                                    background: currentPage === 1 ? "#ccc" : "#f35800",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: currentPage === 1 ? "not-allowed" : "pointer"
                                }}
                            >
                                Previous
                            </button>
                            
                            <span style={{ padding: "6px 12px", fontSize: "14px" }}>
                                Page {currentPage} of {totalPages}
                            </span>
                            
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                style={{
                                    padding: "6px 12px",
                                    background: currentPage === totalPages ? "#ccc" : "#f35800",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: currentPage === totalPages ? "not-allowed" : "pointer"
                                }}
                            >
                                Next
                            </button>
                            
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                                style={{
                                    padding: "6px 12px",
                                    background: currentPage === totalPages ? "#ccc" : "#f35800",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: currentPage === totalPages ? "not-allowed" : "pointer"
                                }}
                            >
                                Last
                            </button>
                        </div>
                    )}
                    
                    {/* Results Info */}
                    <div style={{
                        marginTop: "10px",
                        fontSize: "12px",
                        color: "#666",
                        textAlign: "center"
                    }}>
                        Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} deliveries
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}