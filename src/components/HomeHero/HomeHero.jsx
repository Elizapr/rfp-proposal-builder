import cx from 'clsx';
import { Title, Text, Container, Button, Overlay, Avatar, Center, BackgroundImage, Group } from '@mantine/core';
import classes from './HomeHero.module.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/whiteLogo.svg';
import { Image } from '@mantine/core';

export default function HomeHero() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") ?? false;
    return (
        <div className={classes.wrapper}>
            <Overlay color="#000" opacity={0.65} zIndex={1} />

            <div className={classes.inner}>
                <Center align="center">
                    <Group style={{ backdropFilter: 'blur(10px)', border: '1px dashed white', rotate: '45deg' }}>
                        <Image src={logo} alt="Logo"
                            style={{ rotate: '-45deg', width: '60px', height: '60px' }} />
                    </Group>
                </Center>
                <Title mt="md" className={classes.title}>
                    Proposal builder for{' '}
                    <Text component="span" inherit className={classes.highlight}>
                        RFP (Request for Proposal)
                    </Text>
                </Title>

                <Container size={640}>
                    <Text size="lg" className={classes.description}>
                        This is a web app where companies can create proposal for bidding RFPs(Request for Proposal). This app will take the information from users (companies proposal writer) that will be stored in database for future use and current rfp-pdfs and create a draft proposal using LLM.
                    </Text>
                </Container>

                {isLoggedIn ?
                    <Container className={classes.controls}>
                        <Button
                            variant="gradient" size="lg"
                            component={Link} to="/companyProfile"
                            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>
                            Get Started
                        </Button>
                    </Container>
                    :
                    <Container className={classes.controls}>
                        <Button variant="white" size="lg"
                            component={Link} to="/signup" className={classes.control}>
                            Sign Up
                        </Button>
                        <Button size="lg"
                            component={Link} to="/login"
                            className={cx(classes.control, classes.secondaryControl)}>
                            Login
                        </Button>
                    </Container>
                }
            </div>
        </div >
    );
}