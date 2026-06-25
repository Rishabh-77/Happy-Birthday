// src/utils/photoUtils.js

/**
 * Utility functions for photo positioning and layout in Memory Lane
 */

/**
 * Generates random but aesthetically pleasing positions for photos
 * Ensures photos don't overlap and are well distributed across the screen
 * 
 * @param {number} count - Number of photos to position
 * @param {Object} bounds - Layout boundaries {minX, maxX, minY, maxY}
 * @returns {Array} Array of position objects {x, y}
 */
export const generatePhotoPositions = (count = 5, bounds = { minX: 10, maxX: 90, minY: 10, maxY: 80 }) => {
  const positions = [];
  const minDistance = 25; // Minimum distance between photos (percentage)
  
  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let position;
    
    do {
      position = {
        x: Math.random() * (bounds.maxX - bounds.minX) + bounds.minX,
        y: Math.random() * (bounds.maxY - bounds.minY) + bounds.minY
      };
      attempts++;
    } while (
      attempts < 50 && 
      positions.some(pos => 
        Math.sqrt(Math.pow(pos.x - position.x, 2) + Math.pow(pos.y - position.y, 2)) < minDistance
      )
    );
    
    positions.push(position);
  }
  
  return positions;
};

/**
 * Generates random rotation angles for polaroid photos
 * 
 * @param {number} count - Number of rotations needed
 * @param {number} maxRotation - Maximum rotation angle (default: 5 degrees)
 * @returns {Array} Array of rotation angles
 */
export const generatePhotoRotations = (count = 5, maxRotation = 5) => {
  return Array.from({ length: count }, () => 
    (Math.random() - 0.5) * 2 * maxRotation
  );
};

/**
 * Creates a complete photo data structure with positioning
 * 
 * @param {Array} photoSources - Array of {src, alt, caption} objects
 * @returns {Array} Complete photo objects with positioning
 */
export const createPhotoLayout = (photoSources) => {
  const positions = generatePhotoPositions(photoSources.length);
  const rotations = generatePhotoRotations(photoSources.length);
  
  return photoSources.map((photo, index) => ({
    id: index + 1,
    ...photo,
    position: positions[index],
    rotation: rotations[index]
  }));
};

/**
 * Validates photo data structure
 * 
 * @param {Array} photos - Array of photo objects to validate
 * @returns {boolean} True if all photos have required properties
 */
export const validatePhotoData = (photos) => {
  if (!Array.isArray(photos)) return false;
  
  return photos.every(photo => 
    photo.id !== undefined &&
    typeof photo.src === 'string' &&
    typeof photo.alt === 'string' &&
    typeof photo.rotation === 'number' &&
    photo.position &&
    typeof photo.position.x === 'number' &&
    typeof photo.position.y === 'number'
  );
};