import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Center, Modal, Text } from '@mantine/core';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useMantineTheme } from '@mantine/core';

function AlertMessage({ opened, close, message, buttonText, buttonAction }) {
    const theme = useMantineTheme();
    const blueColor = theme.colors.blue[6];
    const title = <Text fw={700} style={{ color: blueColor }} >
        <FontAwesomeIcon style={{ color: blueColor }} icon={faCircleInfo} />
        &nbsp;Alert
    </Text>
    return (

        <Modal opened={opened} onClose={close} title={title} centered>
            {message}
            {buttonText && <Box mt="md" align="end">
                <Button onClick={buttonAction} color='red' mt="md" align="center">
                    {buttonText}
                </Button></Box>}
        </Modal>
    );
}

export default AlertMessage;