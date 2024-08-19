import React from 'react'
import UploadAndGenerateProposal from '../UploadAndGenerateProposal/UploadAndGenerateProposal'
import ProposalStepper from '../ProposalStepper/ProposalStepper'
import { Container, Space } from '@mantine/core'
import { useState } from 'react';

function GenerateProposal() {
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));

    const handleActiveStep = () => {
        setActive(0);
    }
    const handleNextStep = () => {
        nextStep();
    }
    return (
        <Container mx="auto">
            <ProposalStepper active={active} />
            <Space h="100px" />
            <UploadAndGenerateProposal
                handleActiveStep={handleActiveStep}
                handleNextStep={handleNextStep} />
        </Container>
    )
}

export default GenerateProposal
