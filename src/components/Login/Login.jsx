import { Button, Collapse, Paper, PasswordInput, TextInput, Container } from '@mantine/core';
import classes from './Login.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [opened, setOpened] = useState(false);
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
            contact: '',
        },

        validate: {
            email: (value) => (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? null : 'Please enter a valid email'),
            password: (value) => (value.trim().length === 0 ? 'Pasword is required' : null),
        },
    });

    useEffect(() => {
        setOpened(true);
    }, []);

    const createAccount = async (values) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, {
                email: values.email,
                password: values.password
            });

            console.log(response);
            if (response.status === 200) {
                sessionStorage.setItem("user_id", response.data.user_id);
                sessionStorage.setItem("isLoggedIn", true);
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                form.setErrors({
                    email: error.response.data.email || '',
                    password: error.response.data.password || '',
                });
            } else {
            }
        }
    };
    return (
        <Collapse in={opened} transitionDuration={1000} transitionTimingFunction="ease">
            <Container mt="xl" mb="xl" mx="auto" className={classes.logincontainer}>
                <Paper
                    shadow="md"
                    p="xl"
                    radius="md"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1521790361543-f645cf042ec4?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
                    className={classes.card}
                />
                <form onSubmit={
                    form.onSubmit(
                        (values) => {
                            createAccount(values);
                        }
                    )}
                    className={classes.formLogin}>
                    <h1 className={classes.title}>Get Started</h1>
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="example@ex.com"
                        classNames={classes}
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        withAsterisk
                        mt="md"
                        label="Password"
                        type='password'
                        placeholder="Your password"
                        classNames={classes}
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                        error={form.errors.password}
                    />

                    <Button type="submit" mt="md" size="md">
                        Login
                    </Button>
                </form>
            </Container>
        </Collapse>
    );
}