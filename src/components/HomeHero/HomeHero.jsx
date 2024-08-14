import cx from 'clsx';
import { Title, Text, Container, Button, Overlay } from '@mantine/core';
import classes from './HomeHero.module.scss';
import { Link } from 'react-router-dom';

export default function HomeHero() {
    return (
        <div className={classes.wrapper}>
            <Overlay color="#000" opacity={0.65} zIndex={1} />

            <div className={classes.inner}>
                <Title className={classes.title}>
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

                <div className={classes.controls}>
                    <Link to="/signup" className={classes.control}>
                        <Button variant="white" size="lg">
                            Sign Up
                        </Button>
                    </Link>
                    <Link to="/login" className={cx(classes.control, classes.secondaryControl)}>
                        <Button size="lg">
                            Login
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}