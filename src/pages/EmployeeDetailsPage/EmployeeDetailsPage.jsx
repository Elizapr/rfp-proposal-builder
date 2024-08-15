import { Container, Avatar, Badge, Table, Group, Text, ActionIcon, Anchor, rem, Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import classes from './EmployeeDetailsPage.module.scss'
import { Link } from 'react-router-dom';
import CompanyDetails from '../../components/CompanyDetails/CompanyDetails';

const data = [
    {
        avatar:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
        name: 'Robert Wolfkisser',
        job: 'Engineer',
        experience: '1',
        phone: '+44 (452) 886 09 12',
    },
    {
        avatar:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
        name: 'Jill Jailbreaker',
        job: 'Engineer',
        experience: '3',
        phone: '+44 (934) 777 12 76',
    },
    {
        avatar:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
        name: 'Henry Silkeater',
        job: 'Developer',
        experience: '3',
        phone: '+44 (901) 384 88 34',
    },
    {
        avatar:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
        name: 'Bill Horsefighter',
        job: 'Designer',
        experience: '2',
        phone: '+44 (667) 341 45 22',
    },
    {
        avatar:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
        name: 'Jeremy Footviewer',
        job: 'Manager',
        experience: '5',
        phone: '+44 (881) 245 65 65',
    },
];
const jobColors = {
    engineer: 'blue',
    manager: 'cyan',
    designer: 'pink',
    developer: 'orange',
};


export default function EmployeeDetailsPage() {
    const rows = data.map((item) => (
        <Table.Tr key={item.name}>
            <Table.Td>
                <Group gap="sm">
                    <Avatar size={30} src={item.avatar} radius={30} />
                    <Text fz="sm" fw={500}>
                        {item.name}
                    </Text>
                </Group>
            </Table.Td>

            <Table.Td>
                <Badge color={jobColors[item.job.toLowerCase()]} variant="light">
                    {item.job}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Anchor component="button" size="sm">
                    {item.experience}
                </Anchor>
            </Table.Td>
            <Table.Td>
                <Group gap={10} justify="flex-end">
                    <ActionIcon variant="subtle" color="gray">
                        <FontAwesomeIcon icon={faUserEdit} style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="red">
                        <FontAwesomeIcon icon={faTrashCan} style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    const emptyRows = (
        <Table.Tr>
            <Table.Td colSpan={5}>
                <Text color="dimmed" align="center">
                    No Employee Added
                </Text>
            </Table.Td>
        </Table.Tr>
    );

    return (
        <Container mx="auto">
            <CompanyDetails />
            <Group mt="xl" gap={30}>
                <div style={{ flex: 1 }}>
                    <Text fz="h2" fw={700} style={{ lineHeight: 1 }}>
                        Employee List
                    </Text>
                </div>

                <Link to="/employee/add">
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
                    <Table.Tbody>{data.length > 0 ? rows : emptyRows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Container>
    );
}
