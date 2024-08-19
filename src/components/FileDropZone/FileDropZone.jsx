import { useRef } from 'react';
import { Text, Group, Button, rem, useMantineTheme, Container, SimpleGrid, Center, Loader } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import classes from './FileDropZone.module.scss';
import { useState } from 'react';

function FileDropZone({ handleDrop, selectedFile }) {
    const openRef = useRef(null);
    const theme = useMantineTheme();
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
                <div style={{ pointerEvents: 'none', border: '1px dashed lightBlue' }}>
                    <Group justify="center">
                        {!selectedFile ? <Dropzone.Idle>
                            <FontAwesomeIcon color='lightblue' icon={faUpload} style={{ width: rem(30), height: rem(50) }} stroke={1.5} />
                        </Dropzone.Idle> : <Dropzone.Idle />}
                    </Group>
                    {
                        selectedFile ? (
                            <Center mx="auto">
                                <Container content='center'>
                                    <h3 style={{ textAlign: 'center', margin: '8px' }} className={classes.title}>
                                        Selected File
                                    </h3>
                                    <Center>
                                        <FontAwesomeIcon icon={faFilePdf} bounce
                                            style={{ color: 'lightblue', width: rem(30), height: rem(30) }} />
                                    </Center>
                                    <Text mt="xs" style={{ textAlign: 'center' }}>{selectedFile.name}</Text>
                                    <Text c="dimmed" style={{ fontSize: '12px', textAlign: 'center', marginBottom: '8px' }}>
                                        {selectedFile.size} bytes
                                    </Text>
                                </Container>
                            </Center>
                        ) :
                            (
                                <Container content='center'>
                                    <Text ta="center" fw={700} fz="lg">
                                        <Dropzone.Accept>Drop files here</Dropzone.Accept>
                                        <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
                                        <Dropzone.Idle>Upload RFP Document</Dropzone.Idle>
                                    </Text>
                                    <Text ta="center" fz="sm" mb="xs" c="dimmed">
                                        Drag&apos;n&apos;drop files here to upload. We can accept only <i>.pdf</i> files.
                                    </Text>
                                </Container>
                            )}
                </div>
            </Dropzone>

            <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.(handleDrop)}>
                Select file
            </Button>
        </div >
    )
}

export default FileDropZone
