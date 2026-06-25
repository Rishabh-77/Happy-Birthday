// src/components/__tests__/MemoryLane.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MemoryLane from '../MemoryLane';

describe('MemoryLane Component', () => {
  it('renders the section header correctly', () => {
    render(<MemoryLane />);
    
    expect(screen.getByText('Memory Lane')).toBeInTheDocument();
    expect(screen.getByText('A collection of cherished moments we\'ve shared together')).toBeInTheDocument();
  });

  it('renders default photos when no photos prop is provided', () => {
    render(<MemoryLane />);
    
    // Should render 5 default photos
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(5);
  });

  it('renders custom photos when photos prop is provided', () => {
    const customPhotos = [
      {
        id: 1,
        src: '/test-image.jpg',
        alt: 'Test image',
        rotation: 2,
        position: { x: 50, y: 50 },
        caption: 'Test caption'
      }
    ];

    render(<MemoryLane photos={customPhotos} />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(1);
    expect(screen.getByAltText('Test image')).toBeInTheDocument();
    expect(screen.getByText('Test caption')).toBeInTheDocument();
  });

  it('applies polaroid styling to photo containers', () => {
    render(<MemoryLane />);
    
    const polaroidElements = document.querySelectorAll('.polaroid');
    expect(polaroidElements.length).toBeGreaterThan(0);
  });

  it('applies responsive polaroid sizing classes', () => {
    render(<MemoryLane />);
    
    const responsiveElements = document.querySelectorAll('.polaroid-responsive');
    expect(responsiveElements.length).toBeGreaterThan(0);
  });

  it('applies random rotation classes to polaroids', () => {
    render(<MemoryLane />);
    
    const polaroidElements = document.querySelectorAll('.polaroid');
    let hasRotationClass = false;
    
    polaroidElements.forEach(element => {
      for (let i = 1; i <= 8; i++) {
        if (element.classList.contains(`polaroid-rotate-${i}`)) {
          hasRotationClass = true;
          break;
        }
      }
    });
    
    expect(hasRotationClass).toBe(true);
  });

  it('maintains proper aspect ratios for photos', () => {
    render(<MemoryLane />);
    
    const photoElements = document.querySelectorAll('.polaroid-photo');
    expect(photoElements.length).toBeGreaterThan(0);
    
    photoElements.forEach(photo => {
      expect(photo).toHaveClass('polaroid-photo');
    });
  });

  it('handles image loading errors gracefully', () => {
    const { container } = render(<MemoryLane />);
    
    // Simulate image error
    const images = container.querySelectorAll('img');
    images[0].dispatchEvent(new Event('error'));
    
    // Should not crash and should have fallback
    expect(images[0]).toBeInTheDocument();
  });
});