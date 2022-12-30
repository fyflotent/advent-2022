import { Position } from './types';

export const hashPosition = (position: Position) =>
  `${position.x},${position.y}`;

export const dehashPosition = (hashedPosition: string): Position => {
  const coords = hashedPosition.split(',').map((a) => parseInt(a));
  return { x: coords[0], y: coords[1] };
};
