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

const HelperHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: ${designTokens.spacing.xxl};
  padding: ${designTokens.spacing.xl};
  border-radius: ${designTokens.borders.radius.medium};
  background: ${designTokens.colors.cardBgLight};
  
  .dark-mode & {
    background: ${designTokens.colors.cardBgDark};
  }
  
  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
    align-items: flex-start;
  }
`;

const HelperAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${designTokens.colors.background.dark};
  margin-bottom: ${designTokens.spacing.md};
  
  @media (min-width: 768px) {
    margin-right: ${designTokens.spacing.xxl};
    margin-bottom: 0;
  }
  
  .dark-mode & {
    background-color: ${designTokens.colors.background.light};
  }
`;

const HelperInfo = styled.div`
  flex: 1;
`;

const HelperName = styled.h1`
  font-size: ${designTokens.typography.fontSize.h2};
  margin: 0 0 ${designTokens.spacing.xs};
`;

const HelperRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${designTokens.spacing.md};
  
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const RatingStars = styled.div`
  color: #FFC107;
  font-size: 20px;
  margin-right: ${designTokens.spacing.sm};
`;

const RatingText = styled.span`
  color: ${designTokens.colors.text.secondary.light};
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const HelperLocation = styled.p`
  color: ${designTokens.colors.text.secondary.light};
  margin-bottom: ${designTokens.spacing.md};
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const HelperActions = styled.div`
  display: flex;
  gap: ${designTokens.spacing.md};
  margin-top: ${designTokens.spacing.md};
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ServicesSection = styled.section`
  margin-bottom: ${designTokens.spacing.xxl};
`;

const SectionTitle = styled.h2`
  font-size: ${designTokens.typography.fontSize.h2};
  margin-bottom: ${designTokens.spacing.lg};
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${designTokens.spacing.md};
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ServiceCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const ServiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${designTokens.spacing.md};
`;

const ServiceInfo = styled.div`
  flex: 1;
`;

const ServiceName = styled.h3`
  font-size: ${designTokens.typography.fontSize.h3};
  margin: 0 0 ${designTokens.spacing.xs};
`;

const ServiceDescription = styled.p`
  color: ${designTokens.colors.text.secondary.light};
  margin: 0 0 ${designTokens.spacing.md};
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const ServicePrice = styled.div`
  font-weight: ${designTokens.typography.fontWeight.bold};
  font-size: ${designTokens.typography.fontSize.h3};
  color: ${designTokens.colors.primary.indigo};
`;

const ReviewsSection = styled.section`
  margin-bottom: ${designTokens.spacing.xxl};
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.lg};
`;

const ReviewCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${designTokens.spacing.md};
`;

const ReviewerAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${designTokens.colors.background.dark};
  margin-right: ${designTokens.spacing.md};
  
  .dark-mode & {
    background-color: ${designTokens.colors.background.light};
  }
`;

const ReviewerInfo = styled.div`
  flex: 1;
`;

const ReviewerName = styled.h4`
  font-size: ${designTokens.typography.fontSize.body};
  font-weight: ${designTokens.typography.fontWeight.bold};
  margin: 0 0 ${designTokens.spacing.xs};
`;

const ReviewRating = styled.div`
  color: #FFC107;
`;

const ReviewText = styled.p`
  color: ${designTokens.colors.text.secondary.light};
  margin: 0;
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const PortfolioSection = styled.section`
  margin-bottom: ${designTokens.spacing.xxl};
`;

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${designTokens.spacing.md};
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const PortfolioItem = styled.div`
  border-radius: ${designTokens.borders.radius.small};
  overflow: hidden;
  aspect-ratio: 1/1;
  background-color: ${designTokens.colors.background.dark};
  
  .dark-mode & {
    background-color: ${designTokens.colors.background.light};
  }
`;

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface Review {
  id: number;
  reviewer: string;
  rating: number;
  text: string;
  date: string;
}

const services: Service[] = [
  {
    id: 1,
    name: 'Plumbing Repair',
    description: 'Fix leaks, replace pipes, and repair plumbing fixtures',
    price: 499
  },
  {
    id: 2,
    name: 'Installation Service',
    description: 'Install new plumbing fixtures, pipes, and systems',
    price: 599
  },
  {
    id: 3,
    name: 'Emergency Plumbing',
    description: '24/7 emergency plumbing services for urgent issues',
    price: 799
  }
];

const reviews: Review[] = [
  {
    id: 1,
    reviewer: 'Amit Verma',
    rating: 5,
    text: 'Rajesh was extremely professional and fixed my plumbing issue quickly. Highly recommended!',
    date: '2023-05-15'
  },
  {
    id: 2,
    reviewer: 'Sunita Rao',
    rating: 4,
    text: 'Great service and reasonable pricing. Will hire again for future needs.',
    date: '2023-04-22'
  },
  {
    id: 3,
    reviewer: 'Vikash Gupta',
    rating: 5,
    text: 'Excellent workmanship and punctual. The best plumber I\'ve hired in years!',
    date: '2023-03-10'
  }
];

const HelperProfilePage = () => {
  const [bookingDate, setBookingDate] = useState('');
  
  const handleBookNow = () => {
    // Handle booking logic here
    console.log('Booking for date:', bookingDate);
  };
  
  return (
    <Layout>
      <Head>
        <title>Rajesh Kumar - Plumber - InstantFixer</title>
        <meta name="description" content="Professional plumber with 10+ years experience" />
      </Head>
      
      <PageContainer className="container">
        <HelperHeader>
          <HelperAvatar />
          <HelperInfo>
            <HelperName>Rajesh Kumar</HelperName>
            <HelperRating>
              <RatingStars>
                {'★'.repeat(5)}
              </RatingStars>
              <RatingText>4.9 (128 reviews)</RatingText>
            </HelperRating>
            <HelperLocation>📍 Delhi, India</HelperLocation>
            <p style={{ color: designTokens.colors.text.secondary.light, marginBottom: designTokens.spacing.md }}>
              Professional plumber with 10+ years of experience. Specialized in residential plumbing repairs and installations.
            </p>
            <HelperActions>
              <Button variant="primary" onClick={handleBookNow}>Book Now</Button>
              <Button variant="secondary">Message</Button>
            </HelperActions>
          </HelperInfo>
        </HelperHeader>
        
        <ServicesSection>
          <SectionTitle>Services Offered</SectionTitle>
          <ServicesGrid>
            {services.map((service) => (
              <ServiceCard key={service.id}>
                <ServiceHeader>
                  <ServiceInfo>
                    <ServiceName>{service.name}</ServiceName>
                    <ServiceDescription>{service.description}</ServiceDescription>
                  </ServiceInfo>
                  <ServicePrice>₹{service.price}</ServicePrice>
                </ServiceHeader>
                <Button variant="secondary" size="small">Add to Cart</Button>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </ServicesSection>
        
        <PortfolioSection>
          <SectionTitle>Portfolio</SectionTitle>
          <PortfolioGrid>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <PortfolioItem key={item} />
            ))}
          </PortfolioGrid>
        </PortfolioSection>
        
        <ReviewsSection>
          <SectionTitle>Customer Reviews</SectionTitle>
          <ReviewsList>
            {reviews.map((review) => (
              <ReviewCard key={review.id}>
                <ReviewHeader>
                  <ReviewerAvatar />
                  <ReviewerInfo>
                    <ReviewerName>{review.reviewer}</ReviewerName>
                    <ReviewRating>
                      {'★'.repeat(review.rating)}
                    </ReviewRating>
                  </ReviewerInfo>
                </ReviewHeader>
                <ReviewText>{review.text}</ReviewText>
              </ReviewCard>
            ))}
          </ReviewsList>
        </ReviewsSection>
      </PageContainer>
    </Layout>
  );
};

export default HelperProfilePage;