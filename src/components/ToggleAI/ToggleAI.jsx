import { Switch, Text, Center } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import classes from './ToggleAI.module.scss'

function ToggleAI({ switchValue, onSwitchToggled, handleActiveStep }) {
    const theme = useMantineTheme();
    const ollamaText =
        <Text className={classes.switchLabel} fw={600} c='white'>
            &nbsp;
            OLLAMA
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Text>
    const googleGeminiText =
        <Text fw={600}
            c={theme.colors.blue[6]}>
            GOOGLE GEMINI&nbsp;&nbsp;
        </Text>
    return (
        <div>
            <Center mt="xl">
                <Switch size="xl" onLabel={ollamaText} offLabel={googleGeminiText}
                    onChange={(event) => {
                        onSwitchToggled(event);
                        handleActiveStep(1);
                    }}
                />
            </Center>
            <Center mt="sm">
                <Text fz="xs" c='dimmed' align="center">
                    OLLAMA (basic) or GOOGLE GEMINI<br />
                    {switchValue ?
                        "OLLAMA: Slow response time, less good response, data not sent to third party" :
                        "GOOGLE GEMINI: Fast response time, good response, data sent to third party"}</Text>
            </Center>
        </div>
    )
}

export default ToggleAI
