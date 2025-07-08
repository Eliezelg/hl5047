'use client';

import NextLink from 'next/link';
import { ComponentProps } from 'react';

export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink href={href} {...props} />;
}