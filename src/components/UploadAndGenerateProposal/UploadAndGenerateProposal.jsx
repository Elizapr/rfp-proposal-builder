import { Text, Group, Button, rem, Container, Center, Loader } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import classes from './UploadAndGenerateProposal.module.scss';
import { useState } from 'react';
import pdfToText from 'react-pdftotext';
import axios from 'axios';
import ResponseEditor from '../ResponseEditor/ResponseEditor';
import ToggleAI from '../ToggleAI/ToggleAI';
import FileDropZone from '../FileDropZone/FileDropZone';
import AlertMessage from '../AlertMessage/AlertMessage';
import { useDisclosure } from '@mantine/hooks';

export default function UploadAndGenerateProposal({ handleActiveStep, handleNextStep }) {
    const [alertOpened, { open, close }] = useDisclosure(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [pdfContent, setPdfContent] = useState('');
    const [pdfSummary, setPdfSummary] = useState('');
    const [generateResponse, setGenerateResponse] = useState('');
    const [summaryLoader, setSummaryLoader] = useState(false);
    const [proposalLoader, setProposalLoader] = useState(false);
    const [companyDetail, setCompanyDetail] = useState({});
    const [switchValue, setSwitchValue] = useState(false);
    const onSwitchToggled = (event) => {
        setSwitchValue(event.target.checked);
        setGenerateResponse(null);
        setPdfSummary(null);
    }
    const handleDrop = (droppedFiles) => {
        setFiles(droppedFiles);
        setSelectedFile(droppedFiles[0]);
        extractText(droppedFiles[0]);
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

    const fetchResponseFromAI = async () => {
        if (!selectedFile) {
            setAlertMessage("Please select a pdf file to proceed.");
            open();
            return;
        }
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
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProposalResponseFromAI = async () => {
        if (!selectedFile) {
            setAlertMessage("Please select a pdf file to proceed.");
            open();
            return;
        } else if (!pdfSummary) {
            setAlertMessage("Please process the RFP document to generate.");
            open();
            return;
        }
        try {
            setProposalLoader(true);
            let url = "";
            switchValue ?
                url = `${import.meta.env.VITE_API_URL}/ollama/generate`
                : url = `${import.meta.env.VITE_API_URL}/generate`;
            const response = await axios.post(url,
                {
                    prompt: pdfSummary,
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
            <AlertMessage opened={alertOpened} close={close} message={alertMessage} buttonText="" buttonAction={() => { }} />
            <Container>
                <FileDropZone handleDrop={handleDrop} selectedFile={selectedFile} />

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <ToggleAI switchValue={switchValue} onSwitchToggled={onSwitchToggled} handleActiveStep={handleActiveStep} />

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
            {
                generateResponse &&
                <Group mt="xl" mb="xl" mx="auto">
                    <ResponseEditor content={generateResponse.slice(generateResponse.indexOf('```html') + 8,
                        generateResponse.lastIndexOf('```'))} />
                </Group>
            }
        </Container >
    );
}