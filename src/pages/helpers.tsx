import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import ARNavigation from '../components/ARNavigation';
import Gamification from '../components/Gamification';
import IoTIntegration from '../components/IoTIntegration';

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

const FiltersContainer = styled.div`
  display: flex;
  gap: ${designTokens.spacing.md};
  margin-bottom: ${designTokens.spacing.xxl};
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterSelect = styled.select`
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

const SearchContainer = styled.div`
  display: flex;
  gap: ${designTokens.spacing.md};
  margin-bottom: ${designTokens.spacing.xxl};
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
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

const LocationButton = styled.button`
  padding: ${designTokens.spacing.md} ${designTokens.spacing.lg};
  border-radius: ${designTokens.borders.radius.small};
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${designTokens.colors.background.light};
  color: ${designTokens.colors.text.primary.light};
  font-size: ${designTokens.typography.fontSize.body};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${designTokens.spacing.sm};
  
  .dark-mode & {
    background-color: ${designTokens.colors.background.dark};
    color: ${designTokens.colors.text.primary.dark};
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const HelpersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${designTokens.spacing.lg};
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const HelperCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const HelperHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${designTokens.spacing.md};
`;

const HelperAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${designTokens.colors.primary.gradient};
  margin-right: ${designTokens.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const HelperInfo = styled.div`
  flex: 1;
`;

const HelperName = styled.h3`
  font-size: ${designTokens.typography.fontSize.h3};
  margin: 0 0 ${designTokens.spacing.xs};
`;

const HelperRating = styled.div`
  display: flex;
  align-items: center;
  color: #FFC107;
`;

const HelperServices = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${designTokens.spacing.sm};
  margin: ${designTokens.spacing.md} 0;
`;

const ServiceTag = styled.span`
  padding: ${designTokens.spacing.xs} ${designTokens.spacing.sm};
  border-radius: ${designTokens.borders.radius.small};
  background-color: ${designTokens.colors.primary.indigo}20;
  color: ${designTokens.colors.primary.indigo};
  font-size: ${designTokens.typography.fontSize.caption};
  
  .dark-mode & {
    background-color: ${designTokens.colors.primary.indigo}40;
  }
`;

const HelperFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: ${designTokens.spacing.md};
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  
  .dark-mode & {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const HelperPrice = styled.div`
  font-weight: ${designTokens.typography.fontWeight.bold};
  font-size: ${designTokens.typography.fontSize.h3};
`;

const SectionTitle = styled.h2`
  font-size: ${designTokens.typography.fontSize.h2};
  margin: ${designTokens.spacing.xxl} 0 ${designTokens.spacing.lg};
`;

interface Helper {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  services: string[];
}

const helpers: Helper[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    rating: 4.9,
    reviews: 128,
    price: 499,
    services: ['Plumbing', 'Installation', 'Repairs']
  },
  {
    id: 2,
    name: 'Priya Sharma',
    rating: 4.8,
    reviews: 97,
    price: 599,
    services: ['Electrical', 'Wiring', 'Maintenance']
  },
  {
    id: 3,
    name: 'Amit Patel',
    rating: 4.7,
    reviews: 86,
    price: 399,
    services: ['Cleaning', 'Deep Cleaning', 'Organizing']
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    rating: 4.9,
    reviews: 142,
    price: 699,
    services: ['Tutoring', 'Math', 'Science']
  },
  {
    id: 5,
    name: 'Vikram Singh',
    rating: 4.6,
    reviews: 75,
    price: 549,
    services: ['Carpentry', 'Furniture', 'Repairs']
  },
  {
    id: 6,
    name: 'Anjali Mehta',
    rating: 4.8,
    reviews: 113,
    price: 799,
    services: ['Cooking', 'Meal Prep', 'Catering']
  }
];

const HelpersPage = () => {
  const [sortBy, setSortBy] = useState('rating');
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <Layout>
      <Head>
        <title>Find Helpers - InstantFixer</title>
        <meta name="description" content="Browse and connect with trusted local helpers" />
      </Head>
      
      <PageContainer className="container">
        <PageHeader>
          <PageTitle>Find Trusted Helpers</PageTitle>
          <Button variant="primary">Post a Request</Button>
        </PageHeader>
        
        <SearchContainer>
          <SearchInput 
            type="text" 
            placeholder="Search for services or helpers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <LocationButton>
            📍 New Delhi
          </LocationButton>
        </SearchContainer>
        
        <FiltersContainer>
          <FilterSelect value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
            <option value="all">All Services</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="cleaning">Cleaning</option>
            <option value="tutoring">Tutoring</option>
          </FilterSelect>
          
          <FilterSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="rating">Sort by Rating</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="reviews">Most Reviews</option>
          </FilterSelect>
        </FiltersContainer>
        
        <HelpersGrid>
          {helpers.map((helper) => (
            <HelperCard key={helper.id}>
              <HelperHeader>
                <HelperAvatar>{helper.name.charAt(0)}</HelperAvatar>
                <HelperInfo>
                  <HelperName>{helper.name}</HelperName>
                  <HelperRating>
                    {'★'.repeat(Math.floor(helper.rating))}
                    <span style={{ color: designTokens.colors.text.secondary.light, marginLeft: '5px' }}>
                      {helper.rating} ({helper.reviews} reviews)
                    </span>
                  </HelperRating>
                </HelperInfo>
              </HelperHeader>
              
              <HelperServices>
                {helper.services.map((service, index) => (
                  <ServiceTag key={index}>{service}</ServiceTag>
                ))}
              </HelperServices>
              
              <HelperFooter>
                <HelperPrice>From ₹{helper.price}</HelperPrice>
                <Button variant="secondary" size="small">Book Now</Button>
              </HelperFooter>
            </HelperCard>
          ))}
        </HelpersGrid>
        
        <SectionTitle>AR Navigation to Helpers</SectionTitle>
        <ARNavigation />
        
        <SectionTitle>IoT Integration</SectionTitle>
        <IoTIntegration />
        
        <SectionTitle>Your Progress</SectionTitle>
        <Gamification />
      </PageContainer>
    </Layout>
  );
};

export default HelpersPage;