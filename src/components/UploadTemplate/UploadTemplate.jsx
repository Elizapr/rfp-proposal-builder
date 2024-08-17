import { useRef } from 'react';
import { Text, Group, Button, rem, useMantineTheme, Container, SimpleGrid, Center } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
// import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faXmark, faFileArrowDown, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import classes from './UploadTemplate.module.scss';
import { useState } from 'react';

export default function UploadTemplate() {
    const theme = useMantineTheme();
    const openRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDrop = (droppedFiles) => {
        setFiles(droppedFiles);
        setSelectedFile(droppedFiles[0]);
    };

    return (
        <div className={classes.wrapper}>
            <Dropzone
                openRef={openRef}
                onDrop={handleDrop}
                className={classes.dropzone}
                radius="md"
                accept={[MIME_TYPES.pdf]}
                maxSize={30 * 1024 ** 2}
            >

                <div style={{ pointerEvents: 'none' }}>
                    <Group justify="center">

                        {!selectedFile ? <Dropzone.Idle>
                            <FontAwesomeIcon icon={faUpload} style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
                        </Dropzone.Idle> : <Dropzone.Idle />}
                    </Group>
                    {
                        selectedFile ? (
                            <Center mx="auto">
                                <Container content='center'>
                                    <h2 style={{ textAlign: 'center' }} className={classes.title}>Selected File</h2>
                                    <Center>
                                        <FontAwesomeIcon icon={faFilePdf} style={{ width: rem(50), height: rem(50) }} />
                                    </Center>
                                    <Text mt="md" style={{ textAlign: 'center' }}>{selectedFile.name}</Text>
                                    <Text c="dimmed" style={{ fontSize: '12px', textAlign: 'center' }}>{selectedFile.size} bytes</Text>
                                </Container>
                            </Center>
                        ) :
                            (
                                <Container content='center'>
                                    <Text ta="center" fw={700} fz="lg" mt="xl">
                                        <Dropzone.Accept>Drop files here</Dropzone.Accept>
                                        <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
                                        <Dropzone.Idle>Upload RFP Document</Dropzone.Idle>
                                    </Text>
                                    <Text ta="center" fz="sm" mt="xs" c="dimmed">
                                        Drag&apos;n&apos;drop files here to upload. We can accept only <i>.pdf</i> files that
                                        are less than 30mb in size.
                                    </Text>
                                </Container>
                            )}
                </div>
            </Dropzone>

            <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.(handleDrop)}>
                Select file
            </Button>
        </div>
    );
}