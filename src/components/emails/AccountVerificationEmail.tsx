import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ScoutseshVerifyEmailProps {
  name: string;
  verificationCode: string;
}

export default function AccountVerificationEmail({
  verificationCode,
  name,
}: ScoutseshVerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Scoutsesh Email Verification</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Section style={styles.coverSection}>
            <Section style={styles.header}>
              <Button href="https://scoutsesh.com" style={styles.logo}>
                ScoutSesh
              </Button>
            </Section>
            <Section style={styles.upperSection}>
              <Heading style={styles.h1}>Verify your email address</Heading>
              <Text style={{ ...styles.text, marginBottom: "14px" }}>
                Hi {name}, Thanks for starting the new Scoutsesh account
                creation process. We want to make sure it&apos;s really you.
                Please enter the following verification code when prompted. If
                you don&apos;t want to create an account, you can ignore this
                message.
              </Text>
              <Section style={styles.verificationSection}>
                <Text style={{ ...styles.text, ...styles.verifyText }}>
                  Verification code
                </Text>

                <Text style={{ ...styles.text, ...styles.codeText }}>
                  {verificationCode}
                </Text>
                <Text style={{ ...styles.text, ...styles.validityText }}>
                  (This code is valid for 10 minutes)
                </Text>
              </Section>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    backgroundColor: "#fff",
    color: "#212121",
  },

  container: {
    padding: "20px",
    margin: "0 auto",
    backgroundColor: "#eee",
    borderRadius: "8px",
  },

  h1: {
    color: "#333",
    fontFamily:
      "'GeistSans', 'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
  },

  link: {
    color: "#2754C5",
    fontFamily:
      "'GeistSans', 'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontSize: "14px",
    textDecoration: "underline",
  },

  text: {
    color: "#333",
    fontFamily:
      "'GeistSans', 'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontSize: "14px",
    margin: "24px 0",
  },

  header: {
    display: "flex",
    padding: "20px",
    paddingBottom: "0",
    alignItems: "center",
    justifyContent: "center",
  },

  coverSection: { backgroundColor: "#fff", borderRadius: "8px" },

  upperSection: { padding: "25px 35px", paddingTop: "0" },

  lowerSection: { padding: "25px 35px" },

  footerText: {
    fontSize: "12px",
    padding: "0 20px",
  },

  verifyText: {
    margin: 0,
    fontWeight: "bold",
    textAlign: "center" as const,
  },

  codeText: {
    fontWeight: "bold",
    fontSize: "36px",
    margin: "10px 0",
    textAlign: "center" as const,
  },

  validityText: {
    margin: "0px",
    textAlign: "center" as const,
  },

  verificationSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    fontFamily:
      "'GeistSans', 'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#14a800",
  },
};

AccountVerificationEmail.PreviewProps = {
  name: "John",
  verificationCode: "123456",
} as ScoutseshVerifyEmailProps;
