// AI Matching Algorithm for InstantFixer
// This module matches users with helpers based on various factors

class AIMatching {
  /**
   * Match a user with available helpers based on service, location, rating, and availability
   * @param {Object} userRequest - User's service request
   * @param {Array} helpers - Array of available helpers
   * @returns {Array} Sorted array of matched helpers
   */
  static matchHelpers(userRequest, helpers) {
    // Calculate match scores for each helper
    const scoredHelpers = helpers.map(helper => {
      let score = 0;
      
      // Service match (40% weight)
      if (helper.services.includes(userRequest.service)) {
        score += 40;
      }
      
      // Location proximity (25% weight)
      const distance = this.calculateDistance(
        userRequest.location.lat, 
        userRequest.location.lng,
        helper.location.lat, 
        helper.location.lng
      );
      
      // Closer helpers get higher scores
      if (distance <= 5) {
        score += 25;
      } else if (distance <= 10) {
        score += 20;
      } else if (distance <= 20) {
        score += 15;
      } else if (distance <= 50) {
        score += 10;
      }
      
      // Rating (20% weight)
      score += helper.rating * 4; // Rating out of 5, so max 20 points
      
      // Availability (15% weight)
      if (this.isHelperAvailable(helper, userRequest.date, userRequest.time)) {
        score += 15;
      }
      
      return {
        ...helper,
        matchScore: score
      };
    });
    
    // Sort helpers by match score (descending)
    return scoredHelpers.sort((a, b) => b.matchScore - a.matchScore);
  }
  
  /**
   * Calculate distance between two points using Haversine formula
   * @param {Number} lat1 - Latitude of point 1
   * @param {Number} lon1 - Longitude of point 1
   * @param {Number} lat2 - Latitude of point 2
   * @param {Number} lon2 - Longitude of point 2
   * @returns {Number} Distance in kilometers
   */
  static calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  /**
   * Convert degrees to radians
   * @param {Number} degrees - Angle in degrees
   * @returns {Number} Angle in radians
   */
  static toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
  
  /**
   * Check if helper is available at requested time
   * @param {Object} helper - Helper object
   * @param {String} date - Requested date (YYYY-MM-DD)
   * @param {String} time - Requested time (HH:MM)
   * @returns {Boolean} Whether helper is available
   */
  static isHelperAvailable(helper, date, time) {
    // In a real implementation, this would check against the helper's schedule
    // For now, we'll assume 80% availability
    return Math.random() > 0.2;
  }
  
  /**
   * Get top 3 recommended helpers for a user
   * @param {Object} userRequest - User's service request
   * @param {Array} helpers - Array of available helpers
   * @returns {Array} Top 3 recommended helpers
   */
  static getRecommendations(userRequest, helpers) {
    const matchedHelpers = this.matchHelpers(userRequest, helpers);
    return matchedHelpers.slice(0, 3);
  }
}

module.exports = AIMatching;