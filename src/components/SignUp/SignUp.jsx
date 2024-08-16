import { Button, Collapse, Paper, PasswordInput, TextInput, Container, rem } from '@mantine/core';
import classes from './SignUp.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SignUp() {
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        setOpened(true);
    }, []);
    return (
        <Collapse in={opened} transitionDuration={1000} transitionTimingFunction="ease">
            <Container mt="xl" mb="xl" mx="auto" className={classes.signupcontainer}>
                <Paper
                    shadow="md"
                    p="xl"
                    radius="md"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581387490232-2181c3736353?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
                    className={classes.card}
                />
                <form className={classes.signup}>
                    <h1 className={classes.title}>Sign Up</h1>
                    <TextInput
                        label="Email"
                        placeholder="example@ex.com"
                        classNames={classes}
                    />
                    <PasswordInput
                        mt="md"
                        label="Password"
                        type='password'
                        placeholder="Your password"
                        classNames={classes}
                    />

                    <TextInput
                        mt="md"
                        label="Contact Number"
                        placeholder="+1 (000) 000-0000"
                        classNames={classes}
                    />

                    <Link to="/"
                        className={classes.control}>
                        <Button mt="md" size="md">
                            Create Account
                        </Button>
                    </Link>
                </form>
            </Container>
        </Collapse>
    );
}