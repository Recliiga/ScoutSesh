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
import { ArrowRight } from "lucide-react";
import * as React from "react";

interface VercelInviteUserEmailProps {
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
}: VercelInviteUserEmailProps) {
  const previewText = `Join ${coachFirstName} on Vercel`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-4 flex items-center justify-center">
              <Link
                href="/"
                className="mx-auto text-center text-2xl font-bold text-green-600"
              >
                ScoutSesh
              </Link>
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Join <strong>{teamName}</strong> on{" "}
              <strong className="text-green-600">Scoutsesh</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello{username ? ` ${username}` : null},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>{coachFirstName}</strong> has invited you to the{" "}
              <strong>{teamName}</strong> team on{" "}
              <strong className="text-green-600">Scoutsesh</strong>.
            </Text>
            {username ? (
              <Section>
                <Row>
                  <Column align="right">
                    <Img
                      className="rounded-full"
                      src={userImage}
                      width="64"
                      height="64"
                    />
                  </Column>
                  <Column align="center">
                    <ArrowRight />
                  </Column>
                  <Column align="left">
                    <Img
                      className="rounded-full"
                      src={teamImage}
                      width="64"
                      height="64"
                    />
                  </Column>
                </Row>
              </Section>
            ) : (
              <Section className="flex items-center justify-center">
                <Img
                  className="rounded-full"
                  src={teamImage}
                  width="64"
                  height="64"
                />
              </Section>
            )}
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-green-600 px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={invitationLink}
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              <Link
                href={invitationLink}
                className="text-blue-600 no-underline"
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
  username: "John",
  userImage: `/placeholder-profile-picture.png`,
  coachFirstName: "David",
  teamName: "Los Angeles Lakers",
  teamImage: `/placeholder-profile-picture.png`,
  invitationLink: "http://localhost:3000/invite/123",
} as VercelInviteUserEmailProps;
