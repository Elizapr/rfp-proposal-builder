import { useState } from 'react';
import { Stepper, Button, Group, Center, Text } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classes from './ProposalStepper.module.scss'
import { Container, Divider } from '@mantine/core';

function ProposalStepper({ active }) {
  // const [active, setActive] = useState(1);
  // const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  // const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Container mx="auto" className={classes.proposalStepperContainer} >
        <Stepper

          active={active}
          onStepClick={() => { }}
          onClick={() => { }}
          allowNextStepsSelect={false}>
          <Stepper.Step label="First step" description="Choose RFP Pdf document">
            <Divider my="xs" label="Step 1: Choose RFP Pdf document" labelPosition="center" />
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Process RFP Document">
            <Divider my="xs" color='blue' label={
              <Text c='blue' size="xs">
                Step 2: Process RFP Document
              </Text>
            } labelPosition="center" />
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Generate Proposal using AI">
            <Divider my="xs" color='orange' label={
              <Text c='orange' size="xs">
                Step 3: Generate Proposal using AI
              </Text>
            } labelPosition="center" />
          </Stepper.Step>
          <Stepper.Completed>
            <Divider my="xs" color='green' label={
              <Text c='green' size="xs">
                Proposal Created&nbsp;&nbsp;
                <FontAwesomeIcon color='green' icon={faCheckCircle} size="sm" />
              </Text>
            } labelPosition="center" />


          </Stepper.Completed>
        </Stepper>

        {/* <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group> */}
      </Container>
    </>
  );
}

export default ProposalStepper;