import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';
import Card from './Card';

const Section = styled.section`
  padding: ${designTokens.spacing.xxl} 0;
  background-color: ${designTokens.colors.background.light};
  
  .dark-mode & {
    background-color: ${designTokens.colors.background.dark};
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${designTokens.spacing.xxl};
`;

const SectionTitle = styled.h2`
  font-size: ${designTokens.typography.fontSize.h2};
  margin-bottom: ${designTokens.spacing.md};
`;

const TestimonialsGrid = styled.div`
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

const TestimonialCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const CustomerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${designTokens.spacing.md};
`;

const CustomerAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${designTokens.colors.background.dark};
  margin-right: ${designTokens.spacing.md};
  
  .dark-mode & {
    background-color: ${designTokens.colors.background.light};
  }
`;

const CustomerName = styled.h4`
  font-size: ${designTokens.typography.fontSize.body};
  font-weight: ${designTokens.typography.fontWeight.bold};
  margin: 0;
`;

const Rating = styled.div`
  display: flex;
  color: #FFC107;
  font-size: 18px;
`;

const TestimonialText = styled.p`
  color: ${designTokens.colors.text.secondary.light};
  font-style: italic;
  flex-grow: 1;
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Customer 1',
    rating: 5,
    text: "The service was exceptional! The helper arrived on time and did a fantastic job. I'll definitely be using InstantFixer again."
  },
  {
    id: 2,
    name: 'Customer 2',
    rating: 5,
    text: "I was amazed by the quality of service. The professional was knowledgeable and completed the task perfectly. Highly recommended!"
  },
  {
    id: 3,
    name: 'Customer 3',
    rating: 5,
    text: "This platform has saved me so much time and hassle. Finding reliable help has never been easier. Five stars!"
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <Section>
      <div className="container">
        <SectionHeader>
          <SectionTitle>What Our Customers Say</SectionTitle>
        </SectionHeader>
        
        <TestimonialsGrid>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id}>
              <CustomerInfo>
                <CustomerAvatar />
                <div>
                  <CustomerName>{testimonial.name}</CustomerName>
                  <Rating>
                    {'★'.repeat(testimonial.rating)}
                  </Rating>
                </div>
              </CustomerInfo>
              <TestimonialText>"{testimonial.text}"</TestimonialText>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </div>
    </Section>
  );
};

export default TestimonialsSection;