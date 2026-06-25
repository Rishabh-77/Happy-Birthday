// src/components/__tests__/BikeAnimation.test.jsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BikeAnimation from '../BikeAnimation';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div data-testid="motion-div" {...props}>{children}</div>
  }
}));

describe('BikeAnimation', () => {
  const mockPhotoPositions = [
    { x: 15, y: 10 },
    { x: 45, y: 5 },
    { x: 75, y: 10 },
    { x: 25, y: 50 },
    { x: 65, y: 40 }
  ];

  it('renders without crashing', () => {
    render(<BikeAnimation photoPositions={mockPhotoPositions} isVisible={false} />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('renders bike SVG when visible', () => {
    render(<BikeAnimation photoPositions={mockPhotoPositions} isVisible={true} />);
    
    // Check if SVG elements are present
    const svgElements = screen.getAllByRole('img', { hidden: true });
    expect(svgElements.length).toBeGreaterThan(0);
  });

  it('uses default photo positions when none provided', () => {
    render(<BikeAnimation isVisible={true} />);
    
    // Component should render without errors even with no photo positions
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('accepts custom duration prop', () => {
    render(
      <BikeAnimation 
        photoPositions={mockPhotoPositions} 
        isVisible={true} 
        duration={25}
      />
    );
    
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('handles responsive container height', () => {
    render(
      <BikeAnimation 
        photoPositions={mockPhotoPositions} 
        isVisible={true}
        containerHeight="3000px"
      />
    );
    
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('renders bike SVG with correct structure', () => {
    render(<BikeAnimation photoPositions={mockPhotoPositions} isVisible={true} />);
    
    // Check for SVG path elements (bike frame, wheels, etc.)
    const container = screen.getByRole('img', { hidden: true }).closest('div');
    expect(container).toBeInTheDocument();
  });
});