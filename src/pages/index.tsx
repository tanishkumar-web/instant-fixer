import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import TestimonialsSection from '../components/TestimonialsSection';

const HomePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // If user is logged in, redirect to dashboard
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);
  
  // Show nothing while checking auth status
  if (loading || user) {
    return null;
  }
  
  return (
    <Layout>
      <Head>
        <title>InstantFixer - Your Ultimate Local Helper Platform</title>
        <meta name="description" content="Find trusted local helpers for all your needs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
    </Layout>
  );
};

export default HomePage;