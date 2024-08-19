import { useRef } from 'react';
import { Switch, Text, Group, Button, rem, useMantineTheme, Container, SimpleGrid, Center, Loader } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
// import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faXmark, faFileArrowDown, faCircleCheck, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import classes from './UploadTemplate.module.scss';
import { useState } from 'react';
import pdfToText from 'react-pdftotext';
import axios from 'axios';
import MarkdownRenderer from '../MarkdownRenderer/MarkdownRenderer';
import ResponseEditor from '../ResponseEditor/ResponseEditor';

export default function UploadTemplate({ handleActiveStep, handleNextStep }) {
    const openRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [pdfContent, setPdfContent] = useState('');
    const [pdfSummary, setPdfSummary] = useState('');
    const [generateResponse, setGenerateResponse] = useState('');
    const [mdText, setMdText] = useState('');
    const [summaryLoader, setSummaryLoader] = useState(false);
    const [proposalLoader, setProposalLoader] = useState(false);
    const [companyDetail, setCompanyDetail] = useState({});
    const [switchValue, setSwitchValue] = useState(false);
    const handleDrop = (droppedFiles) => {
        setFiles(droppedFiles);
        setSelectedFile(droppedFiles[0]);
        extractText(droppedFiles[0]);
        readTemplate();
        getCompanyDetails();
        handleNextStep();
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
            let url = "";
            switchValue ?
                url = `${import.meta.env.VITE_API_URL}/ollama/generate/summarize` :
                url = `${import.meta.env.VITE_API_URL}/generate/summarize`;
            const response = await axios.post(url,
                {
                    prompt: pdfContent,
                });
            setPdfSummary(response.data);
            setSummaryLoader(false);
            handleNextStep();
            console.log("summary", response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProposalResponseFromAI = async () => {
        try {
            setProposalLoader(true);
            let url = "";
            switchValue ?
                url = `${import.meta.env.VITE_API_URL}/ollama/generate`
                : url = `${import.meta.env.VITE_API_URL}/generate`;
            const response = await axios.post(url,
                {
                    prompt: pdfSummary,
                    template: mdText,
                    companyDetail: companyDetail
                });
            setGenerateResponse(response.data);
            setProposalLoader(false);
            handleNextStep();
        } catch (error) {
            console.error(error);
        }
    };

    const getCompanyDetails = async () => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/company/${sessionStorage.getItem('user_id')}`;
            const response = await axios.get(url);
            setCompanyDetail(response.data);
            return;
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container>
            <Container>
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
                                    <FontAwesomeIcon icon={faUpload} style={{ width: rem(30), height: rem(50) }} stroke={1.5} />
                                </Dropzone.Idle> : <Dropzone.Idle />}
                            </Group>
                            {
                                selectedFile ? (
                                    <Center mx="auto">
                                        <Container content='center'>
                                            <h2 style={{ textAlign: 'center', margin: '8px' }} className={classes.title}>Selected File</h2>
                                            <Center>
                                                <FontAwesomeIcon icon={faFilePdf} bounce
                                                    style={{ color: 'lightblue', width: rem(30), height: rem(30) }} />
                                            </Center>
                                            <Text mt="md" style={{ textAlign: 'center' }}>{selectedFile.name}</Text>
                                            <Text c="dimmed" style={{ fontSize: '12px', textAlign: 'center', marginBottom: '8px' }}>
                                                {selectedFile.size} bytes
                                            </Text>
                                        </Container>
                                    </Center>
                                ) :
                                    (
                                        <Container content='center'>
                                            <Text ta="center" fw={700} fz="lg" mt="sm">
                                                <Dropzone.Accept>Drop files here</Dropzone.Accept>
                                                <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
                                                <Dropzone.Idle>Upload RFP Document</Dropzone.Idle>
                                            </Text>
                                            <Text ta="center" fz="sm" mt="xs" mb="xs" c="dimmed">
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
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Center mt="xl">
                        <Switch size="xl" onLabel="OLLAMA" offLabel="GOOGLE GEMINI"
                            onChange={(event) => {
                                setSwitchValue(event.target.checked);
                                setGenerateResponse(null);
                                setPdfSummary(null);
                            }}
                        />
                    </Center>
                    <Center mt="sm">
                        <Text fz="sm" c="dimmed" align="center">
                            OLLAMA (basic) or GOOGLE GEMINI<br />
                            {switchValue ?
                                "OLLAMA: Slow response time, less good response, data not sent to third party" :
                                "GOOGLE GEMINI: Fast response time, good response, data sent to third party"}</Text>
                    </Center>
                    <Center mt="xl">{
                        pdfSummary ?
                            <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'green', width: rem(50), height: rem(50) }} />
                            : (summaryLoader && <Loader size={rem(100)} />)
                    }</Center>
                    <Button className={classes.controlSummarize} size="md" radius="xl"
                        onClick={() => fetchResponseFromAI()}>
                        Process RFP Document
                    </Button>
                </div>
                <div>
                    <Center mt="xl">{
                        generateResponse ?
                            <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'green', width: rem(50), height: rem(50) }} />
                            : ((proposalLoader) && <Loader size={rem(100)} />)
                    }</Center>
                    <Button className={classes.controlGenerate} size="md" radius="xl"
                        onClick={() => fetchProposalResponseFromAI()}>
                        Generate Proposal
                    </Button>
                </div>
            </Container>
            <Group mt="xl" mb="xl" mx="auto">
                {
                    generateResponse &&
                    <ResponseEditor content={generateResponse.slice(generateResponse.indexOf('```html') + 8,
                        generateResponse.lastIndexOf('```'))} />
                }
            </Group>
        </Container >
    );
}