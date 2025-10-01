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

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${designTokens.spacing.xxl};
`;

const PageTitle = styled.h1`
  font-size: ${designTokens.typography.fontSize.h2};
  margin-bottom: ${designTokens.spacing.md};
`;

const PageSubtitle = styled.p`
  font-size: ${designTokens.typography.fontSize.body};
  color: ${designTokens.colors.text.secondary.light};
  max-width: 700px;
  margin: 0 auto;
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const PaymentMethodsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${designTokens.spacing.lg};
  margin: ${designTokens.spacing.xxl} 0;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PaymentMethodCard = styled(Card)`
  text-align: center;
  padding: ${designTokens.spacing.xl};
`;

const PaymentIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${designTokens.colors.primary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${designTokens.spacing.lg};
  font-size: 32px;
  color: white;
`;

const PaymentTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.h3};
  margin-bottom: ${designTokens.spacing.md};
`;

const PaymentDescription = styled.p`
  color: ${designTokens.colors.text.secondary.light};
  margin-bottom: ${designTokens.spacing.lg};
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${designTokens.typography.fontSize.h2};
  margin: ${designTokens.spacing.xxl} 0 ${designTokens.spacing.lg};
  text-align: center;
`;

const DemoSection = styled.div`
  background: ${designTokens.colors.cardBgLight};
  border-radius: ${designTokens.borders.radius.medium};
  padding: ${designTokens.spacing.xl};
  margin: ${designTokens.spacing.xxl} 0;
  
  .dark-mode & {
    background: ${designTokens.colors.cardBgDark};
  }
`;

const DemoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${designTokens.spacing.lg};
`;

const DemoTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.h3};
  margin: 0;
`;

const PaymentOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${designTokens.spacing.md};
  margin: ${designTokens.spacing.lg} 0;
`;

const PaymentOption = styled.button<{ selected: boolean }>`
  flex: 1;
  min-width: 120px;
  padding: ${designTokens.spacing.lg};
  border-radius: ${designTokens.borders.radius.small};
  border: 2px solid ${props => props.selected ? designTokens.colors.primary.indigo : 'rgba(0, 0, 0, 0.1)'};
  background: ${designTokens.colors.background.light};
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  
  .dark-mode & {
    background: ${designTokens.colors.background.dark};
    border: 2px solid ${props => props.selected ? designTokens.colors.primary.indigo : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const PaymentOptionIcon = styled.div`
  font-size: 24px;
  margin-bottom: ${designTokens.spacing.sm};
`;

const PaymentOptionName = styled.div`
  font-weight: ${designTokens.typography.fontWeight.medium};
`;

const FormSection = styled.div`
  margin: ${designTokens.spacing.xl} 0;
`;

const FormGroup = styled.div`
  margin-bottom: ${designTokens.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${designTokens.spacing.sm};
  font-weight: ${designTokens.typography.fontWeight.medium};
  color: ${designTokens.colors.text.primary.light};
  
  .dark-mode & {
    color: ${designTokens.colors.text.primary.dark};
  }
`;

const Input = styled.input`
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
`;

const CloudServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${designTokens.spacing.lg};
  margin: ${designTokens.spacing.xxl} 0;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CloudServiceCard = styled(Card)`
  display: flex;
  align-items: flex-start;
  gap: ${designTokens.spacing.md};
  padding: ${designTokens.spacing.lg};
`;

const CloudIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${designTokens.colors.secondary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  color: white;
`;

const CloudContent = styled.div``;

const CloudTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.h3};
  margin: 0 0 ${designTokens.spacing.xs};
`;

const CloudDescription = styled.p`
  color: ${designTokens.colors.text.secondary.light};
  margin: 0;
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const PaymentIntegrationPage = () => {
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Processing payment with:', { selectedPayment, cardNumber, expiry, cvv, upiId });
    // In a real app, this would process the payment
  };
  
  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: '💳' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
    { id: 'wallet', name: 'Mobile Wallet', icon: '📱' },
    { id: 'cod', name: 'Cash on Delivery', icon: '💵' }
  ];
  
  return (
    <Layout>
      <Head>
        <title>Payment & Cloud Integration - InstantFixer</title>
        <meta name="description" content="Payment and cloud services integration for InstantFixer" />
      </Head>
      
      <PageContainer className="container">
        <PageHeader>
          <PageTitle>Payment & Cloud Integration</PageTitle>
          <PageSubtitle>
            Secure payment processing and cloud services integration for the InstantFixer platform.
          </PageSubtitle>
        </PageHeader>
        
        <SectionTitle>Payment Methods</SectionTitle>
        
        <PaymentMethodsGrid>
          <PaymentMethodCard>
            <PaymentIcon>💳</PaymentIcon>
            <PaymentTitle>UPI Payments</PaymentTitle>
            <PaymentDescription>
              Seamless payments through Google Pay, PhonePe, Paytm, and other UPI apps.
            </PaymentDescription>
            <Button variant="primary">Integrate UPI</Button>
          </PaymentMethodCard>
          
          <PaymentMethodCard>
            <PaymentIcon>💳</PaymentIcon>
            <PaymentTitle>Card Payments</PaymentTitle>
            <PaymentDescription>
              Accept all major credit and debit cards with secure processing.
            </PaymentDescription>
            <Button variant="primary">Integrate Cards</Button>
          </PaymentMethodCard>
          
          <PaymentMethodCard>
            <PaymentIcon>🏦</PaymentIcon>
            <PaymentTitle>Net Banking</PaymentTitle>
            <PaymentDescription>
              Direct bank transfers from all major Indian banks.
            </PaymentDescription>
            <Button variant="primary">Integrate Net Banking</Button>
          </PaymentMethodCard>
          
          <PaymentMethodCard>
            <PaymentIcon>📱</PaymentIcon>
            <PaymentTitle>Mobile Wallets</PaymentTitle>
            <PaymentDescription>
              Support for Paytm, Amazon Pay, and other mobile wallets.
            </PaymentDescription>
            <Button variant="primary">Integrate Wallets</Button>
          </PaymentMethodCard>
          
          <PaymentMethodCard>
            <PaymentIcon>💵</PaymentIcon>
            <PaymentTitle>Cash on Delivery</PaymentTitle>
            <PaymentDescription>
              Traditional payment option for user convenience.
            </PaymentDescription>
            <Button variant="primary">Enable COD</Button>
          </PaymentMethodCard>
        </PaymentMethodsGrid>
        
        <SectionTitle>Payment Demo</SectionTitle>
        
        <DemoSection>
          <DemoHeader>
            <DemoTitle>Process a Payment</DemoTitle>
            <Button variant="primary" onClick={handlePaymentSubmit}>Pay ₹1,299</Button>
          </DemoHeader>
          
          <PaymentOptions>
            {paymentMethods.map((method) => (
              <PaymentOption
                key={method.id}
                selected={selectedPayment === method.id}
                onClick={() => setSelectedPayment(method.id)}
              >
                <PaymentOptionIcon>{method.icon}</PaymentOptionIcon>
                <PaymentOptionName>{method.name}</PaymentOptionName>
              </PaymentOption>
            ))}
          </PaymentOptions>
          
          <FormSection>
            {selectedPayment === 'card' && (
              <form onSubmit={handlePaymentSubmit}>
                <FormGroup>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    type="text"
                    id="expiry"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    type="text"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                  />
                </FormGroup>
              </form>
            )}
            
            {selectedPayment === 'upi' && (
              <form onSubmit={handlePaymentSubmit}>
                <FormGroup>
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    type="text"
                    id="upiId"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                  />
                </FormGroup>
              </form>
            )}
            
            {(selectedPayment === 'netbanking' || selectedPayment === 'wallet' || selectedPayment === 'cod') && (
              <p style={{ 
                textAlign: 'center', 
                color: designTokens.colors.text.secondary.light,
                padding: designTokens.spacing.xl
              }}>
                {selectedPayment === 'netbanking' && 'You will be redirected to your bank\'s secure page to complete the payment.'}
                {selectedPayment === 'wallet' && 'You will be redirected to your mobile wallet app to complete the payment.'}
                {selectedPayment === 'cod' && 'You will pay in cash when the service is completed.'}
              </p>
            )}
          </FormSection>
        </DemoSection>
        
        <SectionTitle>Cloud Services Integration</SectionTitle>
        
        <CloudServicesGrid>
          <CloudServiceCard>
            <CloudIcon>☁️</CloudIcon>
            <CloudContent>
              <CloudTitle>AWS Integration</CloudTitle>
              <CloudDescription>
                Scalable cloud infrastructure for storage, computing, and analytics.
              </CloudDescription>
            </CloudContent>
          </CloudServiceCard>
          
          <CloudServiceCard>
            <CloudIcon>💾</CloudIcon>
            <CloudContent>
              <CloudTitle>File Storage</CloudTitle>
              <CloudDescription>
                Secure cloud storage for user documents, helper portfolios, and certificates.
              </CloudDescription>
            </CloudContent>
          </CloudServiceCard>
          
          <CloudServiceCard>
            <CloudIcon>📧</CloudIcon>
            <CloudContent>
              <CloudTitle>Email Services</CloudTitle>
              <CloudDescription>
                Reliable email delivery for notifications, confirmations, and communications.
              </CloudDescription>
            </CloudContent>
          </CloudServiceCard>
          
          <CloudServiceCard>
            <CloudIcon>📊</CloudIcon>
            <CloudContent>
              <CloudTitle>Analytics</CloudTitle>
              <CloudDescription>
                Real-time analytics and business intelligence from cloud data services.
              </CloudDescription>
            </CloudContent>
          </CloudServiceCard>
        </CloudServicesGrid>
      </PageContainer>
    </Layout>
  );
};

export default PaymentIntegrationPage;