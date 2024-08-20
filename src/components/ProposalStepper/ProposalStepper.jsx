import { useState } from 'react';
import { Stepper, Button, Group, Center, Text } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classes from './ProposalStepper.module.scss'
import { Container, Divider } from '@mantine/core';

function ProposalStepper({ active }) {

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
      </Container>
    </>
  );
}

export default ProposalStepper;