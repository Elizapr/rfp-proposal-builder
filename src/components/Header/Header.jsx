import { useState, useEffect } from 'react';
import { Container, Group, Burger, Text, Popover, Menu, MenuItem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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
    const [collapsed, setCpllapsed] = useState(true);
    const [active, setActive] = useState(links[0].link);
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") ?? false;
    const headerLinks = isLoggedIn ? logggedInlinks : links;
    const location = useLocation();
    const headerClass = location.pathname === '/generate' ? classes.headerFixed : classes.header;

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
                if (opened) {
                    toggle();
                }
            }}
        >
            {link.label}
        </Link>
    ));

    const burgerMenu = headerLinks.map((link) => (
        <Menu trigger='click' key={link.label}>
            <MenuItem onClick={() => navigate(link.link)}>{link.label}</MenuItem>
        </Menu>
    ));
    useEffect(() => {
        setActive(location.pathname);
    }, [location]);

    const logOutEvent = () => {
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <header className={headerClass}>
            <Container size="md" className={classes.inner}>
                <Link to="/" >
                    <Image src={logo} alt="Logo" style={{ width: '50px', height: '50px' }} />
                </Link>
                <h2 className={classes.title}>Proposal Craft</h2>
                <Group gap={5} visibleFrom="xs">
                    {items}
                </Group>

                <Popover width='100%' position="bottom" withArrow
                    shadow="md" opened={opened}
                    onChange={toggle}>
                    <Popover.Target>
                        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Text mt="sm" className={classes.headerCollapse}>{items}</Text>
                    </Popover.Dropdown>
                </Popover>
            </Container>




        </header>
    );
}