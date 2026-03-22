import { Card, CardBody, CardHeader, CardTitle } from "@progress/kendo-react-layout";

export default function AverageDetention({ value }) {
  const avgDetention = value || 0;

  return (
    <Card 
      style={{
        height: "100%",
        borderRadius: "var(--kendo-border-radius-xxxl)",
        boxShadow: "var(--kendo-elevation-2, 0 4px 6px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.12))",
        transition: "transform var(--kendo-duration-rapid, 200ms) var(--kendo-easing-standard, cubic-bezier(0.42, 0, 0.58, 1))",
        cursor: "pointer"
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
          borderBottom: "none",
          borderRadius: "var(--kendo-border-radius-lg, 0.375rem) var(--kendo-border-radius-lg, 0.375rem) 0 0"
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
          Average Detention
        </CardTitle>
      </CardHeader>
      
      <CardBody 
        style={{
          textAlign: "center",
          padding: "var(--kendo-spacing-8, 2rem) var(--kendo-spacing-4, 1rem)",
          background: "var(--kendo-app-surface, #ffffff)"
        }}
      >
        <p 
          style={{
            fontSize: "2rem",
            fontWeight: "var(--kendo-font-weight-bold, 700)",
            margin: 0,
            color: "var(--kendo-on-app-surface, #272727)",
            lineHeight: "var(--kendo-line-height-lg, 1.5)"
          }}
        >
          {avgDetention} min
        </p>
      </CardBody>
    </Card>
  );
}