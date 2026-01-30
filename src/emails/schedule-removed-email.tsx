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

interface ScheduleRemovedEmailProps {
  tutorName: string;
  dayOfWeek: number;
  startTime: string;
  duration: number;
}

export const ScheduleRemovedEmail = ({
  tutorName,
  dayOfWeek,
  startTime,
  duration,
}: ScheduleRemovedEmailProps) => {
  const year = new Date().getFullYear();
  const dayName = DAYS_OF_WEEK[dayOfWeek] ?? "Unknown";
  const durationText =
    duration >= 60
      ? `${Math.floor(duration / 60)}h${duration % 60 > 0 ? ` ${duration % 60}m` : ""}`
      : `${duration} min`;

  return (
    <Html>
      <Head />
      <Tailwind config={{presets: [pixelBasedPreset]}}>
        <Preview>
          Your recurring sessions with {tutorName} have been discontinued
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
                    Schedule Discontinued
                  </Heading>
                  <Text
                    style={{
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#6B7280",
                      margin: "0",
                    }}
                  >
                    Your recurring sessions have been discontinued
                  </Text>
                </Section>
              </Section>

              <Section
                style={{
                  height: "4px",
                  background:
                    "linear-gradient(90deg, #6B7280 0%, #9CA3AF 50%, #D1D5DB 100%)",
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
                  <strong>{tutorName}</strong> has discontinued your recurring
                  tutoring sessions. Your regular weekly sessions will no longer
                  take place.
                </Text>
              </Section>

              <Section
                style={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: "16px",
                  padding: "32px",
                  marginBottom: "32px",
                  border: "2px solid #9CA3AF",
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
                  Discontinued Schedule
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
                        Day
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
                          textDecoration: "line-through",
                        }}
                      >
                        Every {dayName}
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
                          textDecoration: "line-through",
                        }}
                      >
                        {startTime}
                      </Text>
                    </Column>
                  </Row>

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
                        Duration
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
                          textDecoration: "line-through",
                        }}
                      >
                        {durationText}
                      </Text>
                    </Column>
                  </Row>
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
                  If you would like to continue learning Slovenian, please visit
                  our website to book individual sessions or find another tutor.
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
                  Thank you for learning with Slovenščina Korak za Korakom.
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

export default ScheduleRemovedEmail;

ScheduleRemovedEmail.PreviewProps = {
  tutorName: "Ana Novak",
  dayOfWeek: 2,
  startTime: "10:00",
  duration: 60,
} satisfies ScheduleRemovedEmailProps;
