import { Button, Collapse, Paper, PasswordInput, TextInput, Container, rem } from '@mantine/core';
import classes from './SignUp.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
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
            confirmPassword: (value, values) => (value === values.password ? null : 'Passwords do not match'),
        },
    });

    useEffect(() => {
        setOpened(true);
    }, []);

    const createAccount = async (values) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/user`, {
                email: values.email,
                password: values.password,
                contact: values.contact
            });

            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Server-side error
                form.setErrors({
                    email: error.response.data.email || '',
                    password: error.response.data.password || '',
                });
            } else {
                // showNotification({
                //     title: 'Error',
                //     message: 'An unexpected error occurred. Please try again.',
                //     color: 'red',
                // });
                // console.error('Error:', error.message);
            }
        }
    };
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
                <form onSubmit={
                    form.onSubmit(
                        (values) => {
                            createAccount(values);
                        }
                    )}
                    className={classes.signup}>
                    <h1 className={classes.title}>Sign Up</h1>
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

                    <PasswordInput
                        withAsterisk
                        mt="md"
                        label="Confirm Password"
                        type='password'
                        placeholder="Comfirm your password"
                        classNames={classes}
                        key={form.key('confirmPassword')}
                        {...form.getInputProps('confirmPassword')}
                        error={form.errors.confirmPassword}
                    />

                    <TextInput
                        mt="md"
                        label="Contact Number"
                        placeholder="+1 (000) 000-0000"
                        classNames={classes}
                        key={form.key('contact')}
                        {...form.getInputProps('contact')}
                        error={form.errors.contact}
                    />

                    {/* <Link to="/"
                        className={classes.control}> */}
                    <Button type="submit" mt="md" size="md">
                        Create Account
                    </Button>
                    {/* </Link> */}
                </form>
            </Container>
        </Collapse>
    );
}