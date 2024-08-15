import { Button, Select, TextInput } from '@mantine/core';
import classes from './AddEmployee.module.scss';
import { Link } from 'react-router-dom';

export default function AddCompany() {
    return (
        <form className='add-employee'>
            <TextInput
                label="Full Name"
                placeholder="John Smith"
                classNames={classes}
            />
            <TextInput
                mt="md"
                label="Job Title"
                placeholder="Software Engineer"
                classNames={classes}
            />

            <TextInput
                mt="md"
                label="Role"
                placeholder="Works done in the company"
                classNames={classes}
            />
            <TextInput
                mt="md"
                label="Years of Experience"
                placeholder="Example: 2"
                classNames={classes}
            />
            <Link to="/"
                className={classes.control}>
                <Button mt="md" size="md">
                    Add
                </Button>
            </Link>
        </form>
    );
}