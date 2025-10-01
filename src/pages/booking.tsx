import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';

const PageContainer = styled.div`
  padding: ${designTokens.spacing.xl} 0;
`;

const BookingHeader = styled.div`
  text-align: center;
  margin-bottom: ${designTokens.spacing.xxl};
`;

const BookingTitle = styled.h1`
  font-size: ${designTokens.typography.fontSize.h2};
  margin-bottom: ${designTokens.spacing.md};
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: ${designTokens.spacing.xxl} 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  &::before {
    content: '';
    position: absolute;
    top: 14px;
    left: 0;
    right: 0;
    height: 4px;
    background-color: ${designTokens.colors.background.light};
    
    .dark-mode & {
      background-color: ${designTokens.colors.background.dark};
    }
  }
`;

const ProgressStep = styled.div<{ active?: boolean; completed?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  
  .step-number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${designTokens.typography.fontWeight.bold};
    margin-bottom: ${designTokens.spacing.sm};
    
    ${props => props.completed ? `
      background: ${designTokens.colors.primary.gradient};
      color: white;
    ` : props.active ? `
      background: ${designTokens.colors.primary.indigo};
      color: white;
    ` : `
      background: ${designTokens.colors.background.light};
      color: ${designTokens.colors.text.secondary.light};
      
      .dark-mode & {
        background: ${designTokens.colors.background.dark};
        color: ${designTokens.colors.text.secondary.dark};
      }
    `}
  }
  
  .step-label {
    font-size: ${designTokens.typography.fontSize.caption};
    color: ${designTokens.colors.text.secondary.light};
    text-align: center;
    
    .dark-mode & {
      color: ${designTokens.colors.text.secondary.dark};
    }
    
    ${props => (props.active || props.completed) && `
      color: ${designTokens.colors.primary.indigo};
      font-weight: ${designTokens.typography.fontWeight.medium};
      
      .dark-mode & {
        color: ${designTokens.colors.primary.blue};
      }
    `}
  }
`;

const BookingContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: ${designTokens.spacing.xxl};
`;

const SectionTitle = styled.h2`
  font-size: ${designTokens.typography.fontSize.h3};
  margin-bottom: ${designTokens.spacing.lg};
`;

const FormGroup = styled.div`
  margin-bottom: ${designTokens.spacing.lg};
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: ${designTokens.spacing.sm};
  font-weight: ${designTokens.typography.fontWeight.medium};
  color: ${designTokens.colors.text.primary.light};
  
  .dark-mode & {
    color: ${designTokens.colors.text.primary.dark};
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: ${designTokens.spacing.md};
  border-radius: ${designTokens.borders.radius.small};
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${designTokens.colors.background.light};
  color: ${designTokens.colors.text.primary.light};
  font-size: ${designTokens.typography.fontSize.body};
  
  .dark-mode & {
    background-color: ${designTokens.colors.background.dark};
    color: ${designTokens.colors.text.primary.dark};
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  &:focus {
    outline: none;
    border-color: ${designTokens.colors.primary.indigo};
    box-shadow: 0 0 0 3px rgba(59, 10, 255, 0.2);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: ${designTokens.spacing.md};
  border-radius: ${designTokens.borders.radius.small};
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${designTokens.colors.background.light};
  color: ${designTokens.colors.text.primary.light};
  font-size: ${designTokens.typography.fontSize.body};
  
  .dark-mode & {
    background-color: ${designTokens.colors.background.dark};
    color: ${designTokens.colors.text.primary.dark};
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  &:focus {
    outline: none;
    border-color: ${designTokens.colors.primary.indigo};
    box-shadow: 0 0 0 3px rgba(59, 10, 255, 0.2);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: ${designTokens.spacing.md};
  border-radius: ${designTokens.borders.radius.small};
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${designTokens.colors.background.light};
  color: ${designTokens.colors.text.primary.light};
  font-size: ${designTokens.typography.fontSize.body};
  min-height: 120px;
  resize: vertical;
  
  .dark-mode & {
    background-color: ${designTokens.colors.background.dark};
    color: ${designTokens.colors.text.primary.dark};
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  &:focus {
    outline: none;
    border-color: ${designTokens.colors.primary.indigo};
    box-shadow: 0 0 0 3px rgba(59, 10, 255, 0.2);
  }
`;

const ServiceSummary = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${designTokens.spacing.md} 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  .dark-mode & {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const TotalSummary = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${designTokens.spacing.md} 0;
  font-weight: ${designTokens.typography.fontWeight.bold};
  font-size: ${designTokens.typography.fontSize.h3};
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  
  .dark-mode & {
    border-top: 2px solid rgba(255, 255, 255, 0.1);
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${designTokens.spacing.xxl};
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: ${designTokens.spacing.md};
  }
`;

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form states
  const [service, setService] = useState('plumbing');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  
  const steps = [
    { id: 1, label: 'Service' },
    { id: 2, label: 'Date & Time' },
    { id: 3, label: 'Details' },
    { id: 4, label: 'Payment' },
    { id: 5, label: 'Confirmation' }
  ];
  
  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Section>
            <SectionTitle>Select Service</SectionTitle>
            <FormSelect value={service} onChange={(e) => setService(e.target.value)}>
              <option value="plumbing">Plumbing Repair - ₹499</option>
              <option value="electrical">Electrical Work - ₹599</option>
              <option value="cleaning">Deep Cleaning - ₹399</option>
              <option value="tutoring">Tutoring - ₹699</option>
            </FormSelect>
          </Section>
        );
      case 2:
        return (
          <Section>
            <SectionTitle>Select Date & Time</SectionTitle>
            <FormGroup>
              <FormLabel htmlFor="date">Date</FormLabel>
              <FormInput
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="time">Time</FormLabel>
              <FormSelect
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              >
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">01:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
                <option value="17:00">05:00 PM</option>
              </FormSelect>
            </FormGroup>
          </Section>
        );
      case 3:
        return (
          <Section>
            <SectionTitle>Service Details</SectionTitle>
            <FormGroup>
              <FormLabel htmlFor="address">Service Address</FormLabel>
              <FormTextarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full address"
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="notes">Special Instructions (Optional)</FormLabel>
              <FormTextarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special instructions for the helper?"
              />
            </FormGroup>
          </Section>
        );
      case 4:
        return (
          <Section>
            <SectionTitle>Payment Method</SectionTitle>
            <FormSelect value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="upi">UPI - Google Pay, PhonePe, etc.</option>
              <option value="card">Credit/Debit Card</option>
              <option value="netbanking">Net Banking</option>
              <option value="cod">Cash on Delivery</option>
            </FormSelect>
            
            <SectionTitle style={{ marginTop: designTokens.spacing.xxl }}>Order Summary</SectionTitle>
            <ServiceSummary>
              <span>Plumbing Repair</span>
              <span>₹499</span>
            </ServiceSummary>
            <ServiceSummary>
              <span>Service Fee</span>
              <span>₹50</span>
            </ServiceSummary>
            <ServiceSummary>
              <span>Taxes</span>
              <span>₹45</span>
            </ServiceSummary>
            <TotalSummary>
              <span>Total</span>
              <span>₹594</span>
            </TotalSummary>
          </Section>
        );
      case 5:
        return (
          <Section>
            <div style={{ textAlign: 'center', padding: designTokens.spacing.xxl }}>
              <div style={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                background: designTokens.colors.primary.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: 40
              }}>
                ✓
              </div>
              <h2 style={{ marginBottom: designTokens.spacing.md }}>Booking Confirmed!</h2>
              <p style={{ 
                color: designTokens.colors.text.secondary.light,
                marginBottom: designTokens.spacing.xl,
                maxWidth: 500,
                margin: '0 auto 30px'
              }}>
                Your booking has been confirmed. Rajesh Kumar will arrive at your location on {date} at {time}.
              </p>
              <Button variant="primary">View Booking Details</Button>
            </div>
          </Section>
        );
      default:
        return null;
    }
  };
  
  return (
    <Layout>
      <Head>
        <title>Book Service - InstantFixer</title>
        <meta name="description" content="Book a service with a trusted local helper" />
      </Head>
      
      <PageContainer>
        <BookingHeader>
          <BookingTitle>Book a Service</BookingTitle>
          <p style={{ color: designTokens.colors.text.secondary.light, maxWidth: 600, margin: '0 auto' }}>
            Follow the simple steps to book a service with a trusted local helper
          </p>
        </BookingHeader>
        
        <ProgressBar>
          {steps.map((step) => (
            <ProgressStep 
              key={step.id} 
              active={currentStep === step.id}
              completed={currentStep > step.id}
            >
              <div className="step-number">{step.id}</div>
              <div className="step-label">{step.label}</div>
            </ProgressStep>
          ))}
        </ProgressBar>
        
        <BookingContent>
          <Card>
            {renderStepContent()}
            
            {currentStep < 5 && (
              <Actions>
                <Button 
                  variant="secondary" 
                  onClick={handlePrev} 
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleNext}
                >
                  {currentStep === 4 ? 'Confirm & Pay' : 'Next'}
                </Button>
              </Actions>
            )}
          </Card>
        </BookingContent>
      </PageContainer>
    </Layout>
  );
};

export default BookingPage;