import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface DropboxResetPasswordEmailProps {
  userFirstname: string;
  resetPasswordLink?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://scoutsesh.com`;

export default function ResetPasswordEmail({
  userFirstname,
  resetPasswordLink,
}: DropboxResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Dropbox reset your password</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Button
            style={{
              ...styles.text,
              color: "#14a800",
              fontWeight: "bold",
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
            }}
            href={baseUrl}
          >
            Scoutsesh
          </Button>
          <Section>
            <Text style={styles.text}>Hi {userFirstname},</Text>
            <Text style={styles.text}>
              Someone recently requested a password change for your Scoutsesh
              account. If this was you, you can set a new password here:
            </Text>
            <Button style={styles.button} href={resetPasswordLink}>
              Reset password
            </Button>
            <Text style={styles.text}>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text style={styles.text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

ResetPasswordEmail.PreviewProps = {
  userFirstname: "John",
  resetPasswordLink: "https://dropbox.com",
} as DropboxResetPasswordEmailProps;

const styles = {
  main: {
    backgroundColor: "#fff",
    padding: "10px 0",
  },

  container: {
    backgroundColor: "#f0fdf4",
    border: "1px solid #f0f0f0",
    padding: "32px",
    borderRadius: "8px",
  },

  text: {
    fontSize: "14px",
    fontFamily:
      "'GeistSans', 'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontWeight: "300",
    color: "#404040",
    lineHeight: "26px",
  },

  button: {
    backgroundColor: "#14a800",
    borderRadius: "4px",
    color: "#fff",
    fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
    fontSize: "14px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    width: "210px",
    padding: "14px 7px",
  },
};
