'use strict';

// TODO: Add unit test
export default function validateEmailAddress(email) {
  if (!email || typeof email !== 'string') return false;

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};