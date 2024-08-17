import { useState } from 'react';
import { Container, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const links = [
    { link: '/about', label: 'Features' },
    { link: '/signup', label: 'Sign Up' },
    { link: '/login', label: 'Login' },
];
const logggedInlinks = [
    { link: '/about', label: 'Features' },
    { link: '/logut', label: 'Logout' },
];

export default function Header() {
    const navigate = useNavigate();
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") ?? false;
    const headerLinks = isLoggedIn ? logggedInlinks : links;

    const items = headerLinks.map((link) => (
        <Link
            key={link.label}
            to={link.link}
            className={classes.link}
            data-active={active === link.link || undefined}
            onClick={(event) => {
                event.preventDefault();
                setActive(link.link);
                navigate(link.link);
            }}
        >
            {link.label}
        </Link>
    ));

    return (
        <header className={classes.header}>
            <Container size="md" className={classes.inner}>
                <h1>RFP Proposal Builder</h1>
                <Group gap={5} visibleFrom="xs">
                    {items}
                </Group>

                <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
            </Container>
        </header>
    );
}