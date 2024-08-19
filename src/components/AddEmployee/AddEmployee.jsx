import { Button, Container, TextInput } from '@mantine/core';
import classes from './AddEmployee.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function AddCompany() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [employeeData, setEmployeeData] = useState([]);

    const getEmployee = async () => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/employee/${params.employee_id}`
            console.log(url);
            const response = await axios.get(url);
            setEmployeeData(response.data);
            form.values.full_name = response.data.full_name;
            form.values.job_title = response.data.job_title;
            form.values.skills = response.data.skills;
            form.values.experience_years = response.data.experience_years;

        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error.response.data);
                // Server-side error
                form.setErrors({
                    full_name: error.response.data.full_name || '',
                    job_title: error.response.data.job_title || ''
                });
            } else {
                console.error('Error:', error.message);
            }
        }
    };
    if (location.pathname === `/companyProfile/${params.company_id}/edit/${params.employee_id}`) {
        useEffect(() => {
            getEmployee();
        }, []);
    }
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            full_name: '',
            job_title: '',
            skills: '',
            experience_years: '',
        },

        validate: {
            full_name: (value) => (value.trim().length === 0 ? 'Full name is required' : null),
            job_title: (value) => (value.trim().length === 0 ? 'Job title is required' : null),
            skills: (value) => (value.trim().length === 0 ? 'Skills is required' : null),
            experience_years: (value) => (value.length === 0 ? 'Years of experience is required' : null),
        },
    });

    const addEmployee = async (values) => {
        try {
            const employeeObj = {
                full_name: values.full_name,
                job_title: values.job_title,
                skills: values.skills,
                experience_years: values.experience_years,
                company_id: params.company_id
            }
            const url = `${import.meta.env.VITE_API_URL}/employee`
            const response = await axios.post(url, employeeObj);

            if (response.status === 201) {
                navigate('/companyProfile');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error.response.data);
                // Server-side error
                form.setErrors({
                    full_name: error.response.data.full_name || '',
                    job_title: error.response.data.job_title || ''
                });
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    const updateEmployee = async (values) => {
        try {
            const employeeObj = {
                full_name: values.full_name,
                job_title: values.job_title,
                skills: values.skills,
                experience_years: values.experience_years,
                company_id: params.company_id
            }
            const url = `${import.meta.env.VITE_API_URL}/employee/${params.employee_id}`
            const response = await axios.put(url, employeeObj);

            if (response.status === 200) {
                navigate('/companyProfile');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error.response.data);
                // Server-side error
                form.setErrors({
                    full_name: error.response.data.full_name || '',
                    job_title: error.response.data.job_title || ''
                });
            } else {
                console.error('Error:', error.message);
            }
        }
    };
    return (
        <Container mx="auto">
            <form onSubmit={form.onSubmit(
                (values) => {
                    if (location.pathname === `/companyProfile/${params.company_id}/edit/${params.employee_id}`) {
                        updateEmployee(values);
                    } else {
                        addEmployee(values);
                    }
                }
            )} className={classes.addEmployeeForm}>
                <h2 className={classes.title}>Add Employee</h2>
                <TextInput
                    withAsterisk
                    label="Full Name"
                    placeholder="John Smith"
                    classNames={classes}
                    key={form.key('full_name')}
                    {...form.getInputProps('full_name')}
                />
                <TextInput
                    withAsterisk
                    mt="md"
                    label="Job Title"
                    placeholder="Software Engineer"
                    classNames={classes}
                    key={form.key('job_tile')}
                    {...form.getInputProps('job_title')}
                />

                <TextInput
                    withAsterisk
                    mt="md"
                    label="Skills"
                    placeholder="Works done in the company"
                    classNames={classes}
                    key={form.key('skills')}
                    {...form.getInputProps('skills')}
                />
                <TextInput
                    withAsterisk
                    mt="md"
                    label="Years of Experience"
                    placeholder="Example: 2"
                    classNames={classes}
                    key={form.key('experience_years')}
                    {...form.getInputProps('experience_years')}
                />

                <Button type="submit" className={classes.control}
                    mt="md" size="md">
                    {
                        (location.pathname === `/companyProfile/addEmployee/${params.company_id}`) ?
                            "Add" : "Update"
                    }
                </Button>
            </form>
        </Container >
    );
}