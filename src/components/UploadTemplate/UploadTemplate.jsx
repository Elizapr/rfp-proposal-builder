import { useRef } from 'react';
import { Text, Group, Button, rem, useMantineTheme, Container, SimpleGrid, Center, Loader } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
// import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faXmark, faFileArrowDown, faCircleCheck, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import classes from './UploadTemplate.module.scss';
import { useState } from 'react';
import pdfToText from 'react-pdftotext';
import axios from 'axios';
import MarkdownRenderer from '../MarkdownRenderer/MarkdownRenderer';

export default function UploadTemplate() {
    const theme = useMantineTheme();
    const openRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [pdfContent, setPdfContent] = useState('');
    const [pdfSummary, setPdfSummary] = useState('');
    const [generateResponse, setGenerateResponse] = useState('');
    const [mdText, setMdText] = useState('');
    const [summaryLoader, setSummaryLoader] = useState(false);
    const [proposalLoader, setProposalLoader] = useState(false);

    const handleDrop = (droppedFiles) => {
        setFiles(droppedFiles);
        setSelectedFile(droppedFiles[0]);
        extractText(droppedFiles[0]);
        readTemplate();
    };

    const extractText = (files) => {
        const fileReceived = files;
        pdfToText(fileReceived)
            .then(text => {
                let newText = text.replace(/\n/g, ' ');
                newText = newText.replace(/(\r\n|\n|\r)/gm, ' ');
                newText = newText.replace(/(“|”)/g, '');
                newText = newText.split('#').join('\n#');
                setPdfContent(newText);
            })
            .catch(error => console.error("Failed to extract text from pdf", error));
    }

    const readTemplate = async () => {
        try {
            fetch('/rfp-templates/template1.md')
                .then((response) => response.text())
                .then(template => {
                    console.log("template", template);
                    setMdText(template);
                });
        } catch (error) {
            console.error(error);
        }
    }

    const fetchResponseFromAI = async () => {
        try {
            setSummaryLoader(true);
            const url = `${import.meta.env.VITE_API_URL}/generate/summarize`;
            const response = await axios.post(url,
                {
                    prompt: pdfContent,
                });
            setPdfSummary(response.data);
            setSummaryLoader(false);
            console.log("summary", response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProposalResponseFromAI = async () => {
        try {
            setProposalLoader(true);
            const url = `${import.meta.env.VITE_API_URL}/generate`;
            const response = await axios.post(url,
                {
                    prompt: pdfSummary,
                    template: mdText,
                });
            setGenerateResponse(response.data);
            setProposalLoader(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container mx="auto">
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
                                            <FontAwesomeIcon icon={faFilePdf} bounce style={{ color: 'lightblue', width: rem(50), height: rem(50) }} />
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
            </div >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Center mt="xl">{
                    pdfSummary ?
                        <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'green', width: rem(50), height: rem(50) }} />
                        : (summaryLoader && <Loader size={rem(100)} />)
                }</Center>
                <Button className={classes.controlSummarize} size="md" radius="xl"
                    onClick={() => fetchResponseFromAI()}>
                    Process RFP Document
                </Button>
                <Center mt="xl">{
                    generateResponse ?
                        <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'green', width: rem(50), height: rem(50) }} />
                        : ((proposalLoader) && <Loader size={rem(100)} />)
                }</Center>
                <Button className={classes.controlGenerate} size="md" radius="xl"
                    onClick={() => fetchProposalResponseFromAI()}>
                    Generate Proposal
                </Button>
                {/* 
                <Text>{generateResponse
                    .slice(generateResponse.indexOf('```html') + 8,
                        generateResponse.lastIndexOf('```'))}</Text> */}
                {
                    generateResponse &&
                    <MarkdownRenderer data={generateResponse
                        .slice(generateResponse.indexOf('```html') + 8,
                            generateResponse.lastIndexOf('```'))} />}
            </div>
        </Container>
    );
}