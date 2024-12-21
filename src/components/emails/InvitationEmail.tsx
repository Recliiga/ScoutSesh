import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";
import RightArrow from "../icons/RightArrow";

interface ScoutseshInviteUserEmailProps {
  username?: string;
  userImage?: string;
  coachFirstName: string;
  teamName: string;
  teamImage: string;
  invitationLink: string;
}

export default function InvitationEmail({
  username,
  userImage,
  coachFirstName,
  teamName,
  teamImage,
  invitationLink,
}: ScoutseshInviteUserEmailProps) {
  const previewText = `Join ${coachFirstName} on Scoutsesh`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body
          className="mx-auto my-auto bg-white px-2 font-sans"
          style={styles.body}
        >
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-lg border border-solid border-[#eaeaea] bg-green-50 p-[20px]">
            <Section className="mt-4 flex items-center justify-center">
              <Button href="https://scoutsesh.com" style={styles.logo}>
                ScoutSesh
              </Button>
            </Section>
            <Heading style={styles.heading}>
              Join <strong style={styles.strongText}>{teamName}</strong> on{" "}
              <strong style={{ ...styles.strongText, color: "#14a800" }}>
                Scoutsesh
              </strong>
            </Heading>
            <Text style={styles.text}>
              Hello{username ? ` ${username}` : null},
            </Text>
            <Text style={styles.text}>
              <strong style={styles.strongText}>{coachFirstName}</strong> has
              invited you to the{" "}
              <strong style={styles.strongText}>{teamName}</strong> team on{" "}
              <strong style={{ ...styles.strongText, color: "#14a800" }}>
                Scoutsesh
              </strong>
              .
            </Text>
            {username ? (
              <Section>
                <Row>
                  <Column align="right">
                    <Img
                      style={styles.image}
                      src={userImage}
                      width="64"
                      height="64"
                    />
                  </Column>
                  <Column align="center">
                    <RightArrow />
                  </Column>
                  <Column align="left">
                    <Img
                      style={styles.image}
                      src={teamImage}
                      width="64"
                      height="64"
                    />
                  </Column>
                </Row>
              </Section>
            ) : (
              <Section
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Column align="center">
                  <Img
                    style={styles.image}
                    src={teamImage}
                    width="64"
                    height="64"
                  />
                </Column>
              </Section>
            )}
            <Section style={styles.footer}>
              <Button style={styles.invitationLink} href={invitationLink}>
                Join the team
              </Button>
            </Section>
            <Text style={styles.footerText}>
              or copy and paste this URL into your browser:{" "}
              <Link
                href={invitationLink}
                style={{ textDecorationLine: "none" }}
              >
                {invitationLink}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

InvitationEmail.PreviewProps = {
  // username: "John",
  // userImage: `/placeholder-profile-picture.png`,
  coachFirstName: "David",
  teamName: "Los Angeles Lakers",
  teamImage: `https://ci3.googleusercontent.com/meips/ADKq_NbMMQj-2kpYabHMRiAnCnJ4ctyD0ScRbcixHJYIDlfwLvgFtot0JJEQFm4mtkSXQp2jXSgpB210OtPzEVzKcmd6noDP0bcXT-vgVPJBIBKpjiPTmg1y8eQu4EN3K9tTDisSxsGX8JymJMqD4g=s0-d-e1-ft#https://res.cloudinary.com/dpw5ibssm/image/upload/v1734176638/ek5pscon1sp9nfcubdj0.jpg`,
  invitationLink: "http://localhost:3000/invite/123",
} as ScoutseshInviteUserEmailProps;

const styles: Record<string, React.CSSProperties> = {
  body: { color: "#18181b", fontSize: "14px" },

  logo: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#14a800",
  },

  heading: {
    margin: "24px 0",
    padding: 0,
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "normal",
  },

  text: { lineHeight: "24px" },

  strongText: { fontWeight: "500" },

  image: { borderRadius: "9999px" },

  invitationLink: {
    borderRadius: "4px",
    backgroundColor: "#14a800",
    padding: "12px 24px",
    textAlign: "center",
    fontSize: "12px",
    fontWeight: "600",
    color: "#ffffff",
    textDecorationLine: "none",
  },

  footer: { margin: "32px 0", textAlign: "center" },

  footerText: { lineHeight: "24px", fontSize: "12px", color: "#666" },
};
