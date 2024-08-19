import { Button, Container, Select, Textarea, TextInput, Text } from '@mantine/core';
import classes from './AddCompany.module.scss';
import { Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function AddCompany() {
    const user_id = sessionStorage.getItem('user_id');
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const companyId = params.company_id;

    const [responseError, setResponseError] = useState('');
    const [companyData, setCompanyData] = useState([]);
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            industry: '',
            founded: '',
            city: '',
            state: '',
            country: '',
            background: '',
        },

        validate: {
            name: (value) => (value.trim().length === 0 ? 'Full name is required' : null),
            industry: (value) => (value.trim().length === 0 ? 'Job title is required' : null),
            founded: (value) => (value.trim().length === 0 ? 'Skills is required' : null),
            city: (value) => (value.length === 0 ? 'Years of experience is required' : null),
            state: (value) => (value.length === 0 ? 'Years of experience is required' : null),
            country: (value) => (value.length === 0 ? 'Years of experience is required' : null),
            background: (value) => (value.length === 0 ? 'Years of experience is required' : null),
        },
    });

    const getCompany = async () => {
        try {
            console.log(companyId);
            const url = `${import.meta.env.VITE_API_URL}/company/${user_id}`
            const response = await axios.get(url);
            setCompanyData(response.data);
            form.values.name = response.data.name;
            form.values.industry = response.data.industry;
            form.values.founded = response.data.founded;
            form.values.city = response.data.city;
            form.values.state = response.data.state;
            form.values.country = response.data.country;
            form.values.background = response.data.background;
            setResponseError('');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setResponseError(error.response.data.message);
            } else {
                setResponseError(error.message);
            }
        }
    };
    if (location.pathname === `/companyProfile/editCompany/${companyId}`) {
        useEffect(() => {
            getCompany();
        }, []);
    }
    const addCompany = async (values) => {
        setResponseError('');
        try {
            const companyObj = {
                name: values.name,
                industry: values.industry,
                founded: values.founded,
                city: values.city,
                state: values.state,
                country: values.country,
                background: values.background,
                user_id: sessionStorage.getItem('user_id'),
            }
            console.log(companyObj);
            const url = `${import.meta.env.VITE_API_URL}/company`;
            const response = await axios.post(url, companyObj);

            if (response.status === 201) {
                navigate('/companyProfile');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setResponseError(error.response.data.message);
                // Server-side error
                // form.setErrors({
                //     name: error.response.data.full_name || '',
                //     industry: error.response.data.job_title || ''
                // });
            } else {
                console.error('Error:', error.message);
                setResponseError(error.message);
            }
        }
    };
    const updateCompany = async (values) => {
        setResponseError('');
        try {
            const companyObj = {
                name: values.name,
                industry: values.industry,
                founded: values.founded,
                city: values.city,
                state: values.state,
                country: values.country,
                background: values.background,
                user_id: sessionStorage.getItem('user_id'),
            }
            const url = `${import.meta.env.VITE_API_URL}/company/${companyId}/update`;
            const response = await axios.put(url, companyObj);

            if (response.status === 200) {
                navigate('/companyProfile');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setResponseError(error.response.data.message);
                // Server-side error
                // form.setErrors({
                //     name: error.response.data.full_name || '',
                //     industry: error.response.data.job_title || ''
                // });
            } else {
                console.error('Error:', error.message);
                setResponseError(error.message);
            }
        }
    };
    return (
        <Container mx="auto">
            <form className={classes.addCompanyForm}
                onSubmit={form.onSubmit(
                    (values) => {
                        if (location.pathname === `/companyProfile/editCompany/${companyId}`) {
                            updateCompany(values);
                        } else {
                            addCompany(values);
                        }
                    })}
            >
                <TextInput
                    withAsterisk
                    label="Company Name"
                    placeholder="ABC Products Ltd."
                    classNames={classes}
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />

                <TextInput
                    withAsterisk
                    mt="md"
                    label="Industry"
                    placeholder="Technology/IT"
                    classNames={classes}
                    key={form.key('industry')}
                    {...form.getInputProps('industry')}
                />

                <TextInput
                    withAsterisk
                    mt="md"
                    label="Founded"
                    placeholder="2024"
                    classNames={classes}
                    key={form.key('founded')}
                    {...form.getInputProps('founded')}
                />

                <TextInput
                    withAsterisk
                    mt="md"
                    label="Headquarters City"
                    placeholder="Vanouver"
                    classNames={classes}
                    key={form.key('city')}
                    {...form.getInputProps('city')}
                />

                <TextInput
                    withAsterisk
                    mt="md"
                    label="Headquarters State"
                    placeholder="British Columbia"
                    classNames={classes}
                    key={form.key('state')}
                    {...form.getInputProps('state')}
                />

                <TextInput
                    withAsterisk
                    mt="md"
                    label="Headquarters Country"
                    placeholder="Canada"
                    classNames={classes}
                    key={form.key('country')}
                    {...form.getInputProps('country')}
                />

                <Textarea
                    withAsterisk
                    mt="md"
                    label="Company Background and Features"
                    placeholder="Description of company"
                    autosize
                    minRows={2}
                    maxRows={4}
                    key={form.key('background')}
                    {...form.getInputProps('background')}
                />

                {/* <Select
                mt="md"
                comboboxProps={{ withinPortal: true }}
                data={['React', 'Angular', 'Svelte', 'Vue']}
                placeholder="Pick one"
                label="Your favorite library/framework"
                classNames={classes}
            /> */}



                <Button mt="md" size="md"
                    type="submit">
                    {
                        (location.pathname === `/companyProfile/addCompany`) ?
                            "Add" : "Update"
                    }
                </Button>
            </form>
            {responseError &&
                <Text style={{ color: 'red' }}>
                    {responseError}
                </Text>
            }
        </Container>
    );
}