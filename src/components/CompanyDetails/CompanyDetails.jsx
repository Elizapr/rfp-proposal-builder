import React from 'react'
import { Divider, Box, Container, Group, Text, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

function CompanyDetails() {
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

    return (
        <Box pos="relative">
            <Group mt="xl" gap={30}>
                <div style={{ flex: 1 }}>
                    <Text fz="h2" fw={700} style={{ lineHeight: 1 }}>
                        Company Details
                    </Text>
                </div>

                <Link to="/company/add">
                    <Button radius="xl" >
                        Edit
                    </Button>
                </Link>
            </Group>
            <Text mt="md">
                {companyDetails.company.name}
            </Text>
            <Divider my="xs" label="Industry" labelPosition="left" />
            <Text >
                {companyDetails.company.industry}
            </Text>
            <Divider my="xs" label="Company founded" labelPosition="left" />
            <Text >
                {companyDetails.company.founded}
            </Text>
            <Divider my="xs" label="Location" labelPosition="left" />
            <Text >
                {`${companyDetails.company.headquarters.city}, ${companyDetails.company.headquarters.state}, ${companyDetails.company.headquarters.country}`}
            </Text>
            <Divider my="xs" label="Background" labelPosition="left" />
            <Text >{`Background: ${companyDetails.company.background}`}
            </Text>
        </Box>)
}

export default CompanyDetails;
