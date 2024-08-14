import { Container, Group, Anchor } from '@mantine/core';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Footer.module.scss';

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
            <Container className={classes.inner}>
                <p>RFP Proposal Builder</p>
                {/* <MantineLogo size={28} /> */}
                <Group className={classes.links}>{items}</Group>
            </Container>
        </div>
    );
};