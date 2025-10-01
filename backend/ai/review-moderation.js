// AI Review Moderation for InstantFixer
// This module analyzes and moderates user reviews

class AIReviewModeration {
  /**
   * Analyze a review for quality and appropriateness
   * @param {String} reviewText - The review text to analyze
   * @returns {Object} Analysis results
   */
  static analyzeReview(reviewText) {
    const analysis = {
      sentiment: this.analyzeSentiment(reviewText),
      spamScore: this.calculateSpamScore(reviewText),
      inappropriateContent: this.checkInappropriateContent(reviewText),
      helpfulnessScore: this.calculateHelpfulness(reviewText),
      qualityScore: this.calculateQuality(reviewText)
    };
    
    // Determine if review should be approved
    analysis.shouldApprove = (
      analysis.spamScore < 0.7 && 
      !analysis.inappropriateContent && 
      analysis.qualityScore > 0.3
    );
    
    return analysis;
  }
  
  /**
   * Analyze sentiment of review text
   * @param {String} text - Review text
   * @returns {String} Sentiment (positive, neutral, negative)
   */
  static analyzeSentiment(text) {
    // In a real implementation, this would use NLP libraries or APIs
    // For now, we'll use simple keyword matching
    
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'fantastic', 'wonderful', 'perfect', 'love', 'best'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'disappointing', 'poor', 'useless'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    const words = text.toLowerCase().split(/\s+/);
    
    words.forEach(word => {
      if (positiveWords.includes(word)) positiveCount++;
      if (negativeWords.includes(word)) negativeCount++;
    });
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }
  
  /**
   * Calculate spam score of review text
   * @param {String} text - Review text
   * @returns {Number} Spam score (0-1)
   */
  static calculateSpamScore(text) {
    // Check for common spam indicators
    let spamScore = 0;
    
    // Too short (less than 10 words)
    if (text.split(/\s+/).length < 10) {
      spamScore += 0.3;
    }
    
    // Too long (more than 500 words)
    if (text.split(/\s+/).length > 500) {
      spamScore += 0.2;
    }
    
    // Repeated characters
    if (/(.)\1{4,}/.test(text)) {
      spamScore += 0.4;
    }
    
    // Excessive punctuation
    const punctCount = (text.match(/[!?.]/g) || []).length;
    if (punctCount > 10) {
      spamScore += 0.3;
    }
    
    // Excessive caps
    const capsRatio = (text.match(/[A-Z]/g) || []).length / text.length;
    if (capsRatio > 0.5) {
      spamScore += 0.4;
    }
    
    // URLs
    if (text.match(/https?:\/\/|www\./)) {
      spamScore += 0.8;
    }
    
    // Email addresses
    if (text.match(/\S+@\S+\.\S+/)) {
      spamScore += 0.6;
    }
    
    return Math.min(spamScore, 1);
  }
  
  /**
   * Check for inappropriate content
   * @param {String} text - Review text
   * @returns {Boolean} True if inappropriate content detected
   */
  static checkInappropriateContent(text) {
    // In a real implementation, this would use more sophisticated filtering
    // For now, we'll check for some basic inappropriate words
    
    const inappropriateWords = [
      'stupid', 'idiot', 'dumb', 'moron', 'hate', 'disgusting', 
      'awful', 'terrible person', 'useless', 'waste of time'
    ];
    
    const lowerText = text.toLowerCase();
    
    return inappropriateWords.some(word => lowerText.includes(word));
  }
  
  /**
   * Calculate helpfulness score
   * @param {String} text - Review text
   * @returns {Number} Helpfulness score (0-1)
   */
  static calculateHelpfulness(text) {
    // Longer reviews are generally more helpful
    const wordCount = text.split(/\s+/).length;
    let score = Math.min(wordCount / 100, 1);
    
    // Reviews with specific details are more helpful
    if (text.includes('service') || text.includes('helped') || text.includes('problem')) {
      score += 0.2;
    }
    
    return Math.min(score, 1);
  }
  
  /**
   * Calculate overall quality score
   * @param {String} text - Review text
   * @returns {Number} Quality score (0-1)
   */
  static calculateQuality(text) {
    // Combine multiple factors for quality score
    const sentiment = this.analyzeSentiment(text);
    const spamScore = this.calculateSpamScore(text);
    const hasInappropriate = this.checkInappropriateContent(text);
    const helpfulness = this.calculateHelpfulness(text);
    
    let quality = 0;
    
    // Base quality on helpfulness
    quality += helpfulness * 0.5;
    
    // Adjust for sentiment
    if (sentiment === 'positive') quality += 0.2;
    else if (sentiment === 'neutral') quality += 0.1;
    
    // Penalty for spam
    quality -= spamScore * 0.3;
    
    // Penalty for inappropriate content
    if (hasInappropriate) quality -= 0.5;
    
    return Math.max(0, Math.min(quality, 1));
  }
  
  /**
   * Generate automated response to review
   * @param {Object} review - Review object
   * @returns {String} Automated response
   */
  static generateResponse(review) {
    const sentiment = this.analyzeSentiment(review.text);
    
    if (sentiment === 'positive') {
      return "Thank you for your positive review! We're glad to hear you had a great experience.";
    } else if (sentiment === 'negative') {
      return "We're sorry to hear about your experience. Our team will look into this matter and work to improve our service.";
    } else {
      return "Thank you for your feedback. We appreciate you taking the time to share your experience.";
    }
  }
}

module.exports = AIReviewModeration;