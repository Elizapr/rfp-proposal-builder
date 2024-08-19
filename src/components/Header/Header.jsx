import { useState, useEffect } from 'react';
import { Container, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Image } from '@mantine/core';
import logo from '../../assets/logo.svg';
import { useLocation } from 'react-router-dom';

const links = [
    { link: '/signup', label: 'Sign Up' },
    { link: '/login', label: 'Login' },
];
const logggedInlinks = [
    { link: '/companyProfile', label: 'Company Profile' },
    { link: '/logout', label: 'Logout' },
];

export default function Header() {
    const navigate = useNavigate();
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") ?? false;
    const headerLinks = isLoggedIn ? logggedInlinks : links;
    const location = useLocation();

    const items = headerLinks.map((link) => (
        <Link
            key={link.label}
            to={link.link}
            className={classes.link}
            data-active={active === link.link || undefined}
            onClick={(event) => {
                event.preventDefault();
                setActive(link.link);
                if (link.link === '/logout') {
                    logOutEvent();
                } else {
                    navigate(link.link);
                }
            }}
        >
            {link.label}
        </Link>
    ));
    useEffect(() => {
        setActive(location.pathname);
    }, [location]);

    const logOutEvent = () => {
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <header className={classes.header}>
            <Container size="md" className={classes.inner}>
                <Link to="/" >
                    <Image src={logo} alt="Logo" style={{ width: '50px', height: '50px' }} />
                </Link>
                <h1 className={classes.title}>Proposal Craft</h1>
                <Group gap={5} visibleFrom="xs">
                    {items}
                </Group>

                <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
            </Container>
        </header>
    );
}