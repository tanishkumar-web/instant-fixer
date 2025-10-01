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

const AdminGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${designTokens.spacing.lg};
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Section = styled.section``;

const SectionTitle = styled.h2`
  font-size: ${designTokens.typography.fontSize.h3};
  margin-bottom: ${designTokens.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${designTokens.spacing.md};
  margin-bottom: ${designTokens.spacing.lg};
`;

const StatCard = styled(Card)`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${designTokens.typography.fontSize.h2};
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

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: ${designTokens.spacing.lg};
  
  .dark-mode & {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: ${designTokens.spacing.md} ${designTokens.spacing.lg};
  background: none;
  border: none;
  font-size: ${designTokens.typography.fontSize.body};
  font-weight: ${designTokens.typography.fontWeight.medium};
  color: ${designTokens.colors.text.secondary.light};
  cursor: pointer;
  position: relative;
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
  
  ${props => props.active && `
    color: ${designTokens.colors.primary.indigo};
    
    .dark-mode & {
      color: ${designTokens.colors.primary.blue};
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 3px;
      background: ${designTokens.colors.primary.gradient};
      border-radius: 3px 3px 0 0;
    }
  `}
  
  &:hover:not(${props => props.active && 'active'}) {
    color: ${designTokens.colors.text.primary.light};
    
    .dark-mode & {
      color: ${designTokens.colors.text.primary.dark};
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background-color: ${designTokens.colors.background.light};
  
  .dark-mode & {
    background-color: ${designTokens.colors.background.dark};
  }
`;

const Th = styled.th`
  padding: ${designTokens.spacing.md};
  text-align: left;
  font-weight: ${designTokens.typography.fontWeight.medium};
  color: ${designTokens.colors.text.secondary.light};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const Td = styled.td`
  padding: ${designTokens.spacing.md};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  .dark-mode & {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const Tr = styled.tr`
  &:hover {
    background-color: ${designTokens.colors.background.light}80;
    
    .dark-mode & {
      background-color: ${designTokens.colors.background.dark}80;
    }
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: ${designTokens.spacing.xs} ${designTokens.spacing.sm};
  border-radius: ${designTokens.borders.radius.small};
  font-size: ${designTokens.typography.fontSize.caption};
  font-weight: ${designTokens.typography.fontWeight.medium};
  
  ${props => {
    switch (props.status) {
      case 'pending':
        return `
          background-color: #FFF3E0;
          color: #FF9800;
          
          .dark-mode & {
            background-color: #E65100;
            color: #FFCC80;
          }
        `;
      case 'approved':
        return `
          background-color: #E8F5E9;
          color: #4CAF50;
          
          .dark-mode & {
            background-color: #1B5E20;
            color: #A5D6A7;
          }
        `;
      case 'rejected':
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
          background-color: #E3F2FD;
          color: #2196F3;
          
          .dark-mode & {
            background-color: #0D47A1;
            color: #90CAF9;
          }
        `;
    }
  }}
`;

const ChartContainer = styled.div`
  height: 300px;
  display: flex;
  align-items: flex-end;
  gap: ${designTokens.spacing.sm};
  padding: ${designTokens.spacing.lg} 0;
`;

const ChartBar = styled.div<{ height: number; color: string }>`
  flex: 1;
  background: ${props => props.color};
  height: ${props => props.height}%;
  border-radius: ${designTokens.borders.radius.small} ${designTokens.borders.radius.small} 0 0;
  min-width: 20px;
  position: relative;
  
  &::after {
    content: '${props => props.height}%';
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: ${designTokens.typography.fontSize.caption};
    font-weight: ${designTokens.typography.fontWeight.medium};
  }
`;

const ChartLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${designTokens.spacing.md};
`;

const ChartLabel = styled.div`
  font-size: ${designTokens.typography.fontSize.caption};
  color: ${designTokens.colors.text.secondary.light};
  text-align: center;
  flex: 1;
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const ActionCell = styled.td`
  display: flex;
  gap: ${designTokens.spacing.sm};
`;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface Booking {
  id: number;
  customer: string;
  helper: string;
  service: string;
  date: string;
  amount: number;
  status: string;
}

const users: User[] = [
  {
    id: 1,
    name: 'Amit Verma',
    email: 'amit@example.com',
    role: 'Customer',
    status: 'approved'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    role: 'Helper',
    status: 'pending'
  },
  {
    id: 3,
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'Helper',
    status: 'approved'
  },
  {
    id: 4,
    name: 'Sunita Rao',
    email: 'sunita@example.com',
    role: 'Customer',
    status: 'approved'
  }
];

const bookings: Booking[] = [
  {
    id: 1,
    customer: 'Amit Verma',
    helper: 'Rajesh Kumar',
    service: 'Plumbing Repair',
    date: '2023-06-15',
    amount: 594,
    status: 'Completed'
  },
  {
    id: 2,
    customer: 'Sunita Rao',
    helper: 'Priya Sharma',
    service: 'Electrical Work',
    date: '2023-06-16',
    amount: 699,
    status: 'Confirmed'
  },
  {
    id: 3,
    customer: 'Vikash Gupta',
    helper: 'Rajesh Kumar',
    service: 'Emergency Plumbing',
    date: '2023-06-17',
    amount: 899,
    status: 'Pending'
  }
];

const chartData = [
  { label: 'Jan', value: 65, color: designTokens.colors.primary.indigo },
  { label: 'Feb', value: 59, color: designTokens.colors.primary.indigo },
  { label: 'Mar', value: 80, color: designTokens.colors.primary.indigo },
  { label: 'Apr', value: 81, color: designTokens.colors.primary.indigo },
  { label: 'May', value: 56, color: designTokens.colors.primary.indigo },
  { label: 'Jun', value: 72, color: designTokens.colors.primary.indigo }
];

const AdminPanelPage = () => {
  const [activeTab, setActiveTab] = useState('users');
  
  const handleApprove = (userId: number) => {
    console.log(`Approving user ${userId}`);
    // In a real app, this would make an API call
  };
  
  const handleReject = (userId: number) => {
    console.log(`Rejecting user ${userId}`);
    // In a real app, this would make an API call
  };
  
  return (
    <Layout>
      <Head>
        <title>Admin Panel - InstantFixer</title>
        <meta name="description" content="Admin panel for InstantFixer platform" />
      </Head>
      
      <PageContainer className="container">
        <PageHeader>
          <PageTitle>Admin Dashboard</PageTitle>
          <Button variant="primary">Generate Report</Button>
        </PageHeader>
        
        <StatsGrid>
          <StatCard>
            <StatValue>1,248</StatValue>
            <StatLabel>Total Users</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>856</StatValue>
            <StatLabel>Active Helpers</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>3,421</StatValue>
            <StatLabel>Total Bookings</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>₹12,45,678</StatValue>
            <StatLabel>Revenue</StatLabel>
          </StatCard>
        </StatsGrid>
        
        <AdminGrid>
          <Section style={{ gridColumn: 'span 3' }}>
            <SectionTitle>
              <span>Analytics</span>
            </SectionTitle>
            <Card>
              <ChartContainer>
                {chartData.map((data, index) => (
                  <ChartBar 
                    key={index} 
                    height={data.value} 
                    color={data.color}
                  />
                ))}
              </ChartContainer>
              <ChartLabels>
                {chartData.map((data, index) => (
                  <ChartLabel key={index}>{data.label}</ChartLabel>
                ))}
              </ChartLabels>
            </Card>
          </Section>
          
          <Section style={{ gridColumn: 'span 3' }}>
            <SectionTitle>
              <span>Management</span>
            </SectionTitle>
            
            <Tabs>
              <Tab 
                active={activeTab === 'users'} 
                onClick={() => setActiveTab('users')}
              >
                Users
              </Tab>
              <Tab 
                active={activeTab === 'bookings'} 
                onClick={() => setActiveTab('bookings')}
              >
                Bookings
              </Tab>
              <Tab 
                active={activeTab === 'reviews'} 
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </Tab>
              <Tab 
                active={activeTab === 'verification'} 
                onClick={() => setActiveTab('verification')}
              >
                Verification
              </Tab>
            </Tabs>
            
            <Card>
              {activeTab === 'users' && (
                <Table>
                  <Thead>
                    <tr>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Role</Th>
                      <Th>Status</Th>
                      <Th>Actions</Th>
                    </tr>
                  </Thead>
                  <tbody>
                    {users.map((user) => (
                      <Tr key={user.id}>
                        <Td>{user.name}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.role}</Td>
                        <Td>
                          <StatusBadge status={user.status}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </StatusBadge>
                        </Td>
                        <ActionCell>
                          <Button variant="secondary" size="small">View</Button>
                          {user.status === 'pending' && (
                            <>
                              <Button 
                                variant="primary" 
                                size="small" 
                                onClick={() => handleApprove(user.id)}
                              >
                                Approve
                              </Button>
                              <Button 
                                variant="secondary" 
                                size="small" 
                                onClick={() => handleReject(user.id)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </ActionCell>
                      </Tr>
                    ))}
                  </tbody>
                </Table>
              )}
              
              {activeTab === 'bookings' && (
                <Table>
                  <Thead>
                    <tr>
                      <Th>Customer</Th>
                      <Th>Helper</Th>
                      <Th>Service</Th>
                      <Th>Date</Th>
                      <Th>Amount</Th>
                      <Th>Status</Th>
                    </tr>
                  </Thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <Tr key={booking.id}>
                        <Td>{booking.customer}</Td>
                        <Td>{booking.helper}</Td>
                        <Td>{booking.service}</Td>
                        <Td>{booking.date}</Td>
                        <Td>₹{booking.amount}</Td>
                        <Td>{booking.status}</Td>
                      </Tr>
                    ))}
                  </tbody>
                </Table>
              )}
              
              {activeTab === 'reviews' && (
                <div style={{ padding: designTokens.spacing.lg, textAlign: 'center' }}>
                  <p style={{ color: designTokens.colors.text.secondary.light }}>
                    Review management interface would be displayed here.
                  </p>
                </div>
              )}
              
              {activeTab === 'verification' && (
                <div style={{ padding: designTokens.spacing.lg }}>
                  <h3>Helper Verification</h3>
                  <p style={{ color: designTokens.colors.text.secondary.light, marginBottom: designTokens.spacing.lg }}>
                    Review and verify helper applications and documentation.
                  </p>
                  
                  <Table>
                    <Thead>
                      <tr>
                        <Th>Helper Name</Th>
                        <Th>Documents</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                      </tr>
                    </Thead>
                    <tbody>
                      <Tr>
                        <Td>Rajesh Kumar</Td>
                        <Td>License, Insurance, ID</Td>
                        <Td>
                          <StatusBadge status="pending">Pending Review</StatusBadge>
                        </Td>
                        <ActionCell>
                          <Button variant="secondary" size="small">View Docs</Button>
                          <Button variant="primary" size="small">Verify</Button>
                        </ActionCell>
                      </Tr>
                      <Tr>
                        <Td>Priya Sharma</Td>
                        <Td>License, ID</Td>
                        <Td>
                          <StatusBadge status="approved">Verified</StatusBadge>
                        </Td>
                        <Td>-</Td>
                      </Tr>
                    </tbody>
                  </Table>
                </div>
              )}
            </Card>
          </Section>
        </AdminGrid>
      </PageContainer>
    </Layout>
  );
};

export default AdminPanelPage;