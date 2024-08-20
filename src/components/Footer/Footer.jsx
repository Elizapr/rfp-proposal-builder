import { Container, Group, Anchor, ActionIcon, rem, Text } from '@mantine/core';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const links = [
    { link: '#', label: 'Contact' },
    { link: '#', label: 'Privacy' },
    { link: '#', label: 'Blog' },
    { link: '#', label: 'Careers' },
];

export default function Footer() {
    const items = links.map((link) => (
        <Anchor
            c="dimmed"
            key={link.label}
            href={link.link}
            onClick={(event) => event.preventDefault()
            }
            size="sm"
        >
            {link.label}
        </Anchor >
    ));

    return (
        <div className={classes.footer}>
            <Container className={classes.afterFooter}>
                <Text c="dimmed" size="sm">
                    © 2024 Proposal Craft. All rights reserved.
                </Text>

                <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
                    <ActionIcon component="a" href='https://www.linkedin.com/in/eliza-pradhan' size="lg" color="gray" variant="subtle">
                        <FontAwesomeIcon icon={faLinkedin} style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon component="a" href='https://github.com/Elizapr' size="lg" color="gray" variant="subtle">
                        <FontAwesomeIcon icon={faGithub} style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </div>
    );
};