import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import Gamification from '../components/Gamification';
import IoTIntegration from '../components/IoTIntegration';
import MicroInteractions from '../components/MicroInteractions';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

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
  background: ${designTokens.colors.primary.gradient};
  margin: 0 auto ${designTokens.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 40px;
  font-weight: bold;
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

const Section = styled.section`
  margin: ${designTokens.spacing.xxl} 0;
`;

interface Booking {
  id: number;
  helper: string;
  service: string;
  date: string;
  time: string;
  status: 'upcoming' | 'confirmed' | 'completed' | 'cancelled';
}

const bookings: Booking[] = [
  {
    id: 1,
    helper: 'Rajesh Kumar',
    service: 'Plumbing Repair',
    date: '2023-06-15',
    time: '10:00 AM',
    status: 'confirmed'
  },
  {
    id: 2,
    helper: 'Priya Sharma',
    service: 'Electrical Work',
    date: '2023-05-22',
    time: '02:00 PM',
    status: 'completed'
  },
  {
    id: 3,
    helper: 'Amit Patel',
    service: 'Deep Cleaning',
    date: '2023-04-10',
    time: '09:00 AM',
    status: 'completed'
  }
];

const UserDashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Get initial for avatar
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };
  
  return (
    <ProtectedRoute>
      <Layout>
        <Head>
          <title>Dashboard - InstantFixer</title>
          <meta name="description" content="Your InstantFixer dashboard" />
        </Head>
        
        <PageContainer className="container">
          <PageHeader>
            <PageTitle>My Dashboard</PageTitle>
            <Button variant="primary">Book New Service</Button>
          </PageHeader>
          
          <DashboardGrid>
            <BookingsSection>
              <SectionTitle>My Bookings</SectionTitle>
              <BookingsList>
                {bookings.map((booking) => (
                  <BookingCard key={booking.id}>
                    <BookingInfo>
                      <BookingTitle>{booking.service}</BookingTitle>
                      <BookingDetails>
                        with {booking.helper} on {booking.date} at {booking.time}
                      </BookingDetails>
                      <BookingStatus status={booking.status}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </BookingStatus>
                    </BookingInfo>
                    <BookingActions>
                      {booking.status === 'upcoming' || booking.status === 'confirmed' ? (
                        <Button variant="secondary" size="small">Modify</Button>
                      ) : (
                        <Button variant="secondary" size="small">View Details</Button>
                      )}
                      {booking.status === 'completed' && (
                        <Button variant="primary" size="small">Book Again</Button>
                      )}
                    </BookingActions>
                  </BookingCard>
                ))}
              </BookingsList>
            </BookingsSection>
            
            <ProfileSection>
              <SectionTitle>My Profile</SectionTitle>
              <ProfileCard>
                <ProfileAvatar>
                  {user ? getInitial(user.name) : 'U'}
                </ProfileAvatar>
                <ProfileName>{user?.name || 'User'}</ProfileName>
                <ProfileInfo>
                  {user?.email}<br />
                  Member since {user?.createdAt ? new Date(user.createdAt).getFullYear() : '2023'}
                </ProfileInfo>
                <Button variant="secondary" size="small">Edit Profile</Button>
                
                <StatsGrid>
                  <StatCard>
                    <StatValue>24</StatValue>
                    <StatLabel>Bookings</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>4.8</StatValue>
                    <StatLabel>Rating</StatLabel>
                  </StatCard>
                </StatsGrid>
              </ProfileCard>
            </ProfileSection>
          </DashboardGrid>
          
          <Section>
            <SectionTitle>🏆 Gamification</SectionTitle>
            <Gamification />
          </Section>
          
          <Section>
            <SectionTitle>🏠 IoT Integration</SectionTitle>
            <IoTIntegration />
          </Section>
          
          <Section>
            <SectionTitle>✨ Micro-interactions</SectionTitle>
            <MicroInteractions />
          </Section>
        </PageContainer>
      </Layout>
    </ProtectedRoute>
  );
};

export default UserDashboardPage;