import { Blockquote, Container, Avatar, Badge, Table, Group, Text, ActionIcon, Anchor, rem, Button, Center } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faTrashCan, faInfo } from '@fortawesome/free-solid-svg-icons'
import classes from './CompanyProfile.module.scss'
import { Link } from 'react-router-dom';
import CompanyDetails from '../../components/CompanyDetails/CompanyDetails';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { data } from '../../utility/testData';
import { useNavigate } from 'react-router-dom';

const jobColors = {
    engineer: 'blue',
    manager: 'cyan',
    designer: 'pink',
    developer: 'orange',
    dataanalyst: 'grape',
    businessanalyst: 'lime',
    datascientist: 'yellow',
    qa: 'green',
    seniorarchitect: 'red',
    marketing: 'purple',
    seniorsoftwareengineer: 'indigo',
    systemadministrator: 'teal',
    computertechnician: 'violet',
    other: 'gray',
};
export default function CompanyProfile() {
    const [company, setCompany] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [companyId, setCompanyId] = useState(0);
    const navigate = useNavigate();
    const onChangeList = (company) => {
        setCompany(company);
        company && setCompanyId(company.id);
    }
    const getEmployees = async (company_id) => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/employee/${company_id}/employees`
            const response = await axios.get(url);
            setEmployeeList(response.data);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                form.setErrors({
                    email: error.response.data.email || '',
                    password: error.response.data.password || '',
                });
            } else {
                console.log("error", error);
            }
        }
    };

    useEffect(() => {
        company && getEmployees(company.id);
    }, [company, employeeList]);

    const deleteEmployee = async (id) => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/employee/${id}`;
            const response = await axios.delete(url);
            company && getEmployees(companyId);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                form.setErrors({
                    email: error.response.data.email || '',
                    password: error.response.data.password || '',
                });
            } else {
                console.log("error", error);
            }
        }
    }
    const rows = employeeList.map((item) => (
        <Table.Tr key={item.full_name}>
            <Table.Td>
                <Group gap="sm">
                    <Avatar size={30} src={item.avatar} radius={30} />
                    <Text fz="sm" fw={500}>
                        {item.full_name}
                    </Text>
                </Group>
            </Table.Td>

            <Table.Td>
                <Badge color={jobColors[item.job_title.toLowerCase().replace(/\s/g, '')]} variant="light">
                    {item.job_title}
                </Badge>
            </Table.Td>
            <Table.Td align='center'>
                <Anchor component="button" size="sm">
                    {item.experience_years}
                </Anchor>
            </Table.Td>
            <Table.Td>
                <Group gap={10} justify="flex-end">
                    <ActionIcon variant="subtle" color="gray"
                        onClick={() => { navigate(`/companyProfile/${company ? companyId : ''}/edit/${item.id}`) }}>
                        <FontAwesomeIcon icon={faUserEdit} style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="red"
                        onClick={() => { deleteEmployee(item.id) }}>
                        <FontAwesomeIcon icon={faTrashCan} style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));
    const emptyRows = (
        <Table.Tr>
            <Table.Td colSpan={5}>
                <Blockquote color="blue" icon={<FontAwesomeIcon icon={faInfo} />} mt="xl">
                    <Text align="center">
                        No Employee Added
                    </Text>
                </Blockquote>
            </Table.Td>
        </Table.Tr>
    );

    return (
        <Container mx="auto">
            <Center mt="xl">
                <Button
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                    align="center"
                    onClick={() => {
                        company
                            &&
                            employeeList.length > 0
                            &&
                            navigate(`/generate`);
                    }}
                >
                    Generate Proposal
                </Button>
            </Center>
            <CompanyDetails company={company} onChangeList={onChangeList} />
            <Group mt="xl" gap={30}>
                <div style={{ flex: 1 }}>
                    <Text fz="h2" fw={700} style={{ lineHeight: 1 }}>
                        Employee List
                    </Text>
                </div>

                <Link to={`/companyProfile/addEmployee/${company ? companyId : ''}`}>
                    <Button radius="xl" >
                        Add Employee
                    </Button>
                </Link>
            </Group>
            <Table.ScrollContainer mt="xl"
                minWidth={800}>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Employee</Table.Th>
                            <Table.Th>Job title</Table.Th>
                            <Table.Th>Years of Experience</Table.Th>
                            <Table.Th>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{employeeList.length > 0 ? rows : emptyRows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Container>
    );
}
