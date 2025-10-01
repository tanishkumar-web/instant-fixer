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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${designTokens.spacing.xxl};
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${designTokens.spacing.md};
  }
`;

const PageTitle = styled.h1`
  font-size: ${designTokens.typography.fontSize.h2};
  margin: 0;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${designTokens.spacing.lg};
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BookingsSection = styled.section`
  @media (min-width: 1024px) {
    grid-column: span 2;
  }
`;

const SectionTitle = styled.h2`
  font-size: ${designTokens.typography.fontSize.h3};
  margin-bottom: ${designTokens.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToggleSwitch = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

const SwitchTrack = styled.div<{ enabled: boolean }>`
  width: 40px;
  height: 24px;
  border-radius: 12px;
  background-color: ${props => props.enabled ? designTokens.colors.primary.indigo : '#ccc'};
  position: relative;
  margin-right: 10px;
  transition: background-color 0.3s;
`;

const SwitchThumb = styled.div<{ enabled: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: 2px;
  left: ${props => props.enabled ? '18px' : '2px'};
  transition: left 0.3s;
`;

const BookingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.md};
`;

const BookingCard = styled(Card)`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const BookingInfo = styled.div`
  flex: 1;
  margin-bottom: ${designTokens.spacing.md};
  
  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: ${designTokens.spacing.lg};
  }
`;

const BookingTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.h3};
  margin: 0 0 ${designTokens.spacing.xs};
`;

const BookingDetails = styled.div`
  color: ${designTokens.colors.text.secondary.light};
  margin-bottom: ${designTokens.spacing.sm};
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const BookingStatus = styled.span<{ status: string }>`
  padding: ${designTokens.spacing.xs} ${designTokens.spacing.sm};
  border-radius: ${designTokens.borders.radius.small};
  font-size: ${designTokens.typography.fontSize.caption};
  font-weight: ${designTokens.typography.fontWeight.medium};
  
  ${props => {
    switch (props.status) {
      case 'confirmed':
        return `
          background-color: #E8F5E9;
          color: #4CAF50;
          
          .dark-mode & {
            background-color: #1B5E20;
            color: #A5D6A7;
          }
        `;
      case 'completed':
        return `
          background-color: #E3F2FD;
          color: #2196F3;
          
          .dark-mode & {
            background-color: #0D47A1;
            color: #90CAF9;
          }
        `;
      case 'cancelled':
        return `
          background-color: #FFEBEE;
          color: #F44336;
          
          .dark-mode & {
            background-color: #B71C1C;
            color: #EF9A9A;
          }
        `;
      default:
        return `
          background-color: #FFF3E0;
          color: #FF9800;
          
          .dark-mode & {
            background-color: #E65100;
            color: #FFCC80;
          }
        `;
    }
  }}
`;

const BookingActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.sm};
  
  @media (min-width: 768px) {
    justify-content: center;
  }
`;

const ProfileSection = styled.section``;

const ProfileCard = styled(Card)`
  text-align: center;
`;

const ProfileAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${designTokens.colors.background.dark};
  margin: 0 auto ${designTokens.spacing.md};
  
  .dark-mode & {
    background-color: ${designTokens.colors.background.light};
  }
`;

const ProfileName = styled.h2`
  font-size: ${designTokens.typography.fontSize.h2};
  margin: 0 0 ${designTokens.spacing.sm};
`;

const ProfileInfo = styled.div`
  color: ${designTokens.colors.text.secondary.light};
  margin-bottom: ${designTokens.spacing.lg};
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${designTokens.spacing.md};
  margin-top: ${designTokens.spacing.lg};
`;

const StatCard = styled.div`
  padding: ${designTokens.spacing.md};
  border-radius: ${designTokens.borders.radius.small};
  background-color: ${designTokens.colors.background.light};
  text-align: center;
  
  .dark-mode & {
    background-color: ${designTokens.colors.background.dark};
  }
`;

const StatValue = styled.div`
  font-size: ${designTokens.typography.fontSize.h3};
  font-weight: ${designTokens.typography.fontWeight.bold};
  color: ${designTokens.colors.primary.indigo};
  margin-bottom: ${designTokens.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: ${designTokens.typography.fontSize.caption};
  color: ${designTokens.colors.text.secondary.light};
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const ServicesSection = styled.section``;

const ServicesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.md};
`;

const ServiceCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ServiceInfo = styled.div``;

const ServiceName = styled.h3`
  font-size: ${designTokens.typography.fontSize.body};
  margin: 0 0 ${designTokens.spacing.xs};
`;

const ServicePrice = styled.div`
  font-weight: ${designTokens.typography.fontWeight.bold};
  color: ${designTokens.colors.primary.indigo};
`;

interface Booking {
  id: number;
  customer: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

const bookings: Booking[] = [
  {
    id: 1,
    customer: 'Amit Verma',
    service: 'Plumbing Repair',
    date: '2023-06-15',
    time: '10:00 AM',
    status: 'confirmed'
  },
  {
    id: 2,
    customer: 'Sunita Rao',
    service: 'Installation Service',
    date: '2023-06-16',
    time: '02:00 PM',
    status: 'pending'
  },
  {
    id: 3,
    customer: 'Vikash Gupta',
    service: 'Emergency Plumbing',
    date: '2023-06-17',
    time: '09:00 AM',
    status: 'pending'
  }
];

const services = [
  { id: 1, name: 'Plumbing Repair', price: 499 },
  { id: 2, name: 'Installation Service', price: 599 },
  { id: 3, name: 'Emergency Plumbing', price: 799 }
];

const HelperDashboardPage = () => {
  const [acceptingBookings, setAcceptingBookings] = useState(true);
  
  const toggleAcceptingBookings = () => {
    setAcceptingBookings(!acceptingBookings);
  };
  
  return (
    <Layout>
      <Head>
        <title>Helper Dashboard - InstantFixer</title>
        <meta name="description" content="Your InstantFixer helper dashboard" />
      </Head>
      
      <PageContainer className="container">
        <PageHeader>
          <PageTitle>Helper Dashboard</PageTitle>
          <ToggleSwitch onClick={toggleAcceptingBookings}>
            <SwitchTrack enabled={acceptingBookings}>
              <SwitchThumb enabled={acceptingBookings} />
            </SwitchTrack>
            <span>Accepting Bookings</span>
          </ToggleSwitch>
        </PageHeader>
        
        <DashboardGrid>
          <BookingsSection>
            <SectionTitle>
              <span>My Bookings</span>
              <Button variant="secondary" size="small">View Calendar</Button>
            </SectionTitle>
            <BookingsList>
              {bookings.map((booking) => (
                <BookingCard key={booking.id}>
                  <BookingInfo>
                    <BookingTitle>{booking.service}</BookingTitle>
                    <BookingDetails>
                      for {booking.customer} on {booking.date} at {booking.time}
                    </BookingDetails>
                    <BookingStatus status={booking.status}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </BookingStatus>
                  </BookingInfo>
                  <BookingActions>
                    {booking.status === 'pending' ? (
                      <>
                        <Button variant="primary" size="small">Accept</Button>
                        <Button variant="secondary" size="small">Decline</Button>
                      </>
                    ) : (
                      <Button variant="secondary" size="small">View Details</Button>
                    )}
                  </BookingActions>
                </BookingCard>
              ))}
            </BookingsList>
          </BookingsSection>
          
          <div>
            <ProfileSection>
              <SectionTitle>My Profile</SectionTitle>
              <ProfileCard>
                <ProfileAvatar />
                <ProfileName>Rajesh Kumar</ProfileName>
                <ProfileInfo>
                  Professional Plumber<br />
                  New Delhi, India<br />
                  Rating: 4.9 (128 reviews)
                </ProfileInfo>
                <Button variant="secondary" size="small">Edit Profile</Button>
                
                <StatsGrid>
                  <StatCard>
                    <StatValue>142</StatValue>
                    <StatLabel>Completed</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>₹42,500</StatValue>
                    <StatLabel>Earnings</StatLabel>
                  </StatCard>
                </StatsGrid>
              </ProfileCard>
            </ProfileSection>
            
            <ServicesSection>
              <SectionTitle>
                <span>My Services</span>
                <Button variant="secondary" size="small">Add Service</Button>
              </SectionTitle>
              <ServicesList>
                {services.map((service) => (
                  <ServiceCard key={service.id}>
                    <ServiceInfo>
                      <ServiceName>{service.name}</ServiceName>
                    </ServiceInfo>
                    <ServicePrice>₹{service.price}</ServicePrice>
                  </ServiceCard>
                ))}
              </ServicesList>
            </ServicesSection>
          </div>
        </DashboardGrid>
      </PageContainer>
    </Layout>
  );
};

export default HelperDashboardPage;