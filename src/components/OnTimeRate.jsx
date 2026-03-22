import { Card, CardBody, CardHeader, CardTitle } from "@progress/kendo-react-layout";

export default function OnTimeRate({ value }) {
    const rate = value || 0;
    console.log(rate);


    const getColor = () => {
        if (rate >= 90) return "#3ea44e";
        if (rate >= 70) return "#ffa41f";
        return "#d92800";
    };

    return (
        <Card
            style={{
                height: "100%",
                borderRadius: "var(--kendo-border-radius-xxxl)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
                cursor: "pointer"
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
            }}
        >
            <CardHeader
                style={{
                    background: getColor(),
                    color: "white",
                    padding: "16px",
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
                    On-Time Rate
                </CardTitle>
            </CardHeader>

            <CardBody style={{ textAlign: "center", padding: "32px" }}>
                <p
                    style={{
                        fontSize: "2rem",
                        fontWeight: "var(--kendo-font-weight-bold, 700)",
                        margin: 0,
                        color: getColor(),
                        lineHeight: "var(--kendo-line-height-lg, 1.5)"
                    }}
                >
                    {rate}%
                </p>

            </CardBody>
        </Card>
    );
}