import React from 'react'
import { Divider, Box, Container, Group, Text, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CompanyDetails({ company, onChangeList }) {
    const user_id = sessionStorage.getItem('user_id');
    // const [companyList, setCompanyList] = useState([]);
    // const [employeeList, setEmployeeList] = useState([]);
    const navigate = useNavigate();
    const companyDetails = {
        "company": {
            "name": "Tech Innovations Inc.",
            "industry": "Technology",
            "founded": "2010-05-15",
            "headquarters": {
                "city": "Vancouver",
                "state": "British Columbia",
                "country": "Canada"
            },
            "background": "Tech Innovations Inc. specializes in developing cutting-edge software solutions and hardware products for businesses worldwide. With a focus on AI and machine learning, the company aims to drive technological advancements and improve operational efficiency for its clients."
        }
    };

    const getCompany = async () => {
        try {
            console.log("user_id", user_id);
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/company/${user_id}`);
            if (response.data.length === 0) {
                onChangeList(response.data[0]);
                return;
            } else {
                onChangeList(response.data);
            }
        } catch (error) {
            onChangeList([]);
            // if (error.response && error.response.status === 400) {
            //     form.setErrors({
            //         email: error.response.data.email || '',
            //         password: error.response.data.password || '',
            //     });
            // } else {

            // }
        }
    };

    useEffect(() => {
        getCompany();
    }, []);

    return (
        <Box pos="relative">
            <Group mt="xl" gap={30}>
                <div style={{ flex: 1 }}>
                    <Text fz="h2" fw={700} style={{ lineHeight: 1 }}>
                        Company Details
                    </Text>
                </div>
                {
                    company.length === 0 ?
                        <Link to="/companyProfile/addCompany">
                            <Button radius="xl" >
                                Add Company Details
                            </Button>
                        </Link>
                        :
                        <Link to="/companyProfile/addCompany">
                            <Button radius="xl" >
                                Edit
                            </Button>
                        </Link>
                }
            </Group>
            {company.length === 0 ?
                <Text color="dimmed" align="center" mt="xl">
                    No Company Details added
                </Text>
                :
                <Container>
                    <Text mt="md">
                        {company.name}
                    </Text>
                    <Divider my="xs" label="Industry" labelPosition="left" />
                    <Text >
                        {company.industry}
                    </Text>
                    <Divider my="xs" label="Company founded" labelPosition="left" />
                    <Text >
                        {company.founded}
                    </Text>
                    <Divider my="xs" label="Location" labelPosition="left" />
                    <Text >
                        {`${company.city}, ${company.state}, ${company.country}`}
                    </Text>
                    <Divider my="xs" label="Background" labelPosition="left" />
                    <Text >{`${company.background}`}
                    </Text>
                </Container>
            }
        </Box>)
}

export default CompanyDetails;
