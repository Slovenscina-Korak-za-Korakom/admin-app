import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  pixelBasedPreset,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface SessionCancelledEmailProps {
  tutorName: string;
  dayOfWeek: number;
  startTime: string;
  cancelledDate: string;
  reason?: string;
}

export const SessionCancelledEmail = ({
  tutorName,
  dayOfWeek,
  startTime,
  cancelledDate,
  reason,
}: SessionCancelledEmailProps) => {
  const year = new Date().getFullYear();
  const dayName = DAYS_OF_WEEK[dayOfWeek] ?? "Unknown";

  return (
    <Html>
      <Head />
      <Tailwind config={{presets: [pixelBasedPreset]}}>
        <Preview>
          Your session on {cancelledDate} has been cancelled
        </Preview>
        <Body
          className="bg-gray-50 font-sans text-base"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <Container
            className="mx-auto max-w-[600px]"
            style={{backgroundColor: "#F9FAFB"}}
          >
            <Section style={{paddingTop: "40px"}} />

            <Container
              className="rounded-[20px] bg-white"
              style={{
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                margin: "0 auto",
                padding: "48px 40px",
              }}
            >
              <Section style={{marginBottom: "32px"}}>
                <Row>
                  <Column align="center">
                    <Img
                      src="https://www.slovenscinakzk.com/logo-image.png"
                      alt="Slovenščina Korak za Korakom"
                      width={64}
                      height={64}
                      style={{borderRadius: "16px"}}
                    />
                  </Column>
                </Row>
                <Section className="text-center" style={{marginTop: "24px"}}>
                  <Text
                    className="font-semibold"
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#A855F7",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                      background:
                        "linear-gradient(135deg, #6089CB 0%, #A855F7 50%, #F9A8D4 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Slovenščina Korak za Korakom
                  </Text>
                  <Heading
                    as="h1"
                    style={{
                      fontSize: "32px",
                      lineHeight: "40px",
                      fontWeight: "600",
                      color: "#111827",
                      margin: "0 0 12px 0",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    Session Cancelled
                  </Heading>
                  <Text
                    style={{
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#6B7280",
                      margin: "0",
                    }}
                  >
                    Your upcoming tutoring session has been cancelled
                  </Text>
                </Section>
              </Section>

              <Section
                style={{
                  height: "4px",
                  background:
                    "linear-gradient(90deg, #EF4444 0%, #F97316 50%, #FBBF24 100%)",
                  borderRadius: "2px",
                  marginBottom: "40px",
                }}
              />

              <Section style={{marginBottom: "24px"}}>
                <Text
                  style={{
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#374151",
                    margin: "0",
                  }}
                >
                  <strong>{tutorName}</strong> has cancelled your tutoring session
                  scheduled for <strong>{cancelledDate}</strong>.
                </Text>
              </Section>

              <Section
                style={{
                  backgroundColor: "#FEF2F2",
                  borderRadius: "16px",
                  padding: "32px",
                  marginBottom: "32px",
                  border: "2px solid #EF4444",
                }}
              >
                <Heading
                  as="h2"
                  style={{
                    fontSize: "18px",
                    lineHeight: "24px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: "0 0 24px 0",
                    letterSpacing: "-0.2px",
                  }}
                >
                  Cancelled Session Details
                </Heading>

                <Section>
                  <Row style={{marginBottom: "16px"}}>
                    <Column style={{width: "40%"}}>
                      <Text
                        style={{
                          fontSize: "13px",
                          lineHeight: "20px",
                          color: "#6B7280",
                          fontWeight: "500",
                          margin: "0",
                        }}
                      >
                        Date
                      </Text>
                    </Column>
                    <Column style={{width: "60%"}}>
                      <Text
                        style={{
                          fontSize: "15px",
                          lineHeight: "24px",
                          color: "#111827",
                          fontWeight: "500",
                          margin: "0",
                        }}
                      >
                        {cancelledDate}
                      </Text>
                    </Column>
                  </Row>

                  <Row style={{marginBottom: "16px"}}>
                    <Column style={{width: "40%"}}>
                      <Text
                        style={{
                          fontSize: "13px",
                          lineHeight: "20px",
                          color: "#6B7280",
                          fontWeight: "500",
                          margin: "0",
                        }}
                      >
                        Regular Day
                      </Text>
                    </Column>
                    <Column style={{width: "60%"}}>
                      <Text
                        style={{
                          fontSize: "15px",
                          lineHeight: "24px",
                          color: "#111827",
                          fontWeight: "500",
                          margin: "0",
                        }}
                      >
                        {dayName}
                      </Text>
                    </Column>
                  </Row>

                  <Row style={{marginBottom: reason ? "16px" : "0"}}>
                    <Column style={{width: "40%"}}>
                      <Text
                        style={{
                          fontSize: "13px",
                          lineHeight: "20px",
                          color: "#6B7280",
                          fontWeight: "500",
                          margin: "0",
                        }}
                      >
                        Time
                      </Text>
                    </Column>
                    <Column style={{width: "60%"}}>
                      <Text
                        style={{
                          fontSize: "15px",
                          lineHeight: "24px",
                          color: "#111827",
                          fontWeight: "500",
                          margin: "0",
                        }}
                      >
                        {startTime}
                      </Text>
                    </Column>
                  </Row>

                  {reason && (
                    <Row>
                      <Column style={{width: "40%"}}>
                        <Text
                          style={{
                            fontSize: "13px",
                            lineHeight: "20px",
                            color: "#6B7280",
                            fontWeight: "500",
                            margin: "0",
                          }}
                        >
                          Reason
                        </Text>
                      </Column>
                      <Column style={{width: "60%"}}>
                        <Text
                          style={{
                            fontSize: "15px",
                            lineHeight: "24px",
                            color: "#111827",
                            fontWeight: "500",
                            margin: "0",
                          }}
                        >
                          {reason}
                        </Text>
                      </Column>
                    </Row>
                  )}
                </Section>
              </Section>

              <Section style={{marginBottom: "32px"}}>
                <Text
                  style={{
                    fontSize: "14px",
                    lineHeight: "22px",
                    color: "#6B7280",
                    margin: "0",
                  }}
                >
                  Your regular schedule remains active. Future sessions on {dayName}s
                  at {startTime} will continue as normal unless otherwise notified.
                </Text>
              </Section>

              <Section
                style={{
                  textAlign: "center",
                  paddingTop: "24px",
                  borderTop: "1px solid #F3F4F6",
                }}
              >
                <Text
                  style={{
                    fontSize: "13px",
                    lineHeight: "20px",
                    color: "#9CA3AF",
                    margin: "0",
                  }}
                >
                  If you have any questions, please contact your tutor directly.
                </Text>
              </Section>
            </Container>

            <Section style={{padding: "40px 32px", textAlign: "center"}}>
              <Row>
                <Column align="center">
                  <table style={{margin: "0 auto"}}>
                    <tbody>
                      <tr>
                        <td style={{padding: "0 12px"}}>
                          <Link
                            href="https://www.slovenscinakzk.com/en/about-us"
                            style={{
                              color: "#6B7280",
                              textDecoration: "none",
                              fontSize: "14px",
                              fontWeight: "500",
                            }}
                          >
                            About
                          </Link>
                        </td>
                        <td style={{padding: "0 12px"}}>
                          <Link
                            href="https://www.slovenscinakzk.com/en/pricing"
                            style={{
                              color: "#6B7280",
                              textDecoration: "none",
                              fontSize: "14px",
                              fontWeight: "500",
                            }}
                          >
                            Pricing
                          </Link>
                        </td>
                        <td style={{padding: "0 12px"}}>
                          <Link
                            href="mailto:support@slovenscinakzk.com"
                            style={{
                              color: "#6B7280",
                              textDecoration: "none",
                              fontSize: "14px",
                              fontWeight: "500",
                            }}
                            target={"_self"}
                          >
                            Contact
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Column>
              </Row>
              <Text
                style={{
                  marginTop: "24px",
                  fontSize: "13px",
                  lineHeight: "20px",
                  color: "#9CA3AF",
                  marginBottom: "0",
                }}
              >
                &copy; {year} Slovenščina Korak za Korakom. All Rights Reserved.
              </Text>
            </Section>

            <Section style={{paddingBottom: "40px"}} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SessionCancelledEmail;

SessionCancelledEmail.PreviewProps = {
  tutorName: "Ana Novak",
  dayOfWeek: 2,
  startTime: "10:00",
  cancelledDate: "Tuesday, February 4, 2025",
  reason: "Personal appointment",
} satisfies SessionCancelledEmailProps;
