import { Button, Select, TextInput } from '@mantine/core';
import classes from './AddCompany.module.scss';
import { Link } from 'react-router-dom';

export default function AddCompany() {
    return (
        <form className='add-company'>
            <TextInput label="Company Name"
                placeholder="ABC Products Ltd."
                classNames={classes} />

            <TextInput
                mt="md"
                label="Industry"
                placeholder="Technology/IT"
                classNames={classes}
            />

            <TextInput
                mt="md"
                label="Founded"
                placeholder="2024"
                classNames={classes}
            />

            <TextInput
                mt="md"
                label="Headquarters City"
                placeholder="Vanouver"
                classNames={classes}
            />

            <TextInput
                mt="md"
                label="Headquarters State"
                placeholder="British Columbia"
                classNames={classes}
            />

            <TextInput
                mt="md"
                label="Headquarters Country"
                placeholder="Canada"
                classNames={classes}
            />

            <TextInput
                label="Company Background"
                placeholder="Description of company"
                classNames={classes}
            />

            <Select
                mt="md"
                comboboxProps={{ withinPortal: true }}
                data={['React', 'Angular', 'Svelte', 'Vue']}
                placeholder="Pick one"
                label="Your favorite library/framework"
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