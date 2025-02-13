import React from 'react'
import { Divider, Box, Container, Group, Text, Button, Blockquote, Collapse, Spoiler } from '@mantine/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faArrowDown, faArrowUp, faCircleArrowDown, faCircleChevronDown, faCircleChevronUp, faCircleMinus, faCirclePlus, faInfo, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDisclosure } from '@mantine/hooks';

function CompanyDetails({ company, onChangeList }) {
    const [opened, { toggle }] = useDisclosure(true);
    const user_id = sessionStorage.getItem('user_id');
    const navigate = useNavigate();
    const getCompany = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/company/${user_id}`);
            if (response.data.length === 0) {
                onChangeList(response.data[0]);
                return;
            } else {
                onChangeList(response.data);
            }
        } catch (error) {
            onChangeList([]);
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
                    !company || company?.length === 0 ?
                        <Link to="/companyProfile/addCompany">
                            <Button radius="xl" >
                                Add Company Details
                            </Button>
                        </Link>
                        :
                        <Link to={`/companyProfile/editCompany/${company?.id}`}>
                            <Button radius="xl" >
                                Edit
                            </Button>
                        </Link>
                }
            </Group>
            {!company || company?.length === 0 ?
                <Blockquote color="blue" icon={<FontAwesomeIcon icon={faInfo} />} mt="xl">
                    <Text align="center">
                        No Company Details added
                    </Text>
                </Blockquote>
                :
                <Container>
                    <Text mt="md" fw={600}>
                        {company?.name}
                    </Text>
                    <Container onClick={() => { toggle() }}
                        style={{ padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Divider my="xs" size="sm" color='lightblue' label={<Text c='lightblue' fw={600}> Other Details</Text>} labelPosition="left" style={{ flex: 1 }} />
                        <FontAwesomeIcon icon={opened ? faCircleChevronUp : faCircleChevronDown} color='lightblue' />
                    </Container>
                    <Collapse in={opened}>
                        <Blockquote color="blue" icon={null} style={{ padding: '10px 16px' }}>
                            <Divider my="xs" label="Industry" labelPosition="left" />
                            <Text >
                                {company?.industry}
                            </Text>
                            <Divider my="xs" label="Company founded" labelPosition="left" />
                            <Text >
                                {company?.founded}
                            </Text>
                            <Divider my="xs" label="Location" labelPosition="left" />
                            <Text >
                                {`${company?.city}, ${company?.state}, ${company?.country}`}
                            </Text>
                            <Divider my="xs" label="Background" labelPosition="left" />
                            <Spoiler maxHeight={75} showLabel="Show more" hideLabel="Hide">
                                <Text >
                                    {`${company?.background}`}
                                </Text>
                            </Spoiler>
                        </Blockquote>
                    </Collapse>
                </Container>
            }
        </Box >)
}

export default CompanyDetails;
