// AI Pricing Algorithm for InstantFixer
// This module calculates dynamic pricing based on demand, time, and other factors

class AIPricing {
  /**
   * Calculate dynamic price for a service
   * @param {Object} service - Service object
   * @param {Object} context - Context including time, demand, etc.
   * @returns {Number} Calculated price
   */
  static calculatePrice(service, context) {
    let price = service.basePrice;
    
    // Time-based pricing (20% weight)
    const timeMultiplier = this.getTimeMultiplier(context.time);
    price *= timeMultiplier;
    
    // Demand-based pricing (30% weight)
    const demandMultiplier = this.getDemandMultiplier(context.demandLevel);
    price *= demandMultiplier;
    
    // Location-based pricing (15% weight)
    const locationMultiplier = this.getLocationMultiplier(context.locationFactor);
    price *= locationMultiplier;
    
    // Helper experience pricing (10% weight)
    if (context.helperExperience) {
      const experienceMultiplier = this.getExperienceMultiplier(context.helperExperience);
      price *= experienceMultiplier;
    }
    
    // Service complexity pricing (15% weight)
    const complexityMultiplier = this.getComplexityMultiplier(service.complexity || 1);
    price *= complexityMultiplier;
    
    // Minimum price protection (10% weight)
    const minPrice = service.basePrice * 0.8;
    if (price < minPrice) {
      price = minPrice;
    }
    
    // Maximum price cap (10% above base)
    const maxPrice = service.basePrice * 2.0;
    if (price > maxPrice) {
      price = maxPrice;
    }
    
    return Math.round(price);
  }
  
  /**
   * Get time-based multiplier
   * @param {String} time - Time in HH:MM format
   * @returns {Number} Multiplier
   */
  static getTimeMultiplier(time) {
    const hour = parseInt(time.split(':')[0]);
    
    // Peak hours (7-9 AM, 5-8 PM) - 20% increase
    if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 20)) {
      return 1.2;
    }
    
    // Off-peak hours (10 PM - 6 AM) - 15% discount
    if (hour >= 22 || hour <= 6) {
      return 0.85;
    }
    
    // Normal hours
    return 1.0;
  }
  
  /**
   * Get demand-based multiplier
   * @param {String} demandLevel - Low, Medium, High, or Surge
   * @returns {Number} Multiplier
   */
  static getDemandMultiplier(demandLevel) {
    switch (demandLevel) {
      case 'surge':
        return 1.5;
      case 'high':
        return 1.3;
      case 'medium':
        return 1.1;
      case 'low':
      default:
        return 1.0;
    }
  }
  
  /**
   * Get location-based multiplier
   * @param {Number} factor - Location factor (0-1)
   * @returns {Number} Multiplier
   */
  static getLocationMultiplier(factor) {
    // Factor ranges from 0 (rural) to 1 (urban)
    return 0.8 + (0.4 * factor);
  }
  
  /**
   * Get experience-based multiplier
   * @param {Number} years - Years of experience
   * @returns {Number} Multiplier
   */
  static getExperienceMultiplier(years) {
    if (years >= 10) return 1.3;
    if (years >= 5) return 1.2;
    if (years >= 2) return 1.1;
    return 1.0;
  }
  
  /**
   * Get complexity-based multiplier
   * @param {Number} complexity - Complexity level (1-5)
   * @returns {Number} Multiplier
   */
  static getComplexityMultiplier(complexity) {
    return 0.8 + (0.1 * complexity);
  }
  
  /**
   * Predict demand level for a given time and location
   * @param {Object} context - Context including time, location, etc.
   * @returns {String} Demand level (low, medium, high, surge)
   */
  static predictDemand(context) {
    // In a real implementation, this would use historical data and ML models
    // For now, we'll simulate with some basic rules
    
    const hour = parseInt(context.time.split(':')[0]);
    const day = new Date().getDay();
    
    // Weekend evenings - high demand
    if ((day === 0 || day === 6) && hour >= 18 && hour <= 21) {
      return 'high';
    }
    
    // Weekday mornings - surge demand
    if (day >= 1 && day <= 5 && hour >= 7 && hour <= 9) {
      return 'surge';
    }
    
    // Random chance of surge (5%)
    if (Math.random() < 0.05) {
      return 'surge';
    }
    
    // Random chance of high demand (15%)
    if (Math.random() < 0.15) {
      return 'high';
    }
    
    // Random chance of medium demand (30%)
    if (Math.random() < 0.30) {
      return 'medium';
    }
    
    // Otherwise low demand
    return 'low';
  }
}

module.exports = AIPricing;